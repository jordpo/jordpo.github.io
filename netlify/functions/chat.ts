import type { Handler, HandlerEvent } from '@netlify/functions';
import { SYSTEM_PROMPT } from './config/system-prompt';
import { API_CONFIG } from './config/api';
import { REDIRECT_MESSAGE } from './config/topics';
import { extractRelevantContext } from './utils/context-extractor';
import { checkRateLimit } from './utils/rate-limiter';
import { isTopicAppropriate } from './utils/topic-validator';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

export const handler: Handler = async (event: HandlerEvent) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Rate limiting
    const ip = event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown';
    if (!checkRateLimit(ip)) {
      return {
        statusCode: 429,
        headers,
        body: JSON.stringify({
          error: 'Too many requests. Please wait a moment before trying again.'
        }),
      };
    }

    // Parse request
    const body: ChatRequest = JSON.parse(event.body || '{}');
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request: messages array required' }),
      };
    }

    // Get the last user message for context extraction
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (!lastUserMessage) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No user message found' }),
      };
    }

    // Check if topic is appropriate
    if (!isTopicAppropriate(lastUserMessage.content)) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ content: REDIRECT_MESSAGE }),
      };
    }

    // Extract relevant context
    const relevantContext = extractRelevantContext(lastUserMessage.content);

    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Chat service is not configured. Please try again later.'
        }),
      };
    }

    // Call Anthropic API
    const anthropicResponse = await fetch(API_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': API_CONFIG.apiVersion,
      },
      body: JSON.stringify({
        model: API_CONFIG.model,
        max_tokens: API_CONFIG.maxTokens,
        temperature: API_CONFIG.temperature,
        system: `${SYSTEM_PROMPT}\n\n## Relevant Context for this conversation:\n${relevantContext}`,
        messages: messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.text();
      console.error('Anthropic API error:', errorData);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to get response from chat service'
        }),
      };
    }

    const data = await anthropicResponse.json();

    // Extract the text content from Claude's response
    const content = data.content?.[0]?.text || "I'm having trouble formulating a response. Could you rephrase that?";

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ content }),
    };

  } catch (error) {
    console.error('Chat function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'An unexpected error occurred. Please try again.'
      }),
    };
  }
};
