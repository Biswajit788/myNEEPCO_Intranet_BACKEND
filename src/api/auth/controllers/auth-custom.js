module.exports = {
    async loginWithEmployeeCode(ctx) {
        const { ecode, password } = ctx.request.body;

        if (!ecode || !password) {
            console.error('Missing ecode or password');
            return ctx.badRequest('Employee code and password are required');
        }

        try {
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { ecode } });

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
                    ecode: user.ecode,
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
};
