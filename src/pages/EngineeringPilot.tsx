import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { trackEngineeringPilotLead } from "../core/analytics";

const PILOT_STEPS = [
  {
    label: "YOU PROVIDE",
    title: "One real repository",
    copy: "Bring one codebase, 3–5 genuine backlog tickets, and the CI/test setup your team already trusts. We want representative work, not a toy benchmark.",
  },
  {
    label: "WE RUN",
    title: "A governed delivery trial",
    copy: "We configure an agent-orchestrated workflow around your repository, route work through isolated implementation, review and QA, and keep human engineering control where it matters.",
  },
  {
    label: "YOU RECEIVE",
    title: "Evidence, not a sales demo",
    copy: "You get the resulting code plus a delivery report covering interventions, failures, review findings, QA outcomes, rework and the practical limits we observed.",
  },
] as const;

const METRICS = [
  "Elapsed delivery time per ticket",
  "Human interventions required",
  "Agent failures and failure causes",
  "QA and test pass rate",
  "Code-review findings",
  "Model or subscription cost where measurable",
  "Merge success",
  "Rework required before acceptance",
] as const;

const GOOD_FIT = [
  "Engineering teams already experimenting with Claude Code, Codex, Gemini CLI or similar coding agents",
  "CTOs and engineering leaders who need evidence before expanding AI-assisted delivery",
  "Software agencies looking to increase delivery capacity without lowering review and QA standards",
  "Teams with a real backlog, an existing repository and enough automated checks to judge the result honestly",
] as const;

export function EngineeringPilotPage() {
  useEffect(() => {
    const title = "AI Engineering Pilot | Vortex Dispatch";
    const description =
      "Test agent-orchestrated software delivery on one real repository and 3–5 backlog tickets. Vortex Dispatch measures delivery time, interventions, failures, QA, review findings and rework.";
    const canonicalUrl = "https://vortexdispatch.co.za/engineering-pilot";

    document.title = title;

    const setMeta = (selector: string, attribute: string, value: string) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute(attribute, value);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.pageSchema = "engineering-pilot";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "AI Engineering Delivery Pilot",
      url: canonicalUrl,
      description,
      provider: {
        "@type": "Organization",
        "@id": "https://vortexdispatch.co.za/#organization",
        name: "Vortex Dispatch",
        url: "https://vortexdispatch.co.za",
      },
      areaServed: {
        "@type": "Country",
        name: "South Africa",
      },
      serviceType: "Agent-orchestrated software engineering evaluation",
    });
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  const mailto = `mailto:hello@vortexdispatch.co.za?subject=${encodeURIComponent(
    "Engineering Pilot: Vortex Dispatch",
  )}&body=${encodeURIComponent(
    "We would like to evaluate agent-orchestrated delivery on a real repository. Please send us the pilot intake details.",
  )}`;

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-36 sm:px-8 sm:pt-44">
          <p className="mono-meta mb-5 text-accent-bright">AI ENGINEERING PILOT</p>
          <h1 className="max-w-5xl font-display text-5xl font-bold tracking-tight text-bone sm:text-6xl lg:text-7xl">
            Give us 3–5 real tickets. We&apos;ll show you what agent-orchestrated engineering can actually deliver.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-bone-muted sm:text-xl">
            A focused evaluation on one real repository. We use your backlog, your codebase and your existing engineering checks, then measure what happened instead of asking you to believe another AI productivity slide deck.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={mailto}
              className="btn-primary"
              onClick={() => trackEngineeringPilotLead("hero")}
            >
              Book the engineering pilot
            </a>
            <a href="/#work" className="btn-ghost">
              See what we build
            </a>
          </div>
        </section>

        <section className="border-y border-line bg-void-2/50">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
            <p className="mono-meta text-accent-bright">HOW THE PILOT WORKS</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-bold text-bone sm:text-5xl">
              Small enough to evaluate. Real enough to matter.
            </h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {PILOT_STEPS.map((step) => (
                <article key={step.label} className="rounded-2xl border border-line bg-void/55 p-7">
                  <p className="mono-meta text-accent-bright">{step.label}</p>
                  <h3 className="mt-4 font-display text-2xl font-bold text-bone">{step.title}</h3>
                  <p className="mt-4 leading-7 text-bone-muted">{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mono-meta text-accent-bright">WHAT WE MEASURE</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-bone">
              A result your engineering team can interrogate.
            </h2>
            <p className="mt-6 text-lg leading-8 text-bone-muted">
              The point is not to prove that AI can write code. Everyone has seen that party trick. The point is to determine whether a governed multi-agent workflow can move real work through your engineering system without creating a larger review and rework bill downstream.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {METRICS.map((metric) => (
              <li key={metric} className="rounded-xl border border-line bg-panel/25 px-5 py-4 text-bone-muted">
                <span className="mr-3 text-accent-bright">✓</span>
                {metric}
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-line bg-void-2/50">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2">
            <div>
              <p className="mono-meta text-accent-bright">ENGINEERING GUARDRAILS</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-bone">
                Faster is irrelevant if the code becomes somebody else&apos;s problem.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-bone-muted">
              <p>
                Pilot work is isolated, reviewed and tested against the controls available in your repository. We do not treat agent output as trusted merely because a model produced it confidently.
              </p>
              <p>
                Human approval, repository permissions, review expectations and deployment boundaries are agreed before work begins. The pilot is designed to expose where automation is useful and where your team should retain direct control.
              </p>
              <p>
                You are evaluating a delivery method, not signing up for irreversible platform lock-in.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <p className="mono-meta text-accent-bright">WHO THIS IS FOR</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-bone">A good fit if the question is “does this work here?”</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {GOOD_FIT.map((item) => (
              <div key={item} className="rounded-xl border border-line bg-void/45 p-5 leading-7 text-bone-muted">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-line bg-void-2/50">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
            <p className="mono-meta text-accent-bright">START WITH EVIDENCE</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-bone sm:text-5xl">
              Bring the repository. Bring the tickets. We&apos;ll measure the rest.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-bone-muted">
              We&apos;ll start with a short technical intake to confirm the repository, tickets, acceptance criteria and engineering controls are suitable for a meaningful pilot.
            </p>
            <a
              href={mailto}
              className="btn-primary mt-9 inline-flex"
              onClick={() => trackEngineeringPilotLead("closing_cta")}
            >
              Book the engineering pilot
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
