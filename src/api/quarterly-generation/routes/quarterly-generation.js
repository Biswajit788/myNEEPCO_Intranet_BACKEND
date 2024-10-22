module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/quarterly-generations',
        handler: 'quarterly-generation.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  