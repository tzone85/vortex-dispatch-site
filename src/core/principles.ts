import type { Principle } from "./types";

/** The studio's ethos — the part that shows genuine care, said plainly. */
export const principles: readonly Principle[] = [
  {
    id: "tested",
    statement: "Tested by default.",
    body: "Every domain rule has a test before it has a UI. Green is the baseline, not the celebration.",
  },
  {
    id: "owned",
    statement: "Owned, not rented.",
    body: "You get the code, the infrastructure, and the knowledge to run it. No black boxes, no hostage fees.",
  },
  {
    id: "clean",
    statement: "Clean where it counts.",
    body: "Clear boundaries and small, honest modules — so the next change is cheap and the next engineer is not lost.",
  },
  {
    id: "shipped",
    statement: "Shipped, then supported.",
    body: "A launch is the middle of the story. We stay for the running, the fixing, and the growing.",
  },
] as const;
