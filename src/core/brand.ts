/**
 * Public brand asset paths. Files live under `public/brand/` and are served
 * from `/brand/*`. Components and SEO builders import from here so paths stay
 * single-sourced.
 */
export const brandAssets = {
  /** Primary logo mark (transparent rounded square). */
  logo: "/brand/logo.png",
  logoJpg: "/brand/logo.jpg",
  logo32: "/brand/logo-32.png",
  logo64: "/brand/logo-64.png",
  logo128: "/brand/logo-128.png",
  logo256: "/brand/logo-256.png",
  logo512: "/brand/logo-512.png",
  logoHorizontal: "/brand/logo-horizontal.png",
  logoStacked: "/brand/logo-stacked.png",

  faviconSvg: "/brand/favicon.svg",
  favicon16: "/brand/favicon-16.png",
  favicon32: "/brand/favicon-32.png",
  favicon48: "/brand/favicon-48.png",

  appleTouchIcon: "/brand/apple-touch-icon.png",
  icon192: "/brand/icon-192.png",
  icon512: "/brand/icon-512.png",
} as const;

/** Absolute URL for a brand asset path (for Open Graph / JSON-LD). */
export function brandUrl(siteUrl: string, assetPath: string): string {
  return `${siteUrl.replace(/\/$/, "")}${assetPath}`;
}
