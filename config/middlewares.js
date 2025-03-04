module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://10.3.0.57'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'OPTIONS'],
    },
  },

  'strapi::logger',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      enabled: true,
      multipart: true,
      jsonLimit: '5mb',
      formLimit: '5mb',
      textLimit: '5mb',
    },
  },
  // General API Rate Limit
  {
    name: 'global::rateLimit',
    config: {

    },
  },
  {
    name: 'global::protectUploads',
    config: {},
  },
  {
    name: 'global::upload',
    config: {},
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
