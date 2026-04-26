# Contributing to Stellar Payment Links API

## Setup
1. Fork and clone the repository
2. Install dependencies with `npm install`
3. Create `.env` from `.env.example`
4. Start local server with `npm run dev`

## Picking Issues
- Prefer issues with clear acceptance criteria
- Confirm ownership in issue comments before implementation
- Keep PRs focused to one concern

## Coding Guidelines
- Keep controllers thin and move logic to services
- Validate all request input
- Use explicit, consistent error responses
- Never handle user private keys on backend
