module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      if (ctx.request.files && ctx.request.files.files) {
        const uploadedFiles = Array.isArray(ctx.request.files.files)
          ? ctx.request.files.files
          : [ctx.request.files.files];
  
        for (const file of uploadedFiles) {
          const fileType = file.type;
          const fileExtension = file.name.split('.').pop().toLowerCase();
          const fileSize = file.size;
          const MAX_SIZE = 5 * 1024 * 1024;
  
          if (fileType !== 'application/pdf' || fileExtension !== 'pdf') {
            return ctx.badRequest('Invalid file type. Only pdf are allowed.');
          }
  
          if (fileSize > MAX_SIZE) {
            return ctx.badRequest('File size exceeds the 5MB limit.');
          }
        }
      }
      await next();
    };
  };
  