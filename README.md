# EcoMeter

**How many Earths does your lifestyle need?**

EcoMeter is an interactive sustainability web app that estimates your ecological footprint as a single, easy-to-grasp number: *"If everyone lived like you, how many Earths would humanity need?"* After a short quiz, it shows a breakdown of where your impact comes from and suggests practical habit changes, with a simulator that projects how much your footprint would shrink if you adopted them.

> EcoMeter is an educational tool. It uses simplified, predefined weighting factors to make environmental data understandable. It is not a certified carbon or footprint audit.

---

## Team

This project was created by:

| Name | Registration No. |
|------|------------------|
| Dhruv Prasad Warrier | 25BCE10476 |
| Suyash Avatar | 25BCE10367 |
| Vivek Yadav | 25BCE10796 |

---

## Features

- **10-question lifestyle quiz** across four categories: Food & Nutrition, Housing & Energy, Mobility & Travel, and Goods, Water & Waste.
- **Earth Meter**: visual display of your total footprint in "Earths," with a status level from *Sustainable* to *Critical Ecological Overshoot*.
- **Personal Overshoot Day**: the day of the year your personal consumption would exhaust one Earth's yearly resources.
- **Category breakdown**: share of your footprint per category, impact level, and your highest-impact answer in each.
- **Action Simulator**: pick improvement pledges (e.g. Meatless Mondays, swapping solo driving for transit, a 30-day rule for purchases) and see your projected footprint update live.
- **Tailored recommendations**: suggestions prioritised from your two highest-impact categories.
- **About page**: explains the Ecological Footprint framework, the model's four domains, and discussion prompts for environmental science classes.
- Fully client-side: no backend, no account, and no data leaves your browser.

---

## How the Calculation Works

1. Each quiz answer carries an `impactScore` (its contribution in Earths).
2. Scores are summed per category, plus a fixed **shared infrastructure baseline of 0.20 Earths** (roads, hospitals, water lines, and other services everyone in modern society relies on).
3. The total is rounded to one decimal place.
4. **Overshoot Day** = `365 / totalEarths` (day of year). If the total is 1.0 or lower, the overshoot day is never reached.
5. Category impact levels: `low` (< 0.3), `moderate` (< 0.7), `elevated` (< 1.1), `critical` (≥ 1.1).
6. The Action Simulator subtracts each selected pledge's estimated reduction from your total (projected result is floored at 0.9 Earths).

The scoring data lives in [`src/data/quizData.ts`](src/data/quizData.ts) and the calculation logic in [`src/data/recommendations.ts`](src/data/recommendations.ts), so weights and questions are easy to adjust.

---

##  Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool and dev server)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Motion](https://motion.dev/) (animations)
- [Lucide React](https://lucide.dev/) (icons)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm

### Installation and Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check the project with `tsc --noEmit` |
| `npm run clean` | Remove build output |

---

## Project Structure

```
ecometer/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── src/
    ├── main.tsx              # App entry point
    ├── App.tsx               # View routing and app state
    ├── index.css             # Tailwind import and base styles
    ├── types.ts              # Shared TypeScript types
    ├── data/
    │   ├── quizData.ts       # Quiz questions, options, scoring weights
    │   └── recommendations.ts# Footprint calculation and improvement pledges
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Footer.tsx
    │   ├── EarthMeter.tsx        # Total footprint visual and status
    │   ├── CategoryBreakdown.tsx # Per-category results
    │   └── ActionSimulator.tsx   # Pledge selection and projected footprint
    └── views/
        ├── HomeView.tsx
        ├── QuizView.tsx
        ├── ResultsView.tsx
        └── AboutView.tsx
```

---

## Background

The Ecological Footprint framework, developed by Mathis Wackernagel and William Rees (Global Footprint Network), measures the biologically productive land and sea area needed to supply what a person consumes and to absorb their waste. Dividing that demand by the planet's available per-capita biocapacity gives a simple ratio: above **1.0**, humanity is drawing down natural capital faster than it regenerates.

---

## License

Source files carry an Apache-2.0 license header (`SPDX-License-Identifier: Apache-2.0`).
