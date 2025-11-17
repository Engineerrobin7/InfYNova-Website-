"use client";

import { Navbar } from "../components/navbar";
import { Footer } from "../components/Footer";
import { AffiliateProgram } from "../components/affiliate-program";

export default function AffiliatePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <AffiliateProgram />
      </main>
      <Footer />
    </>
  );
}
