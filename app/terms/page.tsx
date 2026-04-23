import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/Footer";
import { motion } from "framer-motion";

export const metadata = {
  title: "Terms of Service | InfyNova",
  description: "InfyNova Terms of Service - Read our terms before using our products and services"
};

export default function TermsOfService() {
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
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg mb-12">
              Last updated: December 2024
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using the InfyNova website and products, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily download one copy of the materials (information or software) on InfyNova's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or other proprietary notations</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">3. Disclaimer</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials on InfyNova's website are provided on an 'as is' basis. InfyNova makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">4. Limitations</h2>
                <p className="text-muted-foreground leading-relaxed">
                  In no event shall InfyNova or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on InfyNova's website, even if InfyNova or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">5. Accuracy of Materials</h2>
                <p className="text-muted-foreground leading-relaxed">
                  The materials appearing on InfyNova's website could include technical, typographical, or photographic errors. InfyNova does not warrant that any of the materials on our website are accurate, complete, or current. InfyNova may make changes to the materials contained on our website at any time without notice.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">6. Links</h2>
                <p className="text-muted-foreground leading-relaxed">
                  InfyNova has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by InfyNova of the site. Use of any such linked website is at the user's own risk.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">7. Modifications</h2>
                <p className="text-muted-foreground leading-relaxed">
                  InfyNova may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">8. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">9. Product Warranty</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  InfyNova products come with a 5-year comprehensive warranty covering:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Manufacturing defects</li>
                  <li>Hardware failures</li>
                  <li>Software issues covered under NovaOS support</li>
                  <li>Accidental damage (terms and conditions apply)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-muted-foreground mt-4">
                  <strong>Email:</strong> support@infynova.com<br />
                  <strong>Address:</strong> Bangalore, India
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
