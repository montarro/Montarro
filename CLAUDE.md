# Montarro — Working Preferences

## Deployment workflow

### Routine deployments (default)

For routine deployments, use a **fast deployment workflow**:

1. Run **TypeScript** (`npx tsc --noEmit`).
2. Run the **build** (`npx vite build`).
3. Run a **quick smoke test** (load the key routes, confirm 200s + no console/page errors).
4. If all three pass, **deploy immediately**.

Do **not** perform exhaustive route crawling, repeated mobile validation, or
deep lint investigations for routine deploys. Prioritise speed while
maintaining a successful build.

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
