# Nojus Portfolio

Personal portfolio for Nojus Pečiukonis — musician, producer, and creative.

## Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI framework |
| [TypeScript 5](https://www.typescriptlang.org) | Type-safe JavaScript (strict mode) |
| [Vite 5](https://vitejs.dev) | Build tool & dev server |
| [React Router 6](https://reactrouter.com) | Client-side routing (lazy-loaded) |
| [Framer Motion 11](https://www.framer.com/motion) | Animations & transitions |
| [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) | 3D rendering (Three.js) |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scroll |
| [react-helmet-async](https://github.com/staylor/react-helmet-async) | Per-page SEO meta tags |
| [vite-plugin-image-optimizer](https://github.com/FatehAK/vite-plugin-image-optimizer) | Build-time image compression |
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
│   ├── CreativeButton.tsx   # Magnetic hover button
│   ├── CustomCursor.tsx     # Custom cursor (hidden on touch/reduced-motion)
│   ├── FloatingShapes.tsx   # 3D shapes (React Three Fiber)
│   ├── Footer.tsx
│   ├── MarqueeText.tsx
│   ├── Navigation.tsx       # Fixed nav with expanding menu
│   ├── PageTransition.tsx
│   ├── ParallaxImage.tsx
│   ├── ScrollProgress.tsx
│   ├── SEO.tsx              # Per-page meta tags (react-helmet-async)
│   └── TextReveal.tsx
├── context/
│   └── ThemeContext.tsx      # Dark/light mode
├── hooks/
│   └── useScrollProgress.ts
├── pages/
│   ├── About.tsx
│   ├── Contact.tsx           # Web3Forms integration
│   ├── Home.tsx
│   ├── Music.tsx
│   └── NotFound.tsx          # 404 page
├── utils/
│   └── animations.ts        # Framer Motion variants
├── App.tsx                   # Router + lazy loading
├── index.css                 # Design tokens + responsive breakpoints
└── main.tsx                  # Entry + HelmetProvider
public/
├── fonts/                    # woff2 custom fonts (preloaded)
├── images/                   # WebP images (optimized at build)
├── robots.txt
└── sitemap.xml
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
VITE_WEB3FORMS_KEY=your_access_key_here   # Get from https://web3forms.com
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
