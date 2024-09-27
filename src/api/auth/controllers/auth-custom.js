const crypto = require('crypto');

module.exports = {
    async loginWithEmployeeCode(ctx) {
        const { username, password } = ctx.request.body;

        if (!username || !password) {
            console.error('Missing ecode or password');
            return ctx.badRequest('Employee code and password are required');
        }

        try {
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });

            if (!user) {
                return ctx.badRequest('Invalid employee code');
            }

            const validPassword = await strapi.plugin('users-permissions').service('user').validatePassword(password, user.password);

            if (!validPassword) {
                return ctx.unauthorized('Invalid password');
            }

            const token = strapi.plugin('users-permissions').service('jwt').issue(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fname: user.firstname,
                    lname: user.lastname,
                    dob: user.dob,
                    role: user.role,
                }
            );

            /*  const sanitizedUser = {
                 id: user.id,
                 username: user.username,
                 email: user.email,
                 ecode: user.ecode,
                 // Add any other fields you want to include, excluding sensitive ones like password
             }; */
            ctx.send({
                jwt: token,
                //user: sanitizedUser,
            });

        } catch (error) {
            console.error('Error inside try block:', error.message);
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
};


