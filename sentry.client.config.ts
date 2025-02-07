import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const PROJECT_VERSION =
  process.env.PROJECT_VERSION || process.env.NEXT_PUBLIC_PROJECT_VERSION;
const PROJECT_COMMIT_HASH =
  process.env.PROJECT_COMMIT_HASH ||
  process.env.NEXT_PUBLIC_PROJECT_COMMIT_HASH;
const BRANCH_NAME =
  process.env.BRANCH_NAME || process.env.NEXT_PUBLIC_BRANCH_NAME;

Sentry.init({
  dsn: SENTRY_DSN || "https://examplePublicKey@o0.ingest.sentry.io/0",
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  release: `${PROJECT_VERSION}@${PROJECT_COMMIT_HASH}`,
  environment: BRANCH_NAME,
});
