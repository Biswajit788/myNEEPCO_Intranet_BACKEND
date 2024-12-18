const rateLimit = require('../src/middlewares/rateLimit')
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: '*',
      headers: '*',
    },
  },
  {
    name: 'global::rateLimit',
    config: {},
  }, 
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
