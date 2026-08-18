import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppSalesDesk } from "@/components/WhatsAppSalesDesk";

export function WhatsAppSalesDeskPage() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <a
        href="#whatsapp-sales-desk"
        className="sr-only rounded-full bg-accent px-4 py-2 text-void focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to content
      </a>

      <Nav />
      <main>
        <WhatsAppSalesDesk />
      </main>
      <Footer />
    </>
  );
}
