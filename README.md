# Voyage Ledger

Voyage Ledger is a Next.js app for planning trips, tracking expenses, and generating AI-powered travel insights.

## Features

- Create and manage trips with destination, travel dates, and budget.
- Log expenses by category, date, amount, and optional description.
- Track budget usage and view spending summaries.
- Generate AI-suggested "forgotten" travel expenses for a destination.
- Generate a shareable AI trip report from trip details and expenses.
- Persist trip data in browser localStorage for a no-backend workflow.

## Tech Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS + Radix UI components
- Genkit + Google AI (Gemini) for AI flows
- Firebase Web SDK (project config included in code)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure AI credentials

This project uses Genkit with `@genkit-ai/googleai`.

Create a `.env` file in the project root and provide a Google AI API key (Gemini) compatible with your local Genkit setup.

Example:

```bash
GOOGLE_API_KEY=your_api_key_here
```

### 3. Run the app

```bash
npm run dev
```

Open http://localhost:9002

## Available Scripts

- `npm run dev` - Start Next.js dev server on port 9002
- `npm run build` - Create a production build
- `npm run start` - Start the production server
- `npm run lint` - Run lint checks
- `npm run typecheck` - Run TypeScript checks
- `npm run genkit:dev` - Start Genkit with AI flows
- `npm run genkit:watch` - Start Genkit in watch mode

## Project Structure

- `src/app` - App Router pages and route-specific UI
- `src/components` - Shared UI and feature components
- `src/hooks` - Client hooks and trip state management
- `src/ai/flows` - Genkit AI flows for suggestions and reports
- `src/lib` - Shared types and utilities

## AI Flows Included

- `suggest-expenses` - Suggests commonly forgotten travel expenses based on destination.
- `generate-trip-report` - Produces a plain-text, shareable trip summary including budget and expense totals.

## Data Storage

Trip and expense data is stored in browser localStorage under the key `voyage-ledger-trips`.

## Notes

- This app currently runs as a client-first experience with local persistence.
- AI features require valid API credentials and network access.
