'use strict';

const { RateLimit } = require('koa2-ratelimit');

/**
 * `RateLimit` middleware
 */
module.exports = (config, { strapi }) => {

  // Function to extract user ID (username) from the request
  async function getUserId(ctx) {
    try {
      if (ctx.request.body && typeof ctx.request.body === 'object' && ctx.request.body.username) {
        //strapi.log.info(`Extracted username for rate limiting: ${ctx.request.body.username}`);
        return ctx.request.body.username;
      }
      // Fallback to IP if username is not found
      //strapi.log.warn(`Username not found in request. Falling back to IP: ${ctx.ip}`);
      return ctx.ip;
    } catch (error) {
      //strapi.log.error('Error extracting user ID:', error);
      return ctx.ip;
    }
  }

  // Function to generate a unique key for rate limiting
  async function keyGenerator(ctx) {
    const userId = await getUserId(ctx);
    const key = `login_attempts|${userId}`;

    //strapi.log.info(`Generated rate limit key: ${key}`);
    return key;
  }


  // General API Rate Limiter (200 requests per 15 minutes)
  const generalLimiter = RateLimit.middleware({
    interval: { min: 10 },
    max: 200,
    keyGenerator: async (ctx) => ctx.ip,
    message: 'You have exceeded the maximum number of requests. Please try again later.',
    headers: true,
    handler: async (ctx) => {
      strapi.log.warn(`General Rate limit exceeded for IP: ${ctx.ip}`);
      ctx.status = 429;
      ctx.set('Retry-After', '900'); // 15 minutes in seconds
      ctx.body = {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'You have exceeded the maximum number of requests. Please try again later.',
        retryAfter: 900,
      };
    },
  });

  // Login Attempt Rate Limiter (5 failed attempts per 10 minutes)
  const loginAttemptLimiter = RateLimit.middleware({
    interval: { min: 10 }, 
    max: 5,
    keyGenerator,
    message: 'Too many failed login attempts. Please try again later.',
    headers: true,
    handler: async (ctx) => {
      const userId = await getUserId(ctx);
      strapi.log.warn(`Login rate limit exceeded for user: ${userId}`);
      ctx.status = 429;
      ctx.set('Retry-After', '600');
      ctx.body = {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'Too many failed login attempts. Please try again later.',
        retryAfter: 600,
      };
    },
  });

  // OTP Verification Rate Limiter (5 attempts per 10 min)
  const otpVerifyLimiter = RateLimit.middleware({
    interval: { min: 10 },
    max: 5,
    keyGenerator,
    message: 'Too many failed OTP attempts. Please try again later.',
    headers: true,
    handler: async (ctx) => {
      const userId = await getUserId(ctx);
      strapi.log.warn(`OTP Verification Rate limit exceeded for user: ${userId}`);
      ctx.status = 429;
      ctx.set('Retry-After', '600');
      ctx.body = {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'Too many failed OTP attempts. Please try again later.',
        retryAfter: 600,
      };
    },
  });

  // Resend OTP Rate Limiter (3 attempts per 10 min)
  const resendOtpLimiter = RateLimit.middleware({
    interval: { min: 10 },
    max: 3,
    keyGenerator,
    message: 'Too many OTP resend requests. Please try again later.',
    headers: true,
    handler: async (ctx) => {
      const userId = await getUserId(ctx);
      strapi.log.warn(`Resend OTP Rate limit exceeded for IP: ${userId}`);
      ctx.status = 429;
      ctx.set('Retry-After', '600');
      ctx.body = {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'Too many OTP resend requests. Please try again later.',
        retryAfter: 600,
      };
    },
  });

  // Forgot Password Rate Limiter (5 attempts per 10 min)
  const forgotPasswordLimiter = RateLimit.middleware({
    interval: { min: 10 },
    max: 3,
    keyGenerator,
    message: 'Too many failed password reset requests. Please try again later.',
    headers: true,
    handler: async (ctx) => {
      const userId = await getUserId(ctx);
      strapi.log.warn(`Forgot Password Rate limit exceeded for IP: ${userId}`);
      ctx.status = 429;
      ctx.set('Retry-After', '600');
      ctx.body = {
        statusCode: 429,
        error: 'Too Many Requests',
        message: 'Too many password reset requests. Please try again later.',
        retryAfter: 600,
      };
    },
  });

  return async (ctx, next) => {
    try {
      // Apply login attempt limiter only for failed login requests
      if (ctx.path.startsWith('/api/auth/login-employee') && ctx.method === 'POST') {
        await loginAttemptLimiter(ctx, next);
      } else if (ctx.path.startsWith('/api/auth/verify-otp')) {
        await otpVerifyLimiter(ctx, next);
      } else if (ctx.path.startsWith('/api/auth/resend-otp')) {
        await resendOtpLimiter(ctx, next);
      } else if (ctx.path.startsWith('/api/auth/forgot-password')) {
        await forgotPasswordLimiter(ctx, next);
      } else {
        await generalLimiter(ctx, next);
      }
    } catch (err) {
      if (err.status === 429) {
        strapi.log.warn(`RateLimit: Too many requests from ${await getUserId(ctx)} on ${ctx.path}`);
      } else {
        throw err;
      }
    }
  };
};
