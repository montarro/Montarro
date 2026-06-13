/**
 * Montarro "M" mark — pure inline SVG so it can never fail to load.
 * Color is inherited via `currentColor`; size via the className (height).
 */
export function MLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={5.5}
      strokeLinejoin="miter"
      strokeLinecap="square"
      role="img"
      aria-label="Montarro"
    >
      <path d="M4 37 L13 5 L26 26 L39 5 L48 37" />
    </svg>
  );
}
