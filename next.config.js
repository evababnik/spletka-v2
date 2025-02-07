/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Content security policies if needed more refined use or using with nonces,
// check csp trough middleware https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
const IframeSources = [];

const ImageSources = [];

const ContentSources = [];

const ContentSecurityPolicy = `
   default-src 'self';
   script-src 'self' 'unsafe-inline';
   style-src 'self' 'unsafe-inline';
   font-src 'self';
   object-src 'none';
   base-uri 'self';
   form-action 'self';
   frame-ancestors 'none';
   frame-src ${IframeSources.join(" ")};
   img-src 'self' blob: data: ${ImageSources.join(" ")};
   connect-src 'self' ${ContentSources.join(" ")};
   block-all-mixed-content;
   upgrade-insecure-requests;
`;

// Security Headers
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin" },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
];

const baseNextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  swcMinify: true,
  output: "standalone",
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    PROJECT_VERSION: process.env.PROJECT_VERSION,
    PROJECT_BUILD_DATE: process.env.PROJECT_BUILD_DATE,
    PROJECT_COMMIT_HASH: process.env.PROJECT_COMMIT_HASH,
    PROJECT_JSON_VERSION: process.env.PROJECT_JSON_VERSION,
  },
};

const nextConfigDev = {
  ...baseNextConfig,
};

const nextConfig = {
  //TODO: if strict csp is required on the project eg. flare project, uncomment this section and define csp sources on the top of the file
  // async headers() {
  //   return [
  //     {
  //       // Apply these headers to all routes in your application.
  //       source: "/:path*",
  //       headers: securityHeaders,
  //     },
  //   ];
  // },
  ...baseNextConfig,
};

const sentryConfig = {
  sentry: {
    disableServerWebpackPlugin: true,
    disableClientWebpackPlugin: true,
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return nextConfigDev;
  }

  return withSentryConfig({ ...nextConfig, ...sentryConfig });
};
