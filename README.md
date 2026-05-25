# Yoga Me

A minimal, mobile-friendly web app for guided movement sessions — yoga, stretching, rehab, and physiotherapy.

## Features

- **4 practice categories** — yoga, stretching, rehab, and physiotherapy
- **Customizable sessions** — choose your level (beginner / intermediate / advanced) and duration
- **Guided pose flow** — SVG skeleton figures, hold-duration countdown, and pose-by-pose navigation
- **Auto-advance** — timer automatically moves to the next pose; toggle it off to go at your own pace
- **Pose details** — description, Sanskrit name, targeted body parts, and benefits for each pose
- **Completion summary** — review your session when you finish

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vite](https://vite.dev)
- [React Router v7](https://reactrouter.com)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

The app deploys automatically to [GitHub Pages](https://pages.github.com) on every push to `main` via the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
