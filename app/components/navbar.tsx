"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full top-4 left-1/2 transform -translate-x-1/2 z-50">
      {/* Navbar Container */}
      <nav className="w-[90%] mx-auto bg-gradient-to-r from-blue-100 to-white shadow-lg rounded-full px-6 py-3 flex justify-between items-center max-w-5xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-[#0F172A]">DENTAL</span>
            <span className="text-[#00D1D1]">CARE</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/treatment">Treatments</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* Appointment Button */}
        <Link href="/appointment">
          <Button className="hidden md:block bg-blue-400 text-white hover:bg-green-600 transition rounded-full px-6">
            Book Now
          </Button>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-[#0F172A]" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-2xl shadow-lg">
          <button className="absolute top-6 right-6 text-[#0F172A]" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink href="/treatment" onClick={() => setIsOpen(false)}>Treatments</NavLink>
          <NavLink href="/services" onClick={() => setIsOpen(false)}>Services</NavLink>
          <NavLink href="/contact" onClick={() => setIsOpen(false)}>Contact</NavLink>
          <Link href="/appointment">
            <Button className="bg-blue-400 text-white hover:bg-green-600 transition rounded-full px-6">
              Book Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Reusable Link Component
function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} className="text-[#64748B] hover:text-[#0F172A] transition font-medium" onClick={onClick}>
      {children}
    </Link>
  );
}
