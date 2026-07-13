import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
