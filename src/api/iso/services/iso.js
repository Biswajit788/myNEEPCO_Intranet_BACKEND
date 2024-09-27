'use strict';

/**
 * iso service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::iso.iso');
