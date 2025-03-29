"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/app/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Heading with Scroll Animation */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-cyan-500 text-lg font-semibold">FAQ</h2>
          <h3 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h3>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-cyan-600">
                How long does a dental cleaning take?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                A typical dental cleaning takes between 30-60 minutes depending on the condition of your teeth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-cyan-600">
                What foods help maintain clean teeth with braces?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Soft foods like yogurt, pasta, and well-cooked vegetables are best. Avoid hard, sticky, or chewy foods.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium text-gray-900 hover:text-cyan-600">
                How do I properly clean children's teeth?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Use a soft-bristled toothbrush and fluoride toothpaste. Brush gently in circular motions for two minutes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
