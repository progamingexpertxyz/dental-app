"use client";

import { motion } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <header className="bg-white text-black min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-12 md:py-20 ">
        <motion.div
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 lg:gap-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ✅ Text Section - Left Side on PC */}
          <motion.div
            className="text-center md:text-left flex-1 mt-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Let your <span className="text-cyan-600">smile</span> be the curve that straightens your life.
            </h1>
            <p className="text-gray-700 mb-6 text-base sm:text-lg">
              We offer high-quality dental services with experts in all types of treatments, specializing in the needs of each patient.
            </p>

            <Link href="/appointment">
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white text-lg py-3 px-6 rounded-full w-full sm:w-auto">
              Online Appointment 
              </Button>
            </Link>

            {/* ✅ Contact Info */}
            <div className="mt-8 flex flex-col sm:flex-row items-center md:items-start gap-4 sm:gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <Phone className="text-cyan-600 w-5 h-5" />
                <span className="text-sm sm:text-base">555 555 555</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="text-cyan-600 w-5 h-5" />
                <span className="text-sm sm:text-base">123 Main Street, City</span>
              </div>
            </div>
          </motion.div>

          {/* ✅ Image Section - Right Side on PC */}
          <motion.div
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg flex justify-center md:justify-end"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src="/doc.png"
              alt="Dentist"
              className="w-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
