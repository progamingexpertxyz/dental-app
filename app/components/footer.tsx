"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-gradient-to-r from-blue-100 to-cyan-500 text-black py-10"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 text-center md:text-left">
          
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-2">DentalCare</h3>
            <p className="text-gray-800 text-sm">
              Providing high-quality dental services with a team of specialists.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="#">About Us</FooterLink></li>
              <li><FooterLink href="#">Our Team</FooterLink></li>
              <li><FooterLink href="#">Contact Us</FooterLink></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="#">FAQ</FooterLink></li>
              <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              <li><FooterLink href="#">Terms of Service</FooterLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-800">
              <li>info@dentalcare.com</li>
              <li>+1 555 555 555</li>
              <li>123 Main Street, City</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-sm mt-8 text-gray-800">
          © {new Date().getFullYear()} DentalCare. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}

// Reusable Footer Link Component
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-black hover:text-gray-600 transition-colors">
      {children}
    </Link>
  );
}
