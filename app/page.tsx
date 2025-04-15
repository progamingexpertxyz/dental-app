"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Animated Sections */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <Services />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Team />
      </motion.section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <FAQ />
      </motion.section>

      <motion.section initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Testimonials />
      </motion.section>

      {/* Newsletter Section */}
      <section className=" text-black bg-white py-16  mx-4 md:mx-auto max-w-4xl ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Subscribe to our Newsletter</h2>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 rounded-lg text-black shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="bg-white text-blue-500 hover:bg-gray-100 shadow-lg ">Subscribe</Button>
          </div>
         
        </div>
      </section>
      <Footer />
    </div>
  );
}
