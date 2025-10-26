#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { queryExperience, queryExperienceSchema } from './tools/query-experience.js';
import { checkSkills, checkSkillsSchema } from './tools/check-skills.js';
import { getProjects, getProjectsSchema } from './tools/get-projects.js';
import express from 'express';

// Create MCP server
const server = new Server(
  {
    name: 'jordan-morano-portfolio',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'query_experience',
        description:
          "Search through Jordan Morano's work experience using natural language queries. Returns matching experience, projects, and skills.",
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description:
                'Natural language query about work experience (e.g., "elixir projects", "leadership", "distributed systems")',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'check_skills',
        description:
          "Check if Jordan Morano has specific skills or technologies in his profile. Verifies proficiency and provides context from work experience.",
        inputSchema: {
          type: 'object',
          properties: {
            skills: {
              type: 'array',
              items: { type: 'string' },
              description:
                'List of skills/technologies to check (e.g., ["TypeScript", "React", "Kubernetes"])',
            },
          },
          required: ['skills'],
        },
      },
      {
        name: 'get_projects',
        description:
          "Retrieve Jordan Morano's portfolio projects with optional filtering by category (featured/openSource) or technology.",
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['featured', 'openSource', 'all'],
              description: 'Filter by project category: featured (work projects), openSource, or all',
              default: 'all',
            },
            technology: {
              type: 'string',
              description: 'Filter by technology (e.g., "Elixir", "TypeScript")',
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      case 'query_experience': {
        const args = queryExperienceSchema.parse(request.params.arguments);
        const result = await queryExperience(args);
        return {
          content: [{ type: 'text', text: result }],
        };
      }

      case 'check_skills': {
        const args = checkSkillsSchema.parse(request.params.arguments);
        const result = await checkSkills(args);
        return {
          content: [{ type: 'text', text: result }],
        };
      }

      case 'get_projects': {
        const args = getProjectsSchema.parse(request.params.arguments);
        const result = await getProjects(args);
        return {
          content: [{ type: 'text', text: result }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      content: [{ type: 'text', text: `Error: ${errorMessage}` }],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const mode = process.env.MCP_TRANSPORT_MODE || 'stdio';

  if (mode === 'http') {
    // HTTP mode for remote deployment
    const app = express();
    const port = parseInt(process.env.PORT || '8080');

    app.use(express.json());

    // Health check endpoint
    app.get('/health', (_req, res) => {
      res.json({ status: 'ok', server: 'jordan-morano-portfolio-mcp' });
    });

    // MCP endpoint
    app.post('/mcp', async (req, res) => {
      const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => crypto.randomUUID(), // Stateless mode
      });

      await server.connect(transport);

      try {
        await transport.handleRequest(req, res, req.body);
      } catch (error) {
        console.error('Error handling MCP request:', error);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    });

    app.listen(port, () => {
      console.log(`Jordan Morano Portfolio MCP Server running on HTTP at http://localhost:${port}`);
      console.log(`MCP endpoint: http://localhost:${port}/mcp`);
      console.log(`Health check: http://localhost:${port}/health`);
    });
  } else {
    // Stdio mode for local Claude Desktop
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Jordan Morano Portfolio MCP Server running on stdio');
  }
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
