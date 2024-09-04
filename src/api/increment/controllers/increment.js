'use strict';

/**
 * increment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::increment.increment');
