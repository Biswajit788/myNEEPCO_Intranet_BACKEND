'use strict';

/**
 * monthly-generation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::monthly-generation.monthly-generation');
