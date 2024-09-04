module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/transfers',
        handler: 'transfer.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/transfers/:id',
        handler: 'transfer.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  