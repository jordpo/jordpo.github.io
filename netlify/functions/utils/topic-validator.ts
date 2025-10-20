/**
 * Topic validation utilities
 */

import { BLOCKED_PATTERNS } from '../config/topics';

/**
 * Check if the topic is appropriate for conversation
 * Returns true if appropriate, false if should be blocked
 */
export function isTopicAppropriate(message: string): boolean {
  return !BLOCKED_PATTERNS.some(pattern => pattern.test(message));
}
