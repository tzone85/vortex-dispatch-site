import { Routes, Route } from "react-router-dom";
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
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { CookiePolicy } from "./pages/CookiePolicy";

function HomePage() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cookies" element={<CookiePolicy />} />
    </Routes>
  );
}
