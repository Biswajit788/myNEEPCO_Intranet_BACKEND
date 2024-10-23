module.exports = {
    async find(ctx) {
      const { month, year } = ctx.query;
  
      if (month && year) {
        // Querying the `monthly-generation` collection by `Month` and `Year` field
        const reports = await strapi.query('api::monthly-generation.monthly-generation').findMany({
          where: {
            Month: month,
            Year: year,
          },
          populate: {
            File: true,
          },
        });
        return reports;
      }
  
      // Default behavior if no date is provided
      return await strapi.query('api::monthly-generation.monthly-generation').findMany(ctx.query);
    },
  };
  