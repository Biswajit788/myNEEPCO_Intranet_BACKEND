'use strict';

/**
 * cp-rule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cp-rule.cp-rule');
