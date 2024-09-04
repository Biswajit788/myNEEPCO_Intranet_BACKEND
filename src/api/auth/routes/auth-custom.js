module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/auth/login-employee',
        handler: 'auth-custom.loginWithEmployeeCode',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };
  