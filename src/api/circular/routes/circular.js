module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/circulars',
        handler: 'circular.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/circulars/:id',
        handler: 'circular.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  