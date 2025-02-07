ARG SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
ARG NEXT_PUBLIC_BRANCH_NAME=unknown-branch-name

# Install dependencies only when needed
FROM node:18-alpine AS deps

ARG SENTRY_DSN
ARG NEXT_PUBLIC_BRANCH_NAME

RUN export PROJECT_VERSION=$(git describe --tags --always)
ENV NEXT_PUBLIC_PROJECT_VERSION=${PROJECT_VERSION}
RUN export PROJECT_BUILD_DATE=$(date --iso-8601=seconds)
ENV NEXT_PUBLIC_PROJECT_BUILD_DATE=${PROJECT_BUILD_DATE}
RUN export PROJECT_COMMIT_HASH=$(git rev-parse HEAD)
ENV NEXT_PUBLIC_PROJECT_COMMIT_HASH=${PROJECT_COMMIT_HASH}

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM node:18 AS builder

ARG SENTRY_DSN
ARG NEXT_PUBLIC_BRANCH_NAME

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN export PROJECT_VERSION=$(git describe --tags --always) && \
    export PROJECT_BUILD_DATE=$(date --iso-8601=seconds) && \
    export PROJECT_COMMIT_HASH=$(git rev-parse HEAD) && \
    export PROJECT_JSON_VERSION=$(node -p -e "require('./package.json').version") && \
    yarn build


# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine AS runner

ARG SENTRY_DSN
ARG NEXT_PUBLIC_BRANCH_NAME
ENV SENTRY_DSN=${SENTRY_DSN}
ENV NEXT_PUBLIC_BRANCH_NAME=${BRANCH_NAME}

WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 10001 nodejs
RUN adduser --system --uid 10001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
