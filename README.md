# AI Startup Idea Validator (MVP)

A full-stack MVP that accepts startup ideas, runs AI validation, and stores results.

## Tech Stack

- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- AI: OpenAI Chat Completions API
- Database: MongoDB (Mongoose)

## Features

- Submit idea with title and description
- AI-generated structured validation report:
  - Problem summary
  - Customer persona
  - Market overview
  - Competitor list (exactly 3)
  - Suggested tech stack (4-6)
  - Risk level (Low/Medium/High)
  - Profitability score (0-100)
  - Justification
- Dashboard showing stored ideas
- Report detail page with clean formatted sections
- Delete idea (optional endpoint implemented)

## Project Structure

- client: React frontend
- server: Express API + MongoDB + AI integration

## Setup Instructions

### 1) Clone and install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2) Configure environment variables

#### Server

```bash
cd server
cp .env.example .env
```

Set values in `.env`:

- `PORT` (default 5001)
- `MONGODB_URI` (local MongoDB or Mongo Atlas URI)
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (default `gpt-4o-mini`)
- `CORS_ORIGIN` (default `http://localhost:5173`)

#### Client

```bash
cd ../client
cp .env.example .env
```

Set values in `.env`:

- `VITE_API_URL=http://localhost:5001`

### 3) Run locally

In terminal 1:

```bash
cd server
npm run dev
```

In terminal 2:

```bash
cd client
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5001`.

## API Endpoints

- `POST /ideas` -> create idea and trigger AI analysis
- `GET /ideas` -> list all ideas (summary fields)
- `GET /ideas/:id` -> fetch full analysis report
- `DELETE /ideas/:id` -> delete an idea

## Prompt Used (Server AI Service)

```text
You are an expert startup consultant. Analyze the given startup idea and return a structured JSON object with the fields: problem, customer, market, competitor, tech_stack, risk_level, profitability_score, justification. Rules: Keep answers concise and realistic. competitor should contain exactly 3 competitors with one-line differentiation each. tech_stack should be 4-6 practical technologies for MVP. profitability_score must be an integer between 0-100. Return ONLY JSON.
```

User input sent as JSON:

```json
{ "title": "...", "description": "..." }
```

## Deployment Guide (Preferred)

### Backend (Render / Railway)

- Deploy folder: `server`
- Build command: `npm install`
- Start command: `npm start`
- Add env vars from `server/.env.example`

### Frontend (Vercel / Netlify)

- Deploy folder: `client`
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` to your deployed backend URL

### Database

- Use MongoDB Atlas
- Put Atlas connection string in `MONGODB_URI`

## Notes on Architecture (for submission)

- Backend validates request body with Zod, then requests structured JSON from OpenAI.
- AI output is schema-validated again before DB persistence.
- Frontend follows a page-based structure with reusable API layer and card component.
- Result is a clean, interview-ready MVP with clear extension points (auth, pagination, retries).
