module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/auth/register',
      handler: 'auth-custom.register',
      config: {
        policies: [],
        middlewares: [],
      },
    },
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
      path: '/auth/verify-otp',
      handler: 'auth-custom.verifyOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/resend-otp',
      handler: 'auth-custom.resendOtp',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/auth/forgot-password',
      handler: 'auth-custom.forgotPassword',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'GET',
      path: '/auth/email-confirmation',
      handler: 'auth-custom.emailConfirmation',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
