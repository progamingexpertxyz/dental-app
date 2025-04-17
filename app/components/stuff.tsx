"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "Dr. Peter Davis",
    role: "Dental Surgeon",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&h=500&fit=crop",
  },
  {
    name: "Dr. Martha Gallo",
    role: "Orthodontist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=500&fit=crop",
  },
  {
    name: "Dr. Luca Ferrera",
    role: "Dental Surgeon",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=500&fit=crop",
  },
  {
    name: "Dr. Julia Smith",
    role: "Orthodontist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=500&fit=crop",
  },
];

export default function Team() {
  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12 opacity-0"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-cyan-400 text-lg font-semibold">OUR STAFF</h2>
          <h3 className="text-3xl font-bold text-black">Meet Our Specialists</h3>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 opacity-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-white">
                <h4 className="text-xl font-bold text-white">{member.name}</h4>
                <p className="text-sm text-gray-300">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
