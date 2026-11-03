<div align="center">

<img src="public/favicon.svg" width="72" alt="VYBE logo" />

# VYBE

### Prove it. Score it. Settle it.

Friend-group challenges on any topic, with proof check-ins, fair scoring, and a result card with a name on the loser.

![Status](https://img.shields.io/badge/status-early%20build-D2F53C?style=for-the-badge&labelColor=121212)
![React](https://img.shields.io/badge/React-19-121212?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-121212?style=for-the-badge&logo=typescript&logoColor=3178C6)
![Vite](https://img.shields.io/badge/Vite-7-121212?style=for-the-badge&logo=vite&logoColor=A855F7)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-121212?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)

</div>

---

## What is VYBE?

Every group chat has one: *"I bet I can wake up at 6 every day for a week."* Then the scores live in a spreadsheet nobody updates, nobody can tell who really did it, and the loser quietly forgets the forfeit.

VYBE is a web app that finishes the challenge your friends start. You create a challenge, invite your group with one link, check in daily with proof, and when the season ends VYBE settles the score with a shareable result card.

> **Where we are:** this repository currently holds the **frontend foundation**: the VYBE landing page. There is no authentication, database or backend yet, and nothing on the page pretends otherwise.

## What's built so far

- [x] Project foundation: React, TypeScript, Vite, Tailwind CSS v4
- [x] Design tokens (colours, fonts) defined once in `src/index.css`
- [x] Responsive landing page: navigation, hero, how it works, features, comparison, FAQ, footer
- [x] Mobile menu, smooth anchor scrolling, keyboard focus styles
- [x] Respects the "reduce motion" accessibility setting

## What we are building

These are planned, not shipped. The landing page labels them the same way.

| Idea | What it means |
|---|---|
| **Proof, not promises** | Check-ins can carry a photo or note, and friends can confirm or flag them. Works for any challenge, no wearable needed. |
| **Stakes without money** | Set a forfeit at the start: coffee, a dare, picking the next challenge. |
| **Fair scoring** | Score against your own baseline so a beginner can beat a veteran. |
| **Seasons and rivalries** | Short seasons, plus group history and head-to-head records. |
| **One-tap templates** | Start from a ready-made challenge instead of a blank page. |
| **Challenge Receipt** | A shareable result card at the end of every challenge. |

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19 + TypeScript |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Fonts | Bricolage Grotesque and Instrument Sans (Google Fonts) |

## Getting started

**You need:** [Node.js](https://nodejs.org) 20.19+ or 22.12+, and Git.

```bash
# 1. Check your Node version
node -v

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173**.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the local dev server with hot reload |
| `npm run build` | Type-checks with TypeScript, then builds to `dist/` |
| `npm run preview` | Serves the production build locally |

### Windows PowerShell note

If PowerShell blocks `npm` with a script-execution error, run this once and try again:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

## Project structure

```
vybe/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ Button.tsx
│  │  ├─ Compare.tsx
│  │  ├─ Faq.tsx
│  │  ├─ Features.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Hero.tsx
│  │  ├─ HowItWorks.tsx
│  │  ├─ Logo.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ ReceiptCard.tsx
│  │  └─ StatusPill.tsx
│  ├─ data/
│  │  └─ content.ts        # all page copy lives here
│  ├─ App.tsx
│  ├─ index.css            # Tailwind import + design tokens
│  └─ main.tsx
├─ index.html
├─ vite.config.ts
└─ package.json
```

## Customising the design

All brand colours and fonts are defined in one place, the `@theme` block in `src/index.css`:

| Token | Value | Used for |
|---|---|---|
| `paper` | `#F5F2EA` | Page background |
| `ink` | `#121212` | Text and dark surfaces |
| `volt` | `#D2F53C` | Highlight accent |
| `flare` | `#FF5A36` | Forfeit and alert accent |
| `sand` | `#E8E3D6` | Alternate section background |

Change a value there and the whole site updates. To edit wording, change `src/data/content.ts`; you don't need to touch the components.

## Roadmap

This is the intended direction. Each stage ships only when it works for real.

- [x] **Done:** frontend foundation and landing page
- [ ] **Next:** authentication (email magic link and Google) and the database
- [ ] **Then:** create a challenge, invite by link, join
- [ ] **Then:** daily check-ins, leaderboard, XP and streaks
- [ ] **Then:** photo proof, peer flagging, moderation
- [ ] **Then:** the Challenge Receipt, forfeits, seasons, reminders
- [ ] **Later:** private beta with real friend groups

## Contributing

VYBE is in early development and is not open for outside contributions yet. If you are on the team, create a branch, keep changes small, and run `npm run build` before you commit.

## License

Not decided yet. Until a license is added, all rights are reserved.

---

<div align="center">

**VYBE** · Built step by step by Team VYBE

</div>