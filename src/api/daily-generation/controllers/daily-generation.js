module.exports = {
    async find(ctx) {
      const { date } = ctx.query;
  
      if (date) {
        // Querying the `daily-generation` collection by `Dated` field
        const reports = await strapi.query('api::daily-generation.daily-generation').findMany({
          where: {
            Dated: date,
          },
          populate: {
            File: true,
          },
        });
        return reports;
      }
  
      // Default behavior if no date is provided
      return await strapi.query('api::daily-generation.daily-generation').findMany(ctx.query);
    },
  };
  