module.exports = {
    routes: [
      {
        method: 'GET',
        path: '/forms',
        handler: 'form.find',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
      {
        method: 'GET',
        path: '/forms/:id',
        handler: 'form.findOne',
        config: {
          middlewares: ['global::api-token-check'], // Referencing the middleware correctly
        },
      },
    ],
  };
  