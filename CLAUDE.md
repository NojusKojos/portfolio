# Portfolio Project — Claude Guidelines

## MCP Servers

### Context7
Always use Context7 when needing library or API documentation, code generation help, setup steps, or configuration guidance — without requiring an explicit ask. Use the `resolve-library-id` and `get-library-docs` tools to pull up-to-date docs for any library used in this project (React, Vite, Tailwind, etc.).

### Exa
Use Exa for real-time web search, finding code examples, researching design patterns, or looking up anything that may have changed since the knowledge cutoff. Prefer `web_search_exa` for general queries and `get_code_context_exa` for code-specific lookups.
