"use client";

import { motion } from "framer-motion";
import { Card } from "@/app/components/ui/card";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sophia Martinez",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 5,
    text: "Excellent service! The staff is friendly and professional. Highly recommend this dental clinic!",
  },
  {
    name: "James Johnson",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    text: "Very clean and modern facility. The dentist explained everything in detail. Great experience!",
  },
  {
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/35.jpg",
    rating: 5,
    text: "I had an amazing experience. The care and attention to detail were top-notch!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-cyan-50">
      <div className="container mx-auto px-4">
        {/* Heading with Scroll Animation */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-cyan-400 text-lg font-semibold">OUR REVIEWS</h2>
          <h3 className="text-3xl font-bold">What People Say About Us</h3>
        </motion.div>

        {/* Responsive Grid with Scroll Animation */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow rounded-xl bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border-2 border-cyan-400"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
