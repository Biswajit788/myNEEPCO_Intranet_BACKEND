module.exports = {
    async find(ctx) {
      const { quarter, year } = ctx.query;
  
      if (quarter && year) {
        // Querying the `quarterly-generation` collection by `Quarter` and `Year` field
        const reports = await strapi.query('api::quarterly-generation.quarterly-generation').findMany({
          where: {
            Quarter: quarter,
            Year: year,
          },
          populate: {
            File: true,
          },
        });
        return reports;
      }
  
      // Default behavior if no date is provided
      return await strapi.query('api::quarterly-generation.quarterly-generation').findMany(ctx.query);
    },
  };
  