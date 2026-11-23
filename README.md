# MIYORA — Next.js Digital Workspace

Premium, responsive Next.js 15 + JavaScript website with a no-database architecture.

## Included
- Large premium landing page with dark/light themes
- Responsive navigation, hero, toolkit, feature story, community and footer
- 12 tool cards with search, category filters and local favourites
- Tool modal with QR generation, JSON formatter, Base64 encode/decode, random password generator, API tester, IP lookup, image prompt builder and AI integration placeholders
- Local reviews, ratings, helpful toggles, comments, and editable local profile
- LocalStorage persistence for reviews, comments, favourites, profile and theme
- Vercel-ready Next.js project

## Requirements
- Node.js 20.9 or later
- npm

## Install and run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Production build
```bash
npm run build
npm start
```

## Deploy to Vercel
1. Push the project folder to GitHub.
2. Import the repository at https://vercel.com/new.
3. Framework preset: Next.js (auto-detected).
4. Build command: `npm run build`.
5. Deploy.

No database or environment variables are required for this version.

## LocalStorage behaviour
Reviews, comments, favourites, theme and profile are stored in the visitor's browser. They are not shared between users or devices, and can be cleared by clearing site data in the browser. The three initial featured reviews are sample content.

## Honest feature notes
- AI Chat, Text Studio and Code Assistant currently show a clear integration notice. A real AI provider requires a server-side API route and a secret key configured in Vercel environment variables; never put API secrets in client code.
- Image Studio creates a ready-to-use image prompt; it does not generate an image in this no-provider build.
- QR generation and IP lookup call third-party public services.
- API Playground sends requests from the browser. Cross-origin CORS restrictions may prevent requests to some APIs.
- Newsletter UI is a visual frontend interaction only; no email is sent or collected.
- This build intentionally does not include server authentication, multi-device user accounts, shared comments, server analytics, or admin moderation because it has no database/backend persistence.
