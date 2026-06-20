# GoviHitha — AI Crop Advisory for Sri Lanka

GoviHitha ("Farmer's Friend" in Sinhala) helps Sri Lankan farmers diagnose crop diseases, understand weather risks, and find the right products — all from a photo and a description.

## What It Does

1. **Diagnose** — Upload a crop photo + describe symptoms → AI identifies the disease
2. **Weather Risk** — Get weather alerts specific to your diagnosed disease
3. **Resources** — Receive product recommendations with local availability and Kapruka links

## Architecture

```
Farmer Input (image + symptoms + region)
         ↓
   Orchestrator Agent (ADK)
    ├── Crop Diagnosis Agent  →  disease + treatment
    ├── Weather Alert Agent   →  weather risks
    └── Resource Agent        →  products + links
         ↓
   Action Plan (what to do, today)
```

## Tech Stack

- **Agents**: Python + Google ADK + Gemini Vision
- **Weather**: OpenMeteo API (free, no auth)
- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Deployment**: Agents on Cloud Run, Frontend on Vercel

## Quick Start

### Agents (Python)

```bash
cd agents
python -m venv .venv
.venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
cp ../.env.example ../.env   # fill in your API keys
adk web .
```

### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

## Project Structure

```
govihitha/
├── agents/       # ADK agents (Python)
├── frontend/     # Next.js frontend (TypeScript)
└── doc/          # Documentation
```

## Live Demo

_Coming after deployment (Chunk 13–14)_

## License

MIT
