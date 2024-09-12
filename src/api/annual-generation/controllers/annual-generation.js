module.exports = {
  async find(ctx) {
    const { year } = ctx.query;

    if (year) {
      // Querying the `daily-generation` collection by `Dated` field
      const reports = await strapi.query('api::annual-generation.annual-generation').findMany({
        where: {
          Year: year,
        },
        populate: {
          File: true,
        },
      });
      return reports;
    }

    // Default behavior if no date is provided
    return await strapi.query('api::annual-generation.annual-generation').findMany(ctx.query);
  },
};