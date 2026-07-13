/** Pure domain types for the Vortex Dispatch marketing site. */

export type NavItem = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
};

export type Service = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly outcomes: readonly string[];
};

export type PortfolioItem = {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly summary: string;
  readonly stack: readonly string[];
  readonly href?: string;
  readonly highlight: string;
};

export type ProcessStep = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
};

export type CompanyProfile = {
  readonly legalName: string;
  readonly brandName: string;
  readonly tagline: string;
  readonly heroHeadline: string;
  readonly heroSubhead: string;
  readonly positioning: string;
  readonly email: string;
  readonly location: string;
  readonly siteUrl: string;
};

export type SeoInput = {
  readonly title: string;
  readonly description: string;
  readonly path?: string;
  readonly siteUrl: string;
  readonly siteName: string;
};

export type BuiltSeo = {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly openGraph: {
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly siteName: string;
    readonly type: "website";
    readonly locale: string;
  };
  readonly twitter: {
    readonly card: "summary_large_image";
    readonly title: string;
    readonly description: string;
  };
};
