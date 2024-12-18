const crypto = require('crypto');

module.exports = {
    async loginWithEmployeeCode(ctx) {
        const { username, password } = ctx.request.body;
    
        if (!username || !password) {
            console.error('Missing employee code or password');
            return ctx.badRequest('Employee code and password are required');
        }
    
        try {
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });
    
            if (!user) {
                return ctx.badRequest('Invalid employee code');
            }
    
            // Parse lockout_time to Date object for comparison
            const lockoutTime = user.lockout_time ? new Date(user.lockout_time) : null;
            console.log('User lockout_time:', lockoutTime); // Log parsed date for verification
    
            // Check if the user is locked and if lockout time is still valid
            if (user.failed_attempts >= 5 && lockoutTime && Date.now() < lockoutTime.getTime()) {
                const remainingLockTime = Math.ceil((lockoutTime.getTime() - Date.now()) / 1000 / 60); // Time in minutes
                console.log(`Account is locked. Try again in ${remainingLockTime} minute(s).`);
    
                // Return error with status code 429 (Too Many Requests)
                return ctx.send({
                    message: `Account is locked. Try again in ${remainingLockTime} minute(s).`,
                    code: 'ACCOUNT_LOCKED', // Custom error code for better identification
                }, 429);               
            }
    
            // Proceed with password validation if lockout has expired or is not set
            const validPassword = await strapi.plugin('users-permissions').service('user').validatePassword(password, user.password);
    
            if (!validPassword) {
                // Increment failed login attempts and lock account if necessary
                let updatedData = {
                    failed_attempts: user.failed_attempts + 1,
                };
    
                if (updatedData.failed_attempts >= 5) {
                    updatedData.lockout_time = Date.now() + 10 * 60 * 1000; // Lock for 10 minutes
                }
    
                await strapi.query('plugin::users-permissions.user').update({
                    where: { id: user.id },
                    data: updatedData
                });
    
                return ctx.unauthorized('Invalid password');
            }
    
            // Reset failed attempts and lockout time if login is successful
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    failed_attempts: 0,
                    lockout_time: null, // Clear lockout time
                }
            });
    
            // Step 1: Generate OTP
            const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
            const otpExpiry = Date.now() + 2 * 60 * 1000; // OTP valid for 2 minutes
    
            // Step 2: Store OTP and expiry in the user record
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    otp: otp,
                    otpExpiry: otpExpiry,
                },
            });
    
            // Step 3: Send OTP via email using Strapi's email plugin
            await strapi.plugins['email'].service('email').send({
                to: user.email,
                subject: 'OTP Code for Login',
                text: `Your OTP code for login to myNEEPCO Intranet is ${otp}. It will expire in 2 minutes.`,
                html: `<p>Your OTP code for login to myNEEPCO Intranet is <strong>${otp}</strong>. It will expire in 2 minutes.</p>`,
            });
    
            ctx.send({
                message: 'OTP sent successfully. Please check your email to complete login.',
            });
    
        } catch (error) {
            console.error('Error inside try block:', error.message);
            console.error('Stack trace:', error.stack);
            ctx.internalServerError('Internal server error occurred');
        }
    },

    async verifyOtp(ctx) {
        const { username, otp } = ctx.request.body;

        if (!username || !otp) {
            return ctx.badRequest('Username and OTP are required');
        }

        try {
            // Step 1: Find the user by username
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });

            if (!user) {
                return ctx.badRequest('Invalid username');
            }

            // Convert otpExpiry to milliseconds for comparison
            const otpExpiryTimestamp = new Date(user.otpExpiry).getTime();

            // Step 2: Check if OTP matches and is not expired
            if (String(user.otp) !== String(otp) || Date.now() > otpExpiryTimestamp) {
                console.log('OTP verification failed. User OTP:', user.otp, 'Provided OTP:', otp);
                return ctx.unauthorized('Invalid or expired OTP');
            }

            // Step 3: Clear the OTP fields after successful verification
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    otp: null,
                    otpExpiry: null,
                },
            });

            // Step 4: Issue the JWT token
            const token = strapi.plugin('users-permissions').service('jwt').issue({
                id: user.id,
                username: user.username,
                email: user.email,
                fname: user.firstname,
                lname: user.lastname,
                dob: user.dob,
                role: user.role,
            });

            ctx.send({
                jwt: token,
            });

        } catch (error) {
            console.error('Error inside verifyOtp try block:', error.message);
            console.error('Stack trace:', error.stack);
            ctx.internalServerError('Internal server error occurred');
        }
    },

    async forgotPassword(ctx) {
        const { email } = ctx.request.body;

        // Check if the email is provided
        if (!email) {
            return ctx.badRequest('Email is required');
        }

        try {
            // Fetch the user by email
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

            if (!user) {
                return ctx.badRequest('User not found');
            }

            // Generate a password reset token
            const resetToken = crypto.randomBytes(32).toString('hex'); // Generates a secure random token

            // Store the token and its expiry (e.g., 30 minutes) in the user's record
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes

            // Update the user record with the reset token and expiry
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id }, // Conditions for which user to update
                data: { // Data to update
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: user.resetPasswordExpires,
                },
            });

            // Construct the reset URL with the token
            const resetUrl = `${process.env.FRONTEND_URL}/reset-password?code=${resetToken}`;

            // Prepare the email content
            const emailContent = `
            Hello ${user.firstname || 'User'} ${user.lastname || ''},
            <br/><br/>
            You've requested a password reset for the NEEPCO Intranet Portal. Please click the link below to reset your password:
            <br/>
            <a href="${resetUrl}" target="_blank">Reset Password</a>
            <br/><br/>
            Please note that the link will expire after 30 minutes. If you did not request this, please ignore this email.
            
            <span style="color: gray; font-size: 12px; font-style: italic; display: block; margin-top: 10px;">
                Please note: This is an automated message. Do not reply to this email. If you need assistance, please contact the Corporate IT Department at <a href="mailto:itshillong@neepco.co.in">itshillong@neepco.co.in</a>.
            </span>
        `;
            // Send the email
            await strapi.plugin('email').service('email').send({
                to: user.email,
                subject: 'Password Reset',
                text: emailContent,
                html: emailContent, // Ensure to send the HTML version
            });

            return ctx.send({ ok: true });

        } catch (error) {
            console.error('Error during password reset:', error.message);
            ctx.internalServerError('Internal server error occurred');
        }
    },

    async resendOtp(ctx) {
        const { username } = ctx.request.body;

        // Check if username is provided
        if (!username) {
            return ctx.badRequest('Username is required');
        }

        try {
            // Fetch the user by username
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });

            if (!user) {
                return ctx.badRequest('User not found');
            }

            // Step 1: Generate a new OTP
            const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
            const otpExpiry = Date.now() + 2 * 60 * 1000; // OTP valid for 2 minutes

            // Step 2: Store new OTP and expiry in the user record
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    otp: otp,
                    otpExpiry: otpExpiry,
                },
            });

            // Step 3: Send OTP via email using Strapi's email plugin
            await strapi.plugins['email'].service('email').send({
                to: user.email,
                subject: 'OTP Code for Login',
                text: `Your OTP code for login to myNEEPCO Intranet is ${otp}. It will expire in 2 minutes.`,
                html: `<p>Your OTP code for login to myNEEPCO Intranet is <strong>${otp}</strong>. It will expire in 2 minutes.</p>`,
            });

            ctx.send({
                message: 'New OTP sent successfully. Please check your email.',
            });

        } catch (error) {
            console.error('Error inside resendOtp try block:', error.message);
            console.error('Stack trace:', error.stack);
            ctx.internalServerError('Internal server error occurred');
        }
    },
};


