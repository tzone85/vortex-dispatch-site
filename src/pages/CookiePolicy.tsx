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
          <h1 className="text-4xl font-bold mb-8 text-copper">Cookie Policy</h1>
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-copper">1. What are Cookies?</h2>
              <p>
                Cookies are small pieces of text stored on your browser or device. They are widely used to remember login information, preferences, and other information that helps provide a better online experience. We use cookies to understand how you interact with our website and to improve your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-copper">2. Types of Cookies We Use</h2>
              <p>Our website uses the following types of cookies:</p>

              <h3 className="text-xl font-semibold mt-4 mb-2 text-copper">Essential Cookies</h3>
              <p>
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as our site cannot function without them.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2 text-copper">Analytics Cookies</h3>
              <p>
                We use analytics cookies to understand how visitors interact with our website. This helps us to improve the website's performance and user experience. Information collected is anonymous and aggregated.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2 text-copper">Preference Cookies</h3>
              <p>
                These cookies remember your preferences and choices to personalize your experience when you visit our website again.
              </p>

              <h3 className="text-xl font-semibold mt-4 mb-2 text-copper">Marketing Cookies</h3>
              <p>
                We may use marketing cookies to track your browsing habits to display targeted advertising that may be of interest to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-copper">3. How to Control Cookies</h2>
              <p>
                You can control and manage cookies in your browser settings. Most browsers allow you to refuse cookies and alert you when a cookie is being sent. However, refusing cookies may affect your ability to use certain features of our website.
              </p>

              <p className="mt-4">
                Most web browsers allow you to control cookies through their settings preferences. To find out more about cookies, visit:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><a href="https://www.allaboutcookies.org" className="text-blue-400 hover:underline">www.allaboutcookies.org</a></li>
                <li><a href="https://www.youronlinechoices.eu" className="text-blue-400 hover:underline">www.youronlinechoices.eu</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-copper">4. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may allow third parties to place cookies on your device for analytics and marketing purposes. These third parties include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Google Analytics</li>
                <li>Vercel Analytics</li>
                <li>Other third-party service providers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-copper">5. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Know what cookies are being used</li>
                <li>Opt-out of non-essential cookies</li>
                <li>Request information about cookies stored on your device</li>
                <li>Have cookies deleted from your device</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-copper">6. Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-copper">7. Contact Us</h2>
              <p>
                If you have any questions about this Cookie Policy or our use of cookies, please contact us using the information provided on our website.
              </p>
            </section>

            <p className="text-sm text-copper/70 mt-8">
              Last updated: {new Date().toLocaleDateString('en-ZA')}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
