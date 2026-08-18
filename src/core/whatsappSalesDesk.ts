import { company } from "./company";
import type { SalesDeskOffer } from "./types";

export const whatsappSalesDesk: SalesDeskOffer = {
  name: "WhatsApp Sales Desk Sprint",
  promise:
    "Turn WhatsApp from a noisy inbox into a proper sales desk. We clean up the reply flow, tighten the first response, and give your team a way to follow up without dropping leads.",
  diagnosticPrice: 950,
  sprintPrice: 2950,
  durationDays: 3,
  diagnostic:
    "A 24-hour review of your WhatsApp Business profile, reply flow, labels, and handoff path, with a one-page fix list.",
  deliverables: [
    "Rewrite the greeting, away message, and first-response script",
    "Set up labels so new leads stop disappearing in the noise",
    "Create quick replies for pricing, availability, and common objections",
    "Build a simple follow-up flow for 1 hour, 1 day, and 3 days",
    "Tighten the handoff from website, Instagram, or forms into WhatsApp",
    "Add a lightweight lead tracker the team can actually use",
    "Hand over a one-page reply playbook the owner can keep using",
  ],
  exclusions: [
    "Full CRM migrations",
    "Ad management or funnel building",
    "Ongoing community management",
    "Custom app development",
    "Guaranteed lead volume",
  ],
  qualification:
    "Best for a service business that already gets WhatsApp enquiries but loses money because replies are slow, inconsistent, or buried.",
  guarantee:
    "If the diagnostic cannot point to at least three real fixes, the diagnostic fee is refunded.",
  cta: {
    label: "Ask for a fit check",
    mailto: `mailto:${company.email}?subject=${encodeURIComponent(
      "WhatsApp Sales Desk Sprint",
    )}&body=${encodeURIComponent(
      "Hi Thando,\n\nOur business is:\nOur main offer is:\nWhere our enquiries come from is:\nWhat feels broken in WhatsApp right now is:\n",
    )}`,
  },
} as const;
