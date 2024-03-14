## Overview

Greenpill Network App is focused on making it easy to onboard individuals and groups into the Web3 public goods ecosystem. This is done by making it simple for a user to create a wallet then sibsequently mint NFTs based on bulic good action such as food drives, cleanups, conoferences, etc.

## Getting Started

The repo is based off the Web3 starter kit by Oba-One and is a monorepo using **pnpm** with all code held under packages directory.
Packages consists of API, Clients, and Contracts and can be ran simultonolesouly E2E in a local environment.

In order to run this project you need these dependencies:

- [Node](https://nodejs.org/en/download/current) version 18+ for running scripts and PNPM.
- [PNPM](https://pnpm.io/installation) version 6+ for package management.
- [Docker](https://docs.docker.com/get-docker) for database services Postgres and Redis.

### Installation

Once you have the dependencies installed you can run the following commands to get the project up and running:

- `pnpm init` - Initialize the project with PNPM. Installs packages, generate tls certs, and runs dev environment.
- `pnpm install` - Install all dependencies for the project.
- `pnpm run dev` - Run the project in development mode with hot reloading.

### Environment Variables

The project uses environment variables for configuration. These variables are stored in a `.env` file in the root of all packages for the project. You can copy the `.env.sample` file in each pckage to get started.

### Tests

Test can be ran at both the package level and root with `pnpm run test`.

Testing Structure:

- Clients use vitest and testing library for writing and running tests
- API uses Supertest in conjunction with Jest for writing and executing tests

## Architecture

The repo is architected with packages holding different code for different aspect of an application from clients to API. API is a singletons while clients may hold multiple for different interfaces (web, mobile)

Languages used:

- [Typescript](https://www.typescriptlang.org/download) - Used for both client and API code with a types folder holding global type declerations and types created directly in routes, hooks, components, and views.
- [Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html#npm-node-js) - Language for writing Ethereum based contracts, compiling, and deploying.

Core libraries:

- [React](https://react.dev) - Library for rendering UI and controlling basic state.
- [Vite](https://vitejs.dev) - Build and development library for client UIs.
- [Express](https://expressjs.com) - Server based library handling server setup, routing, middleware.
- [Prisma](https://www.prisma.io) - Database client and schema manager controlling SQL based DB.
-

## Contributing

Project is open sourced and open for contributors who want to help with different aspects of the project. A roadmap for developers will be coming soon to have a clear view on work.

If you would like to contribute here are the following steps:

- Fork the repo and get your local environment up and running, if any issues post in the greenpill network labs  [discussion](https://github.com/orgs/greenpill-network-labs/discussions) tab.
- Pick up an open task from the [project board](https://github.com/orgs/greenpill-network-labs/projects/1) that's not assigned and fully defined, create a branch with the issue name.
- Once done open a [PR](https://github.com/greenpill-network-labs/app/pulls) to merge into the development branch of the greenpill repo
- Once approved make sure your branch is up to date with main and complete the merge.
