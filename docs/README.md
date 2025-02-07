# Dev Docs

This document is intended for developers that are planning to work on a project. The document is meant to be extendend according to project specific settings or directions for other developers.

## Project structure

This is some general idea how project folder structre should look like:

- pages/app
- scripts
- docs
- resources
  - apigen
  - and other similar files
- src
  - unstyled - components (reusable)
  - styled - components
    - specific to project
    - bigger complete chnunks
    - buttons
    - icons
    - layout
    - modal
  - forms
    - validators
  - data components
    - useQuery
    - componets from other styled components

Once "app directory" structure will be in stable version we should migrate from "pages structure" to "app directory" structure. See the Next.js documentation.

## Configure Sentry

Sentry is already added to project. Before you start using it you will need to define:

- SENTRY_ENABLED=true in .env file
- SENTRY_DSN in .env file
- .sentryclirc
- .sentry.properties (organization and project and default url if different)
- costum _error page to capture all errors - just rename file \_error.tsx.sentryexample_ to \_error.tsx in pages folder.
