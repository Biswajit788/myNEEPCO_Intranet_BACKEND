module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/power-generation-reports',
        handler: 'power-generation-report.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/power-generation-reports/:id',
        handler: 'power-generation-report.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  