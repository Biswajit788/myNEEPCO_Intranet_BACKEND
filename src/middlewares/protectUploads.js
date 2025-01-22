module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    // Check if the request is for the /uploads endpoint
    if (ctx.request.url.startsWith('/uploads')) {
      // Allow requests for media previews (image thumbnails) to be unauthenticated
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
        console.log('Decoded token:', decoded);

        // Fetch the user by ID from the decoded token
        const user = await strapi.query('plugin::users-permissions.user').findOne({
          where: { id: decoded.id },
        });

        if (!user) {
          return ctx.unauthorized('Unauthorized: User not found');
        }

        // Attach the user to ctx.state for access in subsequent middleware
        ctx.state.user = user;
        await next();
      } catch (error) {
        console.error('JWT verification failed:', error);
        return ctx.unauthorized('Unauthorized: Invalid token');
      }
    } else {
      // Proceed if not an /uploads request
      await next();
    }
  };
};
