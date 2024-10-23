'use strict';

/**
 * daily-generation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::daily-generation.daily-generation');
