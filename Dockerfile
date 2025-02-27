###################################################
# Stage: base
#
# This stage installs all dependencies, copies the entire codebase,
# and generates the Prisma client.
###################################################
FROM node:20-alpine AS base
WORKDIR /app

# (Optional) Install build tools if needed for native modules
# RUN apk add --no-cache python3 make g++

# Copy dependency files and install all dependencies (including dev)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the entire codebase
COPY . .

# Generate the Prisma client
RUN npx prisma generate

###################################################
# Stage: builder (production build)
#
# This stage builds the Next.js application.
###################################################
FROM base AS builder
RUN npm run build
RUN npm cache clean --force

###################################################
# Stage: runner (production runtime)
#
# This final stage installs only production dependencies,
# copies the built assets and Prisma client, and runs the app as a non-root user.
###################################################
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user and group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set environment to production
ENV NODE_ENV=production

# Copy dependency files and install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --production && npm cache clean --force

# Copy built assets from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Copy Prisma schema and generated client from base
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Ensure the application directory is owned by the non-root user
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

# Healthcheck to verify the service is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000 || exit 1

CMD ["npm", "start"]

###################################################
# Stage: dev (development runtime)
#
# This stage is used during development.
# It uses the base image (with all dev dependencies) and runs the development server.
###################################################
FROM base AS dev
WORKDIR /app

# Expose the port used by Next.js in development (default 3000)
EXPOSE 3000

# Run the Next.js development server with hot reloading
CMD ["npm", "run", "dev"]


