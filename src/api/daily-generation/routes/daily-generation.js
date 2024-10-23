module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/daily-generations',
        handler: 'daily-generation.find',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  