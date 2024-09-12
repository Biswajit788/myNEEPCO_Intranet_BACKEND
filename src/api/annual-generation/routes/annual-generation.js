module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/annual-generations',
        handler: 'annual-generation.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  