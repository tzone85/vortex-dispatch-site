import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SignalStrip } from "./components/SignalStrip";
import { Capabilities } from "./components/Capabilities";
import { Work } from "./components/Work";
import { Process } from "./components/Process";
import { Ethos } from "./components/Ethos";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { JsonLd } from "./components/JsonLd";

/**
 * Page composition only. Every section owns its own data (pulled from `@/core`),
 * so this file is a table of contents — the wiring, not the content.
 */
export default function App() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <JsonLd />

      <a
        href="#capabilities"
        className="sr-only rounded-full bg-copper px-4 py-2 text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <Nav />
      <main>
        <Hero />
        <SignalStrip />
        <Capabilities />
        <Work />
        <Process />
        <Ethos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
