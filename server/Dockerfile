# ─── Stage 1: deps ────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

# Copy only manifests first for better layer caching
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --omit=dev

# ─── Stage 2: final runtime image ─────────────────────────────────────────────
FROM node:20-alpine AS runner

# Set NODE_ENV so no dev tooling runs
ENV NODE_ENV=production

# Create a non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Pull in only the production node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source (no .env — secrets come in via docker-compose env_file / env vars)
COPY . .

# Drop to non-root
USER appuser

EXPOSE 8080

# Health check — curl is available on alpine via package; use node as fallback
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "index.js"]

