/**
 * API configuration for Anthropic Claude
 */

export const API_CONFIG = {
  /**
   * Claude model to use
   * Options: 'claude-haiku-4-5', 'claude-sonnet-4-5', etc.
   */
  model: 'claude-haiku-4-5' as const,

  /**
   * Maximum tokens for response
   * Keep this low (150-200) for chat responses to be concise and encourage back-and-forth
   */
  maxTokens: 150,

  /**
   * Temperature for response generation
   * 0.0 = deterministic, 1.0 = creative
   * 0.7 is a good balance for conversational chat
   */
  temperature: 0.7,

  /**
   * API version to use
   */
  apiVersion: '2023-06-01',

  /**
   * API endpoint
   */
  endpoint: 'https://api.anthropic.com/v1/messages'
} as const;

/**
 * Rate limiting configuration
 */
export const RATE_LIMIT = {
  /**
   * Maximum requests per time window
   */
  maxRequests: 10,

  /**
   * Time window in milliseconds (default: 1 minute)
   */
  windowMs: 60000,
} as const;
