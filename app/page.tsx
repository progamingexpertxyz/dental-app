"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import Navbar from "./components/navbar";
import Hero from "./components/header";
import Services from "./components/service";
import Team from "./components/stuff";
import FAQ from "./components/faq";
import Testimonials from "./components/reveiw";
import Footer from "./components/footer";
import { motion } from "framer-motion";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Animated Sections */}
      {[
        { Component: Services, y: 0 },
        { Component: Team, y: 30 },
        { Component: FAQ, y: 0 },
        { Component: Testimonials, y: -30 },
      ].map(({ Component, y }, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="px-4 md:px-10 lg:px-16 xl:px-24 py-10"
        >
          <Component />
        </motion.section>
      ))}

      {/* Newsletter Section */}
      <section className=" text-white py-16 rounded-xl mx-4 md:mx-auto max-w-4xl">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">Subscribe to our Newsletter</h2>
          <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg bg-white text-black shadow-sm focus:ring-2 focus:ring-yellow-500 w-full md:w-auto"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="bg-yellow-500 text-black hover:bg-yellow-600 shadow-lg w-full md:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
