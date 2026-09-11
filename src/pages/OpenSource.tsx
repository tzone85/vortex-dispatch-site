import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

const PUBLIC_CORE = [
  "Agent orchestration and provider integrations",
  "Git worktree isolation and parallel execution",
  "Review, QA, diagnostics and recovery workflows",
  "Dashboards, CLI tooling and developer-facing observability",
  "A real Apache-2.0 project that developers can inspect and use",
];

const PRIVATE_FACTORY = [
  "Commercial production policies and customer-specific controls",
  "Proprietary prompts, routing intelligence and optimisation heuristics",
  "Cross-project learning, operational data and accumulated engineering intelligence",
  "Private deployment architecture, customer governance and production automation",
  "Internal software-factory systems used to deliver client software",
];

export function OpenSourcePage() {
  useEffect(() => {
    const title = "Open Source VXD & Private Software Factory | Vortex Dispatch";
    const description =
      "Vortex Dispatch keeps VXD open source while protecting the private software-factory systems, production intelligence and customer controls used for commercial software delivery.";

    document.title = title;

    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", description);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://vortexdispatch.co.za/open-source";

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.pageSchema = "open-source";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Vortex Dispatch Open Source Model",
      url: "https://vortexdispatch.co.za/open-source",
      description,
      about: {
        "@type": "SoftwareApplication",
        name: "VXD",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows via WSL2",
        codeRepository: "https://github.com/tzone85/vortex-dispatch",
        license: "https://www.apache.org/licenses/LICENSE-2.0",
        creator: {
          "@type": "Organization",
          name: "Vortex Dispatch",
          url: "https://vortexdispatch.co.za",
        },
      },
    });
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-36 sm:px-8 sm:pt-44">
          <p className="mono-meta mb-5 text-accent-bright">OPEN SOURCE + PRIVATE FACTORY</p>
          <h1 className="max-w-4xl font-display text-5xl font-bold tracking-tight text-bone sm:text-6xl lg:text-7xl">
            Open where it builds trust. Private where it builds advantage.
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-bone-muted sm:text-xl">
            Vortex Dispatch uses an open-core model for agent-orchestrated software engineering.
            VXD is our public, Apache-2.0 orchestration project. The commercial software factory,
            production intelligence and customer-specific operating systems remain private.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="https://github.com/tzone85/vortex-dispatch"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Explore VXD on GitHub
            </a>
            <a href="/#contact" className="btn-ghost">
              Discuss a software project
            </a>
          </div>
        </section>

        <section className="border-y border-line bg-void-2/50">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-line bg-void/55 p-7 sm:p-9">
              <p className="mono-meta text-accent-bright">PUBLIC CORE</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-bone">VXD</h2>
              <p className="mt-4 leading-7 text-bone-muted">
                VXD is a real standalone orchestrator, not a crippled demo. Developers can inspect,
                run and extend it. Its job is to make multi-agent software delivery understandable,
                useful and reproducible.
              </p>
              <ul className="mt-7 space-y-3">
                {PUBLIC_CORE.map((item) => (
                  <li key={item} className="flex gap-3 text-bone-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-line bg-void/55 p-7 sm:p-9">
              <p className="mono-meta text-accent-bright">PRIVATE LAYER</p>
              <h2 className="mt-4 font-display text-3xl font-bold text-bone">The production factory</h2>
              <p className="mt-4 leading-7 text-bone-muted">
                Commercial delivery requires more than a public orchestrator. The systems that encode
                Vortex Dispatch&apos;s production methods, customer controls and accumulated operational
                learning are deliberately private.
              </p>
              <ul className="mt-7 space-y-3">
                {PRIVATE_FACTORY.map((item) => (
                  <li key={item} className="flex gap-3 text-bone-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
          <p className="mono-meta text-accent-bright">WHY THIS MODEL</p>
          <h2 className="mt-4 font-display text-4xl font-bold text-bone">
            Transparency without publishing the factory floor.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-8 text-bone-muted">
            <p>
              Open source gives engineering teams something concrete to evaluate. They can inspect the
              architecture, run VXD themselves and see that our approach to agent orchestration is not a
              slide deck held together by optimism.
            </p>
            <p>
              The private layer protects the parts that compound through commercial use: production
              policies, learning across projects, customer governance, deployment controls and the
              operational intelligence that improves software delivery over time.
            </p>
            <p>
              That distinction is intentional. VXD can keep improving as an open developer tool without
              forcing Vortex Dispatch to publish every technique used inside its commercial software
              production systems.
            </p>
          </div>
        </section>

        <section className="border-t border-line bg-void-2/50">
          <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
            <p className="mono-meta text-accent-bright">THE SHORT VERSION</p>
            <h2 className="mt-4 font-display text-4xl font-bold text-bone">
              What is VXD, and what is Vortex Dispatch?
            </h2>
            <div className="mt-8 space-y-5 text-bone-muted">
              <p>
                <strong className="text-bone">VXD</strong> is an open-source AI coding-agent orchestration
                project maintained by Vortex Dispatch. It coordinates software work across planning,
                isolated execution, review, QA and delivery workflows.
              </p>
              <p>
                <strong className="text-bone">Vortex Dispatch</strong> is the commercial software engineering
                company. We use agent-orchestrated engineering systems, including public and private
                technology, to build and deliver production software for clients.
              </p>
              <p>
                Customers buy software outcomes and engineering capability. They do not need to adopt the
                same internal factory systems we use to produce those outcomes.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
