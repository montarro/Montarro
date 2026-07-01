# Montarro — Working Preferences

## Deployment workflow

### Default: commit + push, do NOT deploy to production

For every change, the default is to **commit and push to the working branch**
(which builds a Vercel **preview**). **Do NOT deploy/promote to production
(production domain / `main`) unless explicitly told to.**

Before committing + pushing, run the **fast checks**:

1. Run **TypeScript** (`npx tsc --noEmit`).
2. Run the **build** (`npx vite build`).
3. Run a **quick smoke test** (load the key routes, confirm 200s + no console/page errors).
4. If all three pass, **commit and push to the branch**.

Do **not** perform exhaustive route crawling, repeated mobile validation, or
deep lint investigations for routine changes. Prioritise speed while
maintaining a successful build.

### Production deploys (only on request)

Promoting to the production domain / merging to `main` happens **only when
explicitly requested**. Never merge to `main` without explicit permission.

### Production audits (only on request)

Run the full review (exhaustive route crawl, desktop + mobile validation, lint
investigation, asset optimisation) **only** when a production audit is
explicitly requested.

## Brand & design constraints

- Palette: black / white / emerald, on a mint canvas (`#E9F7EE`).
- Aesthetic: premium / minimal (Apple × Linear × Stripe × Vercel × Rockmelon).
- Keep the emerald palette consistent — no off-brand greens.

## Git

- Never merge to `main` without explicit permission.
