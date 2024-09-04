'use strict';

/**
 * circular service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::circular.circular');
