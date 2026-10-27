# REELTRACE — The Cinema Memory Machine

> **You remember the moment. We find the movie.**

A distinctive, creative movie-discovery website that starts with memory—not a title. Built with Next.js, TypeScript, and Tailwind CSS.

![Prototype](https://img.shields.io/badge/status-prototype-orange) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 🔍 Find a Line (Trace)
Type a half-remembered quote and get matched to the film. Supports fuzzy matching, typo tolerance, and token overlap scoring.

### 🎬 Find a Scene
Describe what happens — the setting, the mood, the moment — and trace it back to its source.

### 🎲 Spin the Shelf (Roulette)
Can't decide? Let the reel choose for you. Filter by genre/mood, skip watched films, and save discoveries.

### 📚 The Keep Pile
Your personal film archive. Save, remove, export, and track what you've watched — all stored locally on your device.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom CSS (matching the original prototype)
- **State:** React Context + localStorage
- **Search:** Custom fuzzy matching engine with Levenshtein distance
- **Fonts:** DM Sans, DM Mono, Instrument Serif (Google Fonts)

## 📁 Project Structure

```
app/                  # Next.js App Router pages
  layout.tsx          # Root layout with providers
  page.tsx            # Main single-page application
  globals.css         # All styles (faithful to prototype)

components/
  layout/             # Header, Footer, Ticker
  hero/               # Hero section, How It Works cards
  finder/             # The Search Room (quote/scene/roulette)
  film/               # Result cards, Roulette pick card
  keep-pile/          # Keep Pile / saved films section
  feedback/           # Toast notifications

lib/
  domain/             # Types and demo data
  search/             # Search engine and roulette logic
  storage/            # localStorage persistence
  context/            # React context for global state
```

## ⚠️ Demo Data Notice

This prototype uses **illustrative sample data only**. No live subtitle database, streaming service, or movie metadata API is connected.

- All search results are from a small demo catalogue
- Timestamps are illustrative, not verified
- Scene coordinates are for demonstration purposes
- A production version would require licensed subtitle/dialogue data sources

## 📋 Key Design Decisions

- **UI preserved exactly** from the original HTML prototype
- **Search logic separated** from UI components for testability
- **Provider adapter pattern** — demo data can be swapped for live APIs
- **localStorage validation** — corrupted/stale data handled gracefully
- **Reduced motion** respected via `prefers-reduced-motion` media query
- **Mobile responsive** with hamburger menu and adapted layouts

## 📄 License

Concept prototype. Not a live service.
