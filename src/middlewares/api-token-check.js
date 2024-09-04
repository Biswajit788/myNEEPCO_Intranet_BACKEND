module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      const apiToken = ctx.request.headers['authorization'];
  
      if (!apiToken) {
        ctx.status = 401; // Unauthorized
        ctx.body = { message: 'Unauthorized' };
        return;
      }
  
      await next();
    };
  };
  