// Simple in-memory rate limiter
// For production, use Redis or a proper rate limiting service

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per interval
}

export function rateLimit(identifier: string, config: RateLimitConfig): {
  success: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const key = identifier;

  // Initialize or reset if expired
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + config.interval,
    };
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: store[key].resetTime,
    };
  }

  // Check if limit exceeded
  if (store[key].count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: store[key].resetTime,
    };
  }

  // Increment count
  store[key].count++;

  return {
    success: true,
    remaining: config.maxRequests - store[key].count,
    resetTime: store[key].resetTime,
  };
}

// Get client identifier from request
export function getClientIdentifier(request: Request): string {
  // Try to get IP address
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';
  
  return ip;
}

// Rate limit configurations
export const RATE_LIMITS = {
  // Contact form: 3 submissions per hour
  CONTACT: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 3,
  },
  // Newsletter: 5 signups per hour
  NEWSLETTER: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
  },
  // Challenge submission: 10 per hour
  CHALLENGE: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 10,
  },
  // Pre-order: 5 per hour
  PRE_ORDER: {
    interval: 60 * 60 * 1000, // 1 hour
    maxRequests: 5,
  },
  // General API: 100 per minute
  API: {
    interval: 60 * 1000, // 1 minute
    maxRequests: 100,
  },
};
