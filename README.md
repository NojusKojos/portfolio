# Nojus Portfolio

Personal portfolio for Nojus Pečiukonis — musician, producer, and creative.

## Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI framework |
| [TypeScript 5](https://www.typescriptlang.org) | Type-safe JavaScript (strict mode) |
| [Vite 5](https://vitejs.dev) | Build tool & dev server |
| [React Router 6](https://reactrouter.com) | Client-side routing |
| [Framer Motion 11](https://www.framer.com/motion) | Animations & transitions |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 3D rendering (Three.js) |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scroll |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) | Fast Rust-based linter |
| [pnpm](https://pnpm.io) | Package manager |

## Setup

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:3000)
pnpm dev

# Type-check
pnpm type-check

# Lint
pnpm lint
pnpm lint:fix

# Production build
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── components/       # Shared UI components
│   ├── CustomCursor.tsx
│   ├── FloatingShapes.tsx
│   ├── Footer.tsx
│   ├── MagneticButton.tsx
│   ├── MarqueeText.tsx
│   ├── Navigation.tsx
│   ├── PageTransition.tsx
│   ├── ParallaxImage.tsx
│   ├── ScrollProgress.tsx
│   └── TextReveal.tsx
├── context/
│   └── ThemeContext.tsx  # Dark/light mode
├── pages/
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Home.tsx
│   └── Music.tsx
├── utils/
│   └── animations.ts     # Framer Motion variants
├── App.tsx
├── index.css
└── main.tsx
public/
└── images/               # Static assets
```

## Code Quality

- **TypeScript strict mode** — `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`, `noUncheckedIndexedAccess`
- **oxlint** — fast Rust linter with React + TypeScript rules
- **react-grab** — dev-mode component inspector (hover + `Ctrl+C` to grab component context)

## Deployment

Deployed on [Vercel](https://vercel.com). Every push to `main` triggers a production deploy.

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```
