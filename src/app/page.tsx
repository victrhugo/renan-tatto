import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import BookingProcess from "@/components/BookingProcess";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-full bg-black-deep selection:bg-gold-muted/30 selection:text-gold-muted overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <BookingProcess />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
