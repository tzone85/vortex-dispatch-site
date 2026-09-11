import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";

export function CookiePolicy() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <Nav />
      <main className="min-h-screen bg-void text-bone">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-accent">Cookie Policy</h1>
          <div className="space-y-6 text-bone-muted leading-7">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">1. Browser storage we use</h2>
              <p>
                Vortex Dispatch uses limited browser storage for website preferences and measurement. Your analytics preference is stored locally in your browser so that we can remember whether you allowed Google Analytics on later visits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">2. Google Analytics</h2>
              <p>
                We use Google Analytics to understand how visitors find and use the website, including page and campaign performance. Analytics storage is denied by default until you choose to allow analytics.
              </p>
              <p className="mt-4">
                We use Google Consent Mode. When analytics storage is denied, Google Analytics does not read or write its first-party analytics cookies. Google may still receive limited cookieless measurement signals as part of Consent Mode. If you allow analytics, analytics storage is enabled for measurement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">3. Advertising settings</h2>
              <p>
                Our current website configuration keeps Google advertising storage, advertising user data and advertising personalisation denied. We do not currently use the consent banner to enable personalised advertising.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">4. Your preference</h2>
              <p>
                You can choose “Allow analytics” or “Essential only” when the consent notice appears. You can change that decision later by selecting “Cookie settings” in the website footer.
              </p>
              <p className="mt-4">
                You can also remove cookies and local storage through your browser settings. Clearing site data may cause the consent notice to appear again because the website will no longer have your saved preference.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">5. Third-party services</h2>
              <p>
                Google Analytics is the analytics service currently configured on this website. Our hosting and infrastructure providers may also process ordinary technical request data needed to deliver and secure the site; that processing is separate from optional Analytics storage in your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">6. Changes to this policy</h2>
              <p>
                We may update this policy when our measurement tools or privacy practices change. Material changes will be reflected on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-accent">7. Contact us</h2>
              <p>
                Questions about this policy can be sent to <a className="text-accent-bright underline" href="mailto:hello@vortexdispatch.co.za">hello@vortexdispatch.co.za</a>.
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
