import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/Footer";
import { motion } from "framer-motion";

export const metadata = {
  title: "Privacy Policy | InfyNova",
  description: "InfyNova Privacy Policy - Your data privacy and security is our priority"
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground text-lg mb-12">
              Last updated: December 2024
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  InfyNova ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and products, including InfyNova smartphones and NovaOS operating system.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you voluntarily provide to us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Account information (name, email, password)</li>
                  <li>Pre-order and purchase details</li>
                  <li>Communication preferences</li>
                  <li>Device and usage analytics (with your consent)</li>
                  <li>Support requests and feedback</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">3. NovaOS Privacy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  NovaOS is designed with privacy-first principles:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Most AI processing happens locally on your device</li>
                  <li>Data never leaves your device without explicit permission</li>
                  <li>End-to-end encryption for all communications</li>
                  <li>You have full control over data sharing and permissions</li>
                  <li>We do not sell your personal data to third parties</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">4. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use collected information to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Process orders and deliver products</li>
                  <li>Improve our products and services</li>
                  <li>Send communications about updates and promotions</li>
                  <li>Provide customer support</li>
                  <li>Comply with legal requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement industry-standard security measures including encryption, secure servers, and regular security audits. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Access your personal data</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of communications</li>
                  <li>Port your data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Email:</strong> privacy@infynova.com<br />
                  <strong>Address:</strong> Bangalore, India
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">8. Policy Updates</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of significant changes by email or by posting the updated policy on our website.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
