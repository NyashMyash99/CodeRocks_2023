# Code Rocks

## Development

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/en/download) 
- [pnpm](https://pnpm.io/)
- [NestJS](https://nestjs.com)

### Setup
1. Replace `.env` with your credentials
1. Run `pnpm install`
1. Run `docker-compose up -d`
1. Run `sh scripts/migrate.sh`
1. Run `pnpm run dev`

***

### Testing
1. Run `npm install -g dotenv-cli` if it is not installed
1. Run `sh scripts/test-api-integration.sh`
