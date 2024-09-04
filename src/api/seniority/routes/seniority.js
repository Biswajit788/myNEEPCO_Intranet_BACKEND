module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/seniorities',
        handler: 'seniority.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/seniorities/:id',
        handler: 'seniority.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  