'use client'
import { useState, useEffect, SetStateAction } from "react";

// Define BeforeInstallPromptEvent type
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: string }>;
}
import { Button } from "@/app/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/Mobi|Android/i.test(window.navigator.userAgent));
    }
  }, []);

  // Listen for install prompt
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
      });
    } else {
      alert("Installation not supported on this browser or already installed.");
    }
  };

  return (
    <div className="fixed w-full top-4 left-1/2 transform -translate-x-1/2 z-50">
      <nav className="w-[90%] mx-auto bg-gradient-to-r from-blue-100 to-white shadow-lg rounded-full px-6 py-3 flex justify-between items-center max-w-5xl">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-[#0F172A]">DENTAL</span>
            <span className="text-[#00D1D1]">CARE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/treatment">Treatments</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        <div className="hidden md:flex items-center gap-4">
  <Link href="/appointment">
    <Button className="bg-[#00D1D1] text-white hover:bg-black transition rounded-full px-6 py-2 text-base min-w-[40px] text-center">
      Book Now
    </Button>
  </Link>
  <Button
    className="bg-black text-white hover:bg-[#00D1D1] transition rounded-full px-6 py-2 text-base min-w-[50px] text-center"
    onClick={handleInstallClick}
  >
    {isMobile ? "Install App" : "Web App"}
  </Button>
</div>


        <button className="md:hidden text-[#0F172A]" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </nav>

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
          <Button
            className="bg-green-400 text-white hover:bg-blue-600 transition rounded-full px-6"
            onClick={handleInstallClick}
          >
            {isMobile ? "Install App" : "Install Web"}
          </Button>
        </div>
      )}
    </div>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} className="text-[#64748B] hover:text-[#0F172A] transition font-medium" onClick={onClick}>
      {children}
    </Link>
  );
}
