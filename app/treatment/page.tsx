"use client";

import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function DentalServices() {
  const router = useRouter();

  const services = [
    {
      title: "General Dentistry",
      description:
        "We offer comprehensive general dentistry services, including routine check-ups, cleanings, fillings, and preventive care to maintain optimal oral health.",
    },
    {
      title: "Cosmetic Dentistry",
      description:
        "Enhance your smile with our cosmetic dentistry services, including teeth whitening, veneers, and smile makeovers for a brighter, more confident look.",
    },
    {
      title: "Orthodontics",
      description:
        "Straighten misaligned teeth and correct bite issues with our orthodontic treatments, including traditional braces and modern clear aligners.",
    },
    {
      title: "Pediatric Dentistry",
      description:
        "Our pediatric dental services focus on children's oral health, providing gentle and effective treatments to ensure a lifetime of healthy smiles.",
    },
    {
      title: "Emergency Dental Care",
      description:
        "We provide urgent dental care for severe tooth pain, broken teeth, or any other dental emergencies, ensuring prompt and effective treatment.",
    },
    {
      title: "Periodontics & Gum Care",
      description:
        "Our gum care services help prevent and treat gum disease with deep cleaning procedures, laser therapy, and surgical treatments if needed.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center p-8">
        <div className="max-w-5xl p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="relative w-full h-64 mb-6">
            <img 
              src="/treatment.jpg" 
              alt="Dental Services" 
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Our Dental Treatment
          </h1>
          <div className="space-y-6">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-100 shadow-sm rounded-lg p-6 border border-gray-300">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => router.push("/appointment")}
                >
                  Book an Appointment
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
