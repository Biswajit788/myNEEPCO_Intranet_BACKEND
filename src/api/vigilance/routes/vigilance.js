module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/vigilances',
        handler: 'vigilance.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/vigilances/:id',
        handler: 'vigilance.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  