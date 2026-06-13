## Goal
Replace the current mobile horizontal-scroll row of hero dashboard cards (Live AI Call, Ad Spend, Bookings, Leads) with a single 3D rotating card that auto-cycles through all 4, similar to a rotating billboard. Desktop floating layout stays untouched.

## Changes (in `src/routes/index.tsx`, mobile branch only)

1. Inside the `lg:hidden` Reveal block, replace the snap-scroll row with a fixed-size 3D stage:
   - Wrapper with `perspective: 1200px`, ~280px tall, centered.
   - Inner container with `transform-style: preserve-3d` rotating on Y axis.
   - 4 card faces positioned at 0°, 90°, 180°, 270° on a cube-like arrangement (each translated outward by ~half the card width).
2. Auto-rotate using Motion: `animate` Y rotation 0 → -360° in a continuous loop (~16s, ease linear), pausing on tap/hold.
3. Each face reuses the existing `cardA`–`cardD` JSX so content/styling stays identical (same border, bg, glow).
4. Add a small row of 4 dots below as a progress indicator, highlighting the currently front-facing card based on the rotation value.

## Notes
- Desktop floating cards untouched.
- No new dependencies — Motion is already used.
- Cards remain readable: rotation pauses briefly at each 90° step using keyframe `times` array so each card holds front for ~2.5s before flipping to the next.
