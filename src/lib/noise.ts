// A fine film grain as a repeating SVG tile: speckles of one colour (r g b, each 0–1) on transparent, so it darkens
// a pastel a little without greying it.
const grain = (r: number, g: number, b: number) =>
  `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 1.6 -0.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// Deep violet speckles, for the lilac field and the glass on it.
export const NOISE = grain(0.2, 0.1, 0.34);

// Warm brown speckles, for the apricot surfaces.
export const NOISE_WARM = grain(0.42, 0.25, 0.05);

// White speckles, for the deep green surfaces (dark ones vanish on them).
export const NOISE_LIGHT = grain(1, 1, 1);
