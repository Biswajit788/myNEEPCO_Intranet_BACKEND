module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/increments',
        handler: 'increment.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/increments/:id',
        handler: 'increment.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  