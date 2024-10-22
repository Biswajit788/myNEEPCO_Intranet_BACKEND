'use strict';

/**
 * quarterly-generation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quarterly-generation.quarterly-generation');
