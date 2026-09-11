import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export function PrivacyPolicy() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav />
      <main className="min-h-screen bg-void text-bone">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-accent">Privacy Policy</h1>
          <div className="space-y-6 text-bone-muted leading-7">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">1. About this policy</h2>
              <p>
                This policy explains how Vortex Dispatch handles personal information submitted through <strong>vortexdispatch.co.za</strong> and information generated when people use the website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">2. Information you provide</h2>
              <p>
                If you request an Engineering Pilot or contact us, we may collect the information you choose to provide, such as your name, work email address, company, role, technology or repository context, pilot objectives and additional message content.
              </p>
              <p className="mt-4">
                The Engineering Pilot form is not intended for source code, passwords, API keys, customer records or other confidential production data. Please do not submit secrets through the website form.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">3. Website and attribution data</h2>
              <p>
                We may process ordinary technical request data needed to deliver and secure the website. When available, we also preserve campaign attribution associated with a pilot enquiry, such as UTM parameters, the referring page and the landing page, so that we can understand how the enquiry reached us.
              </p>
              <p className="mt-4">
                Google Analytics is configured with Consent Mode. Analytics storage is denied by default until you allow analytics. When analytics storage is denied, Google Analytics may still receive limited cookieless measurement signals under Consent Mode. See our <a className="text-accent-bright underline" href="/cookies">Cookie Policy</a> for more detail.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">4. How we use information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to enquiries and evaluate whether a proposed Engineering Pilot is suitable.</li>
                <li>To communicate about requested software engineering services.</li>
                <li>To understand which pages, campaigns and acquisition channels are useful.</li>
                <li>To operate, protect and improve the website and its services.</li>
                <li>To meet legal, security and fraud-prevention obligations where applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">5. Service providers</h2>
              <p>
                We use service providers to operate the website and process requests. These may include Vercel for hosting, Google Analytics for website measurement where permitted by your consent choice, and Resend for delivery of Engineering Pilot enquiry emails. Those providers process information under their own terms and privacy arrangements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">6. Retention and security</h2>
              <p>
                We keep personal information only for as long as reasonably necessary for the purpose for which it was collected, including responding to an enquiry, managing a business relationship and meeting applicable legal or security requirements. We use reasonable technical and organisational safeguards, but no Internet transmission or storage system can be guaranteed to be completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">7. International processing</h2>
              <p>
                Some infrastructure and service providers may process information outside South Africa. Where applicable, we take reasonable steps to use providers and arrangements that support appropriate protection of personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">8. Your rights</h2>
              <p>
                Depending on the law that applies to you, you may have rights to request access to personal information we hold about you, ask for correction or deletion, object to certain processing, or withdraw consent where processing relies on consent. South African data subjects may have rights under the Protection of Personal Information Act (POPIA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">9. Contact</h2>
              <p>
                Privacy questions or requests can be sent to <a className="text-accent-bright underline" href="mailto:hello@vortexdispatch.co.za">hello@vortexdispatch.co.za</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">10. Changes to this policy</h2>
              <p>
                We may update this policy when our services, providers or legal obligations change. The current revision date appears below.
              </p>
            </section>

            <p className="text-sm text-accent/70 mt-8">Last updated: 11 September 2026</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
