# VYBE (Day 1: landing page)

React + TypeScript + Vite + Tailwind CSS v4. Frontend only. No authentication or backend yet.

## Run locally (Windows PowerShell)

Requires Node 20.19+ or 22.12+ (`node -v`).

    npm install
    npm run dev

Open http://localhost:5173

## Production build check

    npm run build
    npm run preview

## Structure

    src/components/   UI sections (Navbar, Hero, ReceiptCard, ...)
    src/data/         page copy in content.ts
    src/index.css     Tailwind import + design tokens (colours, fonts)
