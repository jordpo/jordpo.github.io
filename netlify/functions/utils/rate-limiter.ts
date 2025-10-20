/**
 * Rate limiting utilities
 */

import { RATE_LIMIT } from '../config/api';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (resets on function cold start)
const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Check if an IP has exceeded the rate limit
 * Returns true if request should be allowed, false if rate limited
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  // No entry or window expired - create new entry
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return true;
  }

  // Rate limit exceeded
  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  // Increment count and allow
  userLimit.count++;
  return true;
}

/**
 * Clean up expired entries (optional, helps with memory in long-running functions)
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}
