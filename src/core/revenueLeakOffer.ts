import { company } from "./company";
import type { RevenueLeakOffer } from "./types";

export const revenueLeakOffer: RevenueLeakOffer = {
  name: "Revenue Leak Fix Sprint",
  promise:
    "Repair one enquiry path on your existing website so more of the traffic you already have can become calls, WhatsApps, and quote requests.",
  auditPrice: 2500,
  sprintPrice: 7500,
  durationDays: 5,
  audit:
    "A 48-hour review of one enquiry journey, with annotated findings, a prioritised fix plan, and a 30-minute walkthrough.",
  deliverables: [
    "Baseline one primary enquiry journey and check its tracking",
    "Rewrite the headline, value proposition, CTA, and trust block",
    "Repair the mobile call, WhatsApp, or form path",
    "Simplify one lead form and its confirmation state",
    "Add or repair conversion events for the agreed CTA channels",
    "Apply focused speed and usability fixes on the selected page",
    "Hand over a before-and-after scorecard",
  ],
  exclusions: [
    "Whole-site redesigns",
    "Advertising or ongoing SEO management",
    "CRM migrations",
    "Unlimited revisions",
    "Lead-volume guarantees",
  ],
  qualification:
    "Best for an established service business whose website already receives relevant traffic but produces too few useful enquiries.",
  guarantee:
    "If the paid audit cannot identify at least three material, fixable leaks, the audit fee is refunded.",
  cta: {
    label: "Request a fit check",
    mailto: `mailto:${company.email}?subject=${encodeURIComponent(
      "Revenue Leak Fix Sprint",
    )}&body=${encodeURIComponent(
      "Hi Thando,\n\nOur website is:\nOur main enquiry goal is:\nOur main traffic source is:\nWhat feels broken right now is:\n",
    )}`,
  },
} as const;
