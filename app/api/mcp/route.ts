// MCP (Model Context Protocol) endpoint — exposes portfolio content as tools
// so Claude, Cursor, ChatGPT etc. can query Charanselvam's portfolio directly.
// Implements a minimal subset of the MCP spec over HTTP (JSON-RPC 2.0).
//
// Compatible with: Claude Desktop, Cursor, any MCP-aware client
// Add to MCP settings: { "url": "https://your-domain.com/api/mcp" }

import { NextRequest, NextResponse } from 'next/server';
import { PROFILE, PROJECTS, SKILLS, NOW, STATS } from '@/lib/content';

const tools = [
  {
    name: 'get_profile',
    description: "Returns Charanselvam S's professional profile: name, title, location, bio, contact links, and what he is open to.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_projects',
    description: "Returns the list of projects Charanselvam S has built. Can be filtered by featured projects only.",
    inputSchema: {
      type: 'object',
      properties: { featured_only: { type: 'boolean', description: 'If true, return only featured projects' } },
      required: [],
    },
  },
  {
    name: 'get_skills',
    description: 'Returns the grouped list of technical skills and certifications.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_now',
    description: "Returns what Charanselvam S is currently working on, learning, and open to.",
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
  {
    name: 'get_stats',
    description: 'Returns key career statistics: years of experience, carriers integrated, AI projects in production, certifications.',
    inputSchema: { type: 'object', properties: {}, required: [] },
  },
];

function callTool(name: string, args: Record<string, unknown>) {
  switch (name) {
    case 'get_profile':
      return { profile: PROFILE };
    case 'get_projects': {
      const featured = args.featured_only === true;
      return { projects: featured ? PROJECTS.filter((p) => p.featured) : PROJECTS };
    }
    case 'get_skills':
      return { skills: SKILLS };
    case 'get_now':
      return { now: NOW };
    case 'get_stats':
      return { stats: STATS };
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

export async function POST(req: NextRequest) {
  let body: { jsonrpc: string; id: unknown; method: string; params?: Record<string, unknown> };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
  }

  const { id, method, params = {} } = body;

  try {
    if (method === 'initialize') {
      return NextResponse.json({
        jsonrpc: '2.0', id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'charanselvam-portfolio', version: '1.0.0' },
        },
      });
    }

    if (method === 'tools/list') {
      return NextResponse.json({ jsonrpc: '2.0', id, result: { tools } });
    }

    if (method === 'tools/call') {
      const { name, arguments: toolArgs = {} } = params as { name: string; arguments?: Record<string, unknown> };
      const result = callTool(name, toolArgs);
      return NextResponse.json({
        jsonrpc: '2.0', id,
        result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] },
      });
    }

    return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32601, message: 'Method not found' } });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ jsonrpc: '2.0', id, error: { code: -32603, message: msg } });
  }
}

// Allow GET to return a discovery document for clients that probe the endpoint
export async function GET() {
  return NextResponse.json({
    name: 'Charanselvam S — Portfolio MCP Server',
    description: 'Ask about projects, skills, stats, and what Charanselvam is currently working on.',
    tools: tools.map((t) => ({ name: t.name, description: t.description })),
    protocol: 'MCP 2024-11-05',
  });
}
