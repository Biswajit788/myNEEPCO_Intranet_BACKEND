const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(ctx) {
        const { username, email, password, firstname, lastname, dob, captcha } = ctx.request.body;

        if (!username || !email || !password) {
            return ctx.badRequest('Missing required fields');
        }

        // Check if user already exists
        const existingUser = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });

        if (existingUser) {
            return ctx.badRequest('User is already registered.');
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds = 10

        // Get the "Authenticated" role ID
        const authenticatedRole = await strapi.query('plugin::users-permissions.role').findOne({ where: { type: 'authenticated' } });

        if (!authenticatedRole) {
            return ctx.badRequest('Default Authenticated role not found.');
        }

        // Create a confirmation token
        const confirmationToken = jwt.sign({ email }, strapi.config.get('plugin.users-permissions.jwtSecret'), {
            expiresIn: '7d', // Token expires in 7 days
        });

        // Create user with confirmed = false
        const newUser = await strapi.query('plugin::users-permissions.user').create({
            data: {
                username,
                email,
                password: hashedPassword,
                firstname,
                lastname,
                dob,
                confirmed: false,
                confirmationToken: confirmationToken,
                role: authenticatedRole.id,
            },
        });

        // Send email confirmation link
        await strapi.plugins['email'].services.email.send({
            to: email,
            subject: 'Email Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <p>Dear <strong>${firstname} ${lastname}</strong>,</p>
        
                    <p>Welcome to <strong>MyNEEPCO Intranet Portal</strong>. To complete your registration, please confirm your email by clicking the button below:</p>
        
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.BASE_URL}/email-confirmation?confirmation=${confirmationToken}" 
                           style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">
                            Confirm Your Email
                        </a>
                    </div>
        
                    <p>If the button does not work, you can also click the link below:</p>
        
                    <p style="word-break: break-all;">
                        <a href="${process.env.BASE_URL}/email-confirmation?confirmation=${confirmationToken}">
                            ${process.env.BASE_URL}/email-confirmation?confirmation=${confirmationToken}
                        </a>
                    </p>
        
                    <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
        
                    <p>If you did not sign up for this account, please ignore this email or report to <strong>Corporate IT, Shillong</strong>.</p>
                    <span style="color: gray; font-size: 12px; font-style: italic; display: block; margin-top: 10px;">
                        Please note: This is an automated message. Do not reply to this email. If you need assistance, please contact the Corporate IT Department at <a href="mailto:itshillong@neepco.co.in">itshillong@neepco.co.in</a>.
                    </span>
                </div>
            `,
        });

        ctx.send({ message: 'Registration successful. Please check your email for confirmation.' });
    },

    async emailConfirmation(ctx) {
        const { confirmation } = ctx.query;

        if (!confirmation) {
            return ctx.badRequest('Missing confirmation token');
        }

        try {
            const decoded = jwt.verify(confirmation, strapi.config.get('plugin.users-permissions.jwtSecret'));

            // Ensure the token contains an email
            if (!decoded || typeof decoded !== 'object' || !decoded.email) {
                return ctx.badRequest('Invalid token format');
            }

            // Find the user with the confirmation token
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where: { email: decoded.email, confirmation_token: confirmation },
            });

            if (!user) {
                return ctx.badRequest('Invalid or expired confirmation token');
            }

            // Verify the token matches the stored one
            if (user.confirmationToken !== confirmation) {
                return ctx.badRequest('Invalid or expired confirmation token');
            }

            // Update the user to mark as confirmed
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    confirmed: true,
                    confirmationToken: null,
                },
            });

            ctx.send({ message: 'Email successfully confirmed. You can now log in.' });

        } catch (error) {
            console.error('Email confirmation error:', error);
            ctx.badRequest('Invalid or expired confirmation token');
        }
    },

    /*  async loginWithEmployeeCode(ctx) {
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
     
             // Check if the account is blocked
             if (user.blocked) {
                 console.log('Account is blocked. Contact admin to unlock.');
                 return ctx.send({
                     message: 'Your account is blocked. Please contact the administrator to unlock it.',
                     code: 'ACCOUNT_BLOCKED',
                 }, 403);
             }
     
             // Validate password
             const validPassword = await strapi.plugin('users-permissions').service('user').validatePassword(password, user.password);
     
             if (!validPassword) {
                 let updatedData = {
                     failed_attempts: user.failed_attempts + 1,
                 };
     
                 // Block account after 5 failed attempts
                 if (updatedData.failed_attempts >= 5) {
                     updatedData.blocked = true;
                     console.log(`User ${username} is blocked due to multiple failed login attempts.`);
                 }                
     
                 await strapi.query('plugin::users-permissions.user').update({
                     where: { id: user.id },
                     data: updatedData
                 });
     
                 return ctx.unauthorized('Invalid password');
             }
     
             // Reset failed attempts if login is successful
             await strapi.query('plugin::users-permissions.user').update({
                 where: { id: user.id },
                 data: {
                     failed_attempts: 0,
                 }
             });
     
             // Step 1: Generate OTP
             const otp = crypto.randomInt(100000, 999999);
             const otpExpiry = Date.now() + 2 * 60 * 1000;
     
             // Step 2: Store OTP in user record
             await strapi.query('plugin::users-permissions.user').update({
                 where: { id: user.id },
                 data: {
                     otp: otp,
                     otpExpiry: otpExpiry,
                 },
             });
     
             // Step 3: Send OTP via email
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
     },   */

    async loginWithEmployeeCode(ctx) {
        const { username, password, captcha } = ctx.request.body;

        if (!username || !password || !captcha) {
            //console.error('Missing employee code or password');
            return ctx.unauthorized('Employee code, password, and captcha are required');
        }

        try {

            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });

            if (!user) {
                return ctx.badRequest('Invalid employee code');
            }

            if (!user.confirmed) {
                return ctx.forbidden('Your Account is not Activated');
            }

            // Check if the account is blocked and lockout time is set
            const lockoutDuration = 60 * 60 * 1000; // 1 hour in milliseconds
            if (user.blocked && user.lockout_time) {
                const lockoutTimePassed = Date.now() - new Date(user.lockout_time).getTime();

                if (lockoutTimePassed < lockoutDuration) {
                    const remainingTime = Math.ceil((lockoutDuration - lockoutTimePassed) / 60000);
                    //console.log(`User ${username} is still locked out for ${remainingTime} more minutes.`);
                    return ctx.send({
                        message: `Your account is locked due to multiple failed login attempts. Try again in ${remainingTime} minutes.`,
                        code: 'ACCOUNT_LOCKED',
                    }, 403);
                }

                // Lockout period is over, reset failed attempts and unlock the account
                await strapi.query('plugin::users-permissions.user').update({
                    where: { id: user.id },
                    data: {
                        failed_attempts: 0,
                        blocked: false,
                        lockout_time: null,
                    }
                });

                //console.log(`User ${username} lockout expired. Account is now unlocked.`);
            }

            // Validate password
            const validPassword = await strapi.plugin('users-permissions').service('user').validatePassword(password, user.password);

            if (!validPassword) {
                let updatedData = {
                    failed_attempts: user.failed_attempts + 1,
                };

                // Block account and set lockout time after 5 failed attempts
                if (updatedData.failed_attempts >= 5) {
                    updatedData.blocked = true;
                    updatedData.lockout_time = new Date();
                    //console.log(`User ${username} is locked out due to multiple failed login attempts.`);
                }

                await strapi.query('plugin::users-permissions.user').update({
                    where: { id: user.id },
                    data: updatedData
                });

                return ctx.unauthorized('Invalid password');
            }

            // Reset failed attempts if login is successful
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    failed_attempts: 0,
                    lockout_time: null,
                }
            });

            // Step 1: Generate OTP
            const otp = crypto.randomInt(100000, 999999);
            const otpExpiry = Date.now() + 2 * 60 * 1000;

            // Step 2: Store OTP in user record
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    otp: otp,
                    otpExpiry: otpExpiry,
                },
            });

            // Step 3: Send OTP via email
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

            // Check if the user is locked due to too many failed attempts
            /* if (user.blocked) {
                //return ctx.unauthorized('Your account is locked due to too many failed OTP attempts. Contact Administrator.');
                return ctx.send({
                    message: 'Your account is locked due to multiple failed login attempts. Contact Administrator.',
                    code: 'ACCOUNT_LOCKED',
                }, 403);
            } */


            // Convert otpExpiry to milliseconds for comparison
            const otpExpiryTimestamp = new Date(user.otpExpiry).getTime();

            // Step 2: Check if OTP matches and is not expired
            if (String(user.otp) !== String(otp) || Date.now() > otpExpiryTimestamp) {
                const failedAttempts = (user.failed_attempts || 0) + 1;
                //const isBlocked = failedAttempts >= 5;
                await strapi.query('plugin::users-permissions.user').update({
                    where: { id: user.id },
                    data: {
                        failed_attempts: failedAttempts,
                        //blocked: isBlocked,
                    },
                });

                /* if (isBlocked) {
                    return ctx.unauthorized('Your account has been locked due to too many failed OTP attempts. Contact Administrator.');
                } */

                return ctx.unauthorized('Invalid or expired OTP');
            }

            // Step 3: Clear the OTP fields after successful verification
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id },
                data: {
                    otp: null,
                    otpExpiry: null,
                    failed_attempts: 0,
                    //blocked: false,
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
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email, confirmed: true, } });

            if (!user) {
                return ctx.badRequest('User not found or email not confirmed');
            }

            // Generate a password reset token
            const resetToken = crypto.randomBytes(32).toString('hex');

            // Store the token and its expiry (e.g., 15 minutes) in the user's record
            user.resetPasswordToken = resetToken;
            user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

            // Update the user record with the reset token and expiry
            await strapi.query('plugin::users-permissions.user').update({
                where: { id: user.id }, // Conditions for which user to update
                data: { // Data to update
                    resetPasswordToken: resetToken,
                    resetPasswordExpires: user.resetPasswordExpires,
                },
            });

            // Construct the reset URL with the token
            const resetUrl = `${process.env.BASE_URL}/reset-password?code=${resetToken}`;

            // Prepare the email content
            const emailContent = `
            Hello ${user.firstname || 'User'} ${user.lastname || ''},
            <br/><br/>
            You've requested a password reset for the NEEPCO Intranet Portal. Please click the link below to reset your password:
            <br/>
            <a href="${resetUrl}" target="_blank">Reset Password</a>
            <br/><br/>
            Please note that the link will expire after 15 minutes. If you did not request this, please ignore this email.
            
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


