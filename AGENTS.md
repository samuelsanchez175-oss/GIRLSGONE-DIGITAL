# AGENTS.md

## Cursor Cloud specific instructions

This is a static HTML/CSS/vanilla-JS website (no framework, no build step). There are no automated tests, no linter, and no TypeScript.

### Dev server

```
npm run dev
```

Runs `serve` on port 3000. The homepage is at `http://localhost:3000/` which redirects to `girls gone digital.html`. Filenames contain spaces so use URL-encoded paths (e.g. `girls%20gone%20digital.html`) when using `curl`.

### Project structure

- `index.html` — redirects to `girls gone digital.html`
- `girls gone digital.html` — homepage with hero video
- `pages/` — shop, cart, product detail, about, events, magazine pages
- `assets/` — images, CSS, JS (cart logic in `assets/cart.js`)
- `vercel.json` — Vercel rewrite rules

### Deployment

Per workspace rules, push to remote and run `npx vercel --prod --yes` after changes. See `DEPLOY.md` for full details.

### Notes

- Cart is client-side only (`localStorage`), no backend or payment integration.
- No automated test suite exists; manual browser testing is the only verification method.
