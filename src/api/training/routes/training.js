module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/trainings',
        handler: 'training.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/trainings/:id',
        handler: 'training.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  