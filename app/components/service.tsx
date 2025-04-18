"use client";

import { Card } from "@/app/components/ui/card";
import {
  FaTooth,
  FaRegSmile,
  FaXRay,
  FaUserMd,
  FaTeethOpen,
  FaTeeth,
  FaBrush,
  FaHeadSideMask,
} from "react-icons/fa";

const iconStyle = { color: "#00D1D1" };

const services = [
  {
    icon: <FaTooth style={iconStyle} />,
    title: "General Dentistry",
    description: "Providing routine check-ups and preventive treatments.",
  },
  {
    icon: <FaRegSmile style={iconStyle} />,
    title: "Cosmetic Dentistry",
    description: "Enhancing your smile with whitening and veneers.",
  },
  {
    icon: <FaXRay style={iconStyle} />,
    title: "Dental X-Rays",
    description: "Accurate diagnostics with modern technology.",
  },
  {
    icon: <FaUserMd style={iconStyle} />,
    title: "Oral Surgery",
    description: "Expert care for extractions and complex procedures.",
  },
  {
    icon: <FaTeeth style={iconStyle} />,
    title: "Dental Implants",
    description: "Permanent solution for missing teeth with natural-looking results.",
  },
  {
    icon: <FaTeethOpen style={iconStyle} />,
    title: "Orthodontics",
    description: "Specialized treatments for teeth alignment.",
  },
  {
    icon: <FaBrush style={iconStyle} />,
    title: "Teeth Whitening",
    description: "Professional whitening for a brighter smile.",
  },
  {
    icon: <FaHeadSideMask style={iconStyle} />,
    title: "Dental Hygiene",
    description: "Professional cleaning and preventive care.",
  },
];

export default function Services() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-[#00D1D1] text-lg font-semibold">OUR SERVICES</h2>
        <h3 className="text-3xl font-bold text-center mb-8 text-black">Our Treatment List</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 text-center bg-white shadow-md rounded-lg hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-4 flex justify-center" style={iconStyle}>
                {service.icon}
              </div>
              <h4 className="font-bold text-lg mb-2 text-black">{service.title}</h4>
              <p className="text-black">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
