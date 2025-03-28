"use client";

import { Card } from "@/app/components/ui/card";
import { FaTooth, FaRegSmile, FaXRay, FaUserMd } from "react-icons/fa";

const services = [
  {
    icon: <FaTooth className="text-cyan-400" />,
    title: "General Dentistry",
    description: "Providing routine check-ups and preventive treatments.",
  },
  {
    icon: <FaRegSmile className="text-cyan-400" />,
    title: "Cosmetic Dentistry",
    description: "Enhancing your smile with whitening and veneers.",
  },
  {
    icon: <FaXRay className="text-cyan-400" />,
    title: "Dental X-Rays",
    description: "Accurate diagnostics with modern technology.",
  },
  {
    icon: <FaUserMd className="text-cyan-400" />,
    title: "Oral Surgery",
    description: "Expert care for extractions and complex procedures.",
  },
  {
    icon: "🦷",
    title: "Dental Implants",
    description: "Permanent solution for missing teeth with natural-looking results",
  },
  {
    icon: "🦷",
    title: "Orthodontics",
    description: "Specialized treatments for teeth alignment",
  },
  {
    icon: "🦷",
    title: "Teeth Whitening",
    description: "Professional whitening for a brighter smile",
  },
  {
    icon: "🦷",
    title: "Dental Hygiene",
    description: "Professional cleaning and preventive care",
  },
];

export default function Services() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-cyan-400 mb-2">OUR SERVICES</h2>
        <h3 className="text-3xl font-bold text-center mb-12">Our Treatment List</h3>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow rounded-lg">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h4 className="font-bold text-lg mb-2">{service.title}</h4>
              <p className="text-gray-600">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
