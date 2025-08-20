# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

FROM deps AS builder
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Ensure public directory exists even if repo doesn't contain one
RUN mkdir -p public
RUN npm run prisma:generate || npx prisma generate
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Create a non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy standalone build output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

USER nextjs

CMD ["node", "server.js"]

