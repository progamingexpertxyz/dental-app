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
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does a dental cleaning take?</AccordionTrigger>
              <AccordionContent>
                A typical dental cleaning takes between 30-60 minutes depending on the condition of your teeth.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What foods help maintain clean teeth with braces?</AccordionTrigger>
              <AccordionContent>
                Soft foods like yogurt, pasta, and well-cooked vegetables are best. Avoid hard, sticky, or chewy foods.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I properly clean children's teeth?</AccordionTrigger>
              <AccordionContent>
                Use a soft-bristled toothbrush and fluoride toothpaste. Brush gently in circular motions for two minutes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
