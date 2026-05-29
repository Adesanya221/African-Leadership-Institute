# Tutu Fellows 20th Year Reunion – Victoria Falls 2026

A landing page for the African Leadership Institute's Tutu Fellows 20th Year Reunion & Strategy Retreat, built with **Next.js 14** (App Router) and TypeScript.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Global CSS (custom, no external CSS framework)
- **Deployment**: Vercel / Netlify ready

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
tutu-reunion-nextjs/
├── app/
│   ├── globals.css       # Global styles (all original CSS preserved)
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page assembling all sections
├── components/
│   ├── Navbar.tsx        # Sticky navigation bar
│   ├── Hero.tsx          # Hero section with CTA
│   ├── Gallery.tsx       # Destination gallery (Victoria Falls)
│   ├── Programme.tsx     # Programme / What to Expect
│   ├── Costs.tsx         # Costs & Payment tranches
│   ├── Accommodation.tsx # Accommodation options (4 properties)
│   ├── Register.tsx      # Registration form
│   ├── FAQ.tsx           # Frequently Asked Questions
│   └── Footer.tsx        # Footer with branding
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push this project to a Git repository (GitHub, GitLab, Bitbucket).
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel will auto-detect Next.js and configure the build settings.
4. Click **Deploy**.

### Deploy to Netlify

1. Push this project to a Git repository.
2. Go to [netlify.com](https://netlify.com) and connect your repo.
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Or use the `@netlify/plugin-nextjs` plugin for full Next.js support.

### Static Export (Optional)

If you only need a static site with no server-side features:

1. Add `output: 'export'` to `next.config.js`
2. Run `npm run build`
3. Deploy the `out/` folder to any static host (Netlify, GitHub Pages, S3, etc.)

## Notes

- All images are served from Unsplash via external URLs. The `next.config.js` allows the `images.unsplash.com` domain for Next.js Image optimization if you switch to `<Image>` components in the future.
- The design is a pixel-perfect port of the original HTML landing page.
- Responsive breakpoints have been added for tablet and mobile viewports.
