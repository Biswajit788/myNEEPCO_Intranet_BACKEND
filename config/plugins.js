module.exports = ({ env }) => ({
  'users-permissions': {
    enabled: true,
    config: {
      jwtSecret: process.env.JWT_SECRET,
      jwt: {
        expiresIn: '1m',
      },
    },
  },
});
