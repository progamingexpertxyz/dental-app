"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="container mx-auto px-4 py-12 md:py-20">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Image First on Mobile, Right on PC */}
        <motion.div
          className="relative flex justify-center md:justify-end order-1 md:order-2"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          

          {/* Image */}
          <img 
            src="/doc.png" 
            alt="Dentist"
            className="w-[100%] max-w-md md:w-full md:max-w-lg rounded-xl "
          />
        </motion.div>

        {/* Text Section - Always Left */}
        <motion.div
          className="order-2 md:order-1 text-center md:text-left "
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Let your <span className="text-cyan-400">smile</span> be the curve that straightens your life.
          </h1>
          <p className="text-muted-foreground mb-6">
            We offer high-quality dental services with experts in all types of treatments, specializing in the needs of each patient.
          </p>
          <Link href="/appointment">
           <Button className="bg-cyan-400 hover:bg-cyan-500 text-lg py-3 px-6">
             Book Your Appointment Online
  </Button>
</Link>

          {/* Contact Info */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-6">
            <div className="flex items-center gap-2">
              <Phone className="text-cyan-400" />
              <span>555 555 555</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-cyan-400" />
              <span>123 Main Street, City</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
