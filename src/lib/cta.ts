/**
 * Shared primary CTA styling — deep, muted emerald with a subtle gradient,
 * soft inner highlight, elegant shadow depth, and refined hover/active states.
 * Premium / enterprise / fintech — not a bright startup-green button.
 *
 * Add a display + sizing utility per usage, e.g.
 *   className={`${primaryCta} inline-flex px-6 py-3 text-sm`}
 * The base sets `group`, so child arrow icons can use `group-hover:` motion.
 */
export const primaryCta =
  "group relative items-center justify-center gap-2 rounded-xl font-semibold text-white " +
  "bg-gradient-to-b from-emerald-600 to-emerald-700 " +
  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_10px_30px_-12px_rgba(5,150,105,0.55)] " +
  "transition-all duration-300 ease-out " +
  "hover:from-emerald-500 hover:to-emerald-600 hover:-translate-y-[1px] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_20px_46px_-14px_rgba(5,150,105,0.6)] " +
  "active:translate-y-0 active:from-emerald-700 active:to-emerald-800 active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.10),0_6px_16px_-10px_rgba(5,150,105,0.5)]";
