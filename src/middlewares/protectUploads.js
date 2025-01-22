module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.request.url.startsWith('/uploads')) {
      if (ctx.request.url.includes('thumb')) {
        console.log('Allowing unauthenticated access to media thumbnail preview');
        await next();
        return;
      }

      // For other requests (not thumbnails or admin), check for a valid token
      const token = ctx.request.header.authorization?.split(' ')[1];
      if (!token) {
        return ctx.unauthorized('Unauthorized: Token is missing');
      }

      try {
        // Verify the JWT
        const decoded = await strapi.plugins['users-permissions'].services.jwt.verify(token);

        const user = await strapi.query('plugin::users-permissions.user').findOne({
          where: { id: decoded.id },
        });

        if (!user) {
          return ctx.unauthorized('Unauthorized: User not found');
        }

 
        ctx.state.user = user;
        await next();
      } catch (error) {
        console.error('JWT verification failed:', error);
        return ctx.unauthorized('Unauthorized: Invalid token');
      }
    } else {

      await next();
    }
  };
};
