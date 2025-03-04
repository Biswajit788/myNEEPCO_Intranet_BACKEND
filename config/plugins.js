module.exports = ({ env }) => ({
  'users-permissions': {
    enabled: true,
    config: {
      jwtSecret: process.env.JWT_SECRET,
      jwt: {
        expiresIn: '3h',
        algorithm: 'HS512',
      },
    },
  },

  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.example.com'), // Your SMTP host
        port: env.int('SMTP_PORT', 587), // SMTP port (587 for TLS, 465 for SSL)
        auth: {
          user: env('SMTP_USERNAME'), // Your SMTP username
          pass: env('SMTP_PASSWORD'), // Your SMTP password
        },
        // Optional: set additional settings like secure, etc.
        secure: true, // Set to true if you use port 465
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: env('EMAIL_FROM', 'your-email@example.com'),
        defaultReplyTo: env('EMAIL_REPLY_TO', 'your-email@example.com'),
      },
    },
  },

});
