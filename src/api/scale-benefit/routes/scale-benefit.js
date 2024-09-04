module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/scale-benefits',
        handler: 'scale-benefit.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/scale-benefits/:id',
        handler: 'scale-benefit.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  