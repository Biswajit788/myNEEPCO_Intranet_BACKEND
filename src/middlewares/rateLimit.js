'use strict';

/**
 * `RateLimit` middleware
 */
const RateLimit = require('koa2-ratelimit').RateLimit;

module.exports = (config, { strapi }) => {
  // Default configuration for rate-limiting
  const {
    interval = { min: 10 }, // Time window in minutes
    max = 100, // Maximum requests per interval
    message = 'You have exceeded the maximum number of requests. Please try again later.',
    keyGenerator = (ctx) => ctx.ip, // Use IP address as the default key
  } = config;

  // Initialize the rate limiter middleware
  const limiter = RateLimit.middleware({
    interval, // Time window
    max, // Max requests allowed
    keyGenerator, // Key for identifying requests (IP address or user ID)
    message, // Default error message
    headers: true, // Add rate-limit headers to the response
    handler: async (ctx) => {
      // Custom response when rate limit is exceeded
      strapi.log.warn(`Rate limit exceeded for IP: ${ctx.ip}`);
      ctx.status = 429; // HTTP 429 Too Many Requests
      ctx.set('Retry-After', String(interval.min * 60)); // Convert to string

      ctx.body = {
        statusCode: 429,
        error: 'Too Many Requests',
        message,
        retryAfter: interval.min * 60, // Retry time in seconds
      };
    },
  });

  return async (ctx, next) => {
    try {
      // Apply rate limiter
      await limiter(ctx, next);
    } catch (err) {
      if (err.status === 429) {
        // Log the rate limit error
        strapi.log.warn(`RateLimit: Too many requests from ${ctx.ip}`);
      } else {
        // Rethrow other errors for Strapi to handle
        throw err;
      }
    }
  };
};
