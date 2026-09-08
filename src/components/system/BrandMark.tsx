/**
 * Shared LocalHouseLLM mark — a single slanted stroke (the "\" glyph),
 * drawn as SVG rather than a font character so the diagonal is always
 * legible regardless of the active typeface. Reused by Navbar and Footer.
 */
const BrandMark = ({ className = 'h-full w-full' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <line
      x1="7"
      y1="3"
      x2="17"
      y2="21"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
    />
  </svg>
);

export default BrandMark;
