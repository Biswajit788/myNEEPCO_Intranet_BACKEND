'use strict';

/**
 * increment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::increment.increment');
