module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/promotions',
        handler: 'promotion.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/promotions/:id',
        handler: 'promotion.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  