# Stellar Payment Links API

## Mission
Provide an open, auditable backend that makes Stellar-based payment requests easy to create and track, especially for users without deep blockchain expertise.

## Problem Statement
Without lightweight APIs, non-technical users struggle to generate reusable payment requests and confirm transactions safely. Most tools are either too technical or tightly coupled to custodial services.

## Solution
This Express API stores payment metadata, validates requests, and verifies submitted transaction hashes against Stellar Horizon API. It avoids custodial risk by never receiving private keys.

## Key Features
- `POST /payments` create payment link metadata
- `GET /payments/:id` read payment request details
- `POST /payments/pay` verify tx hash and mark request as paid
- `GET /transactions` list processed payment records
- Horizon verification service abstraction

## How It Works
Create -> Share -> Pay
1. Frontend creates payment request metadata
2. Frontend shares link with payer
3. Payer signs and submits tx on frontend
4. Frontend sends tx hash to backend
5. Backend verifies hash using Horizon and records transaction

## Architecture Overview
- Express routes/controllers/services
- Input validation via Zod middleware
- In-memory storage for MVP simplicity
- Stellar Horizon API verification (`stellar-sdk` Horizon client)

## Setup Instructions
1. Install dependencies:
   - `npm install`
2. Configure environment:
   - `cp .env.example .env`
3. Run development server:
   - `npm run dev`
4. API available at:
   - `http://localhost:5000`

## How To Test Payment Flow
1. Start API
2. Start frontend with `NEXT_PUBLIC_API_URL=http://localhost:5000`
3. Create payment link from frontend
4. Complete a testnet payment from `/pay/:id`
5. Confirm `/transactions` contains the tx hash

## Deployment (Render or Railway)
### Render
1. Create a new Web Service from the repository
2. Build command: `npm install && npm run build`
3. Start command: `npm run start`
4. Environment variables:
   - `PORT=5000`
   - `HORIZON_URL=https://horizon-testnet.stellar.org`
   - `STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015`

### Railway
1. Create project and link repository
2. Add same env vars as above
3. Deploy and verify `GET /health`

## Contribution Guide Summary
See `CONTRIBUTING.md` for local setup, issue selection, and implementation conventions.

## Roadmap
See `ROADMAP.md`.

## Funding Justification
Funding directly supports public infrastructure: stable API hosting, localization, contributor grants, stronger validation, persistence, and educational docs for first-time blockchain users.

## Transparency Commitment
- Public roadmap and backlog
- Open architecture decisions
- Community review for major changes
- No hidden custody of user funds
