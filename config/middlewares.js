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
    config: {
      // Add any configuration options for rateLimit middleware
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  {
    name: 'global::protectUploads',
    config: {
      // Add any configuration options for protectUploads middleware
    },
  },
  'strapi::public', 
];
