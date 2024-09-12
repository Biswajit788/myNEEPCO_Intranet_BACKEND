'use strict';

/**
 * annual-generation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::annual-generation.annual-generation');
