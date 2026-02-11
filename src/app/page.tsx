import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Features } from "@/components/landing/Features";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-primary/20">
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <DashboardPreview />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
