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
    {
      method: 'POST',
      path: '/auth/forgot-password',
      handler: 'auth-custom.forgotPassword', // Ensure this matches the controller method
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
