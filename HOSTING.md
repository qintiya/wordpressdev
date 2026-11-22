# Hosting and frontend options

WordPress is the CMS/backend and remains in Docker or another PHP-compatible host. `frontend/` is the included Next.js frontend. Netlify and Cloudflare Workers are frontend deployment options; Gatsby, Vue, and Angular are alternative frontend frameworks; Mintlify hosts documentation.

See the [deployment guide](docs/deployment.mdx) and [frontend guide](docs/frontends.mdx). These guides describe integration paths; the repository currently ships only the Next.js application, not separate Gatsby, Vue, or Angular applications.
