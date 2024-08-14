## Poke Form

This repository contains the code for a frontend recruitment task: a Pokémon trainer registration form built using Next.js, MUI, and react-hook-form.

## Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/en) (18.8 or later)
- [Docker](https://docs.docker.com)
- [pnpm](https://pnpm.io/installation) (9.6.0 or later)

## Development

You can run the development server using either Docker or pnpm. Both support auto-updates on file edits.

### Using pnpm

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

### Using Docker

```bash
# Build container
docker compose -f docker-compose.dev.yaml build

# Run container
docker compose -f docker-compose.dev.yaml up
```

Open your browser and navigate to http://localhost:3000 to see the app.

## Production

To build and run the production version:

```bash
# Build production container
docker compose -f docker-compose.prod.yaml build

# Run production container
docker compose -f docker-compose.prod.yaml up
```

## Running E2E Tests

```bash
# Run E2E tests using Cypress console
pnpm e2e:dev

# Run E2E tests in headless mode
pnpm e2e:dev:headless
```
