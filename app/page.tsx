"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import Navbar from "./components/navbar";
import Hero from "./components/header";
import Services from "./components/service";
import Team from "./components/stuff";
import FAQ from "./components/faq";
import Testimonials from "./components/reveiw";
import { motion } from "framer-motion";
import Footer from "./components/footer";

export default function Home() {
  const [email, setEmail] = useState("");
  const [showInstall, setShowInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  // Handle PWA Install Prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Animated Sections with Viewport Optimization */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Services />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Team />
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <FAQ />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <Testimonials />
      </motion.section>

      {/* Newsletter Section */}
      <section className="text-black bg-white py-16 px-4 md:px-0 max-w-4xl mx-auto rounded-xl">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Subscribe to our Newsletter</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-2 rounded-lg text-black shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full sm:w-auto bg-white text-blue-500 hover:bg-gray-100 shadow-lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Install App Button */}
      {showInstall && (
        <div className="text-center my-6 px-4">
          <Button onClick={handleInstallClick} className="bg-green-500 text-white w-full sm:w-auto">
            Install App
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
}
