"use client";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ContactUs() {
  const router = useRouter();

  return (

    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <Navbar />
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full h-80">
          <img 
            src="/contact.jpg" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>
          <p className="text-center text-gray-600 mb-6">
            Have any questions or need assistance? Get in touch with us!
          </p>
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Location</h2>
              <p className="text-gray-600 mb-4">123 Dental Street, Smile City, TX 75000</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Call Us</h2>
              <p className="text-gray-600 mb-4">+1 (123) 456-7890</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">Email Us</h2>
              <p className="text-gray-600 mb-4">contact@dentalclinic.com</p>
            </div>
            <div className="text-center">
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
                onClick={() => router.push("/appointment")}
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
