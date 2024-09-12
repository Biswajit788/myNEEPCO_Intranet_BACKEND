module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/monthly-generations',
        handler: 'monthly-generation.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  