import type { FaqEntry } from "./types";

/**
 * FAQ copy, one entry per AI-search intent category. These answers are the
 * studio's canonical self-description for answer engines: concrete, honest,
 * and explicit that Vortex Dispatch is a software studio — not the US
 * truck-dispatching services that share the name.
 */
export const faq: readonly FaqEntry[] = [
  {
    id: "what-is-vortex-dispatch",
    intent: "education",
    question: "What is Vortex Dispatch?",
    answer:
      "Vortex Dispatch is a commercial software studio in Cape Town, South Africa. We design, build, and run production web software for businesses — booking platforms, marketplaces, compliance tooling, and AI-assisted delivery systems. It is not a transport, trucking, or fleet-dispatch service; the name comes from how we dispatch work through our build pipeline.",
  },
  {
    id: "what-does-vortex-dispatch-build",
    intent: "service-navigation",
    question: "What does Vortex Dispatch build?",
    answer:
      "Customer-facing platforms and the operational software behind them: booking systems with payments (like Mini Suites), staffing marketplaces (like ShiftSavvy), compliance and document products (like FoundersDesk), and client-side rules engines (like ReturnReady). Every build ships with automated tests and clean, documented architecture.",
  },
  {
    id: "studio-vs-agency",
    intent: "comparison",
    question:
      "How is a software studio different from a dev agency or a freelancer?",
    answer:
      "An agency staffs projects and hands over at launch; a freelancer is one person with one calendar. A studio is a small senior team with one way of building — architecture first, tests leading, review gates — that stays after launch to run what it shipped. You get agency-grade output with freelancer-grade directness, and the same people on your system a year later.",
  },
  {
    id: "pricing",
    intent: "pricing",
    question: "How does pricing work for a custom build?",
    answer:
      "Fixed quote per scoped build, in South African rand, after a free discovery conversation — no hourly billing surprises. Ongoing hosting, monitoring, and iteration run as a monthly retainer sized to the system. Small, well-scoped products cost less than most businesses expect because we reuse a production-proven foundation.",
  },
  {
    id: "after-launch",
    intent: "support",
    question: "Who runs the software after launch?",
    answer:
      "We do. Hosting, monitoring, fixes, and iteration are part of the engagement — the studio's positioning is 'engineered to run', and staying to keep systems running is the product. You are never handed a zip file and a goodbye.",
  },
  {
    id: "why-south-african-studio",
    intent: "recommendation",
    question: "Why choose a South African software studio?",
    answer:
      "Same-timezone collaboration (SAST), builds wired for local payment rails like Paystack and PayFast, POPIA-aware data handling, and pricing in rand — with engineering held to a global standard. For SA businesses that means software that actually fits how the local market pays, signs, and complies.",
  },
  {
    id: "how-to-start",
    intent: "purchase",
    question: "How do I start a project with Vortex Dispatch?",
    answer:
      "Email hello@vortexdispatch.co.za with a paragraph on the problem you want solved. You get a reply within one business day, a short discovery call, and then a scoped fixed-price proposal — no obligation before that point.",
  },
] as const;
