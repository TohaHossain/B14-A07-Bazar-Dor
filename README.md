# বাজার দর (BazarDor)

![BazarDor logo](./logo-icon.png)

**BazarDor** is a responsive market-price tracker for everyday essentials in Bangladesh. It helps shoppers quickly explore current product prices, see which prices rose or fell today, browse by category, and view market-by-market price details after signing in.

## Live links

- Live site: _Add deployed URL here_
- Source code: _Add GitHub repository URL here_

## Highlights

- Browse all grocery products in a responsive card grid, from mobile through desktop.
- See separate “price increased” and “price decreased” sections for the day’s biggest changes.
- Explore category pages with loading states, empty states, and price sorting (low-to-high and high-to-low).
- Open protected product-detail pages for minimum, maximum, average, and market-specific prices.
- Use email/password and social authentication, with useful success, error, and protected-route notifications.
- Navigate with an active-category navbar, live-style price ticker, hero call to action, and helpful 404 pages.
- Update the signed-in user’s profile information from the profile area.

## Tech stack

- **Next.js** with the App Router
- **React** and **JavaScript/TypeScript**
- Custom responsive CSS (with CSS Modules for the account area)
- Browser-local email/password demo authentication and Google-style demo sign-in
- In-app success, error, and protected-route notifications
- BazarDor product API for product and category data

## Data API

The app reads market data from the Programming Hero BazarDor API:

```text
https://openapi.programming-hero.com/api/bazardor
```

Useful endpoints:

```text
/products
/products?category=chal
/products/:id
/categories
/categories/:slug
```

Alternative API base URLs are also available in the assignment brief if the primary service is unavailable.

## Run locally

### Prerequisites

- Node.js 18.18+ (Node.js 20+ recommended)
- npm, pnpm, or your preferred Node package manager

### Installation

```bash
git clone <your-repository-url>
cd B14-A7-Bazar-Dor
npm install
```

Start the development server:

```bash
npm run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

### Production check

```bash
npm run build
npm run start
```

## Responsive design

The interface is designed for phone, tablet, and desktop layouts. Product grids collapse on smaller screens, the hero section stacks naturally, and navigation and ticker content remain usable at narrow widths.

## Deployment

Deploy to Vercel, Netlify, Cloudflare Pages, or another Next.js-compatible host, then verify direct refreshes on category and product routes after deployment.

> The included authentication is intentionally self-contained for assignment previewing. To use production Better Auth with real Google/GitHub OAuth, add a Better Auth server route, database adapter, and provider credentials before deployment.
