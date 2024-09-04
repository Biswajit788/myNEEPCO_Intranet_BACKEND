'use strict';

/**
 * vigilance service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vigilance.vigilance');
