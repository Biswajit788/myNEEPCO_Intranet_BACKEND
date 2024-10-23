'use strict';

/**
 * erp service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::erp.erp');
