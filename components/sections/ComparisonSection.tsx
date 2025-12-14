'use client';

import { motion } from 'framer-motion';
import { ComparisonItem } from '@/lib/content/en';

interface ComparisonSectionProps {
  data: ComparisonItem[];
  title: string;
  description: string;
}

export function ComparisonSection({ data, title, description }: ComparisonSectionProps) {
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="relative px-4 py-20 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--token-text-primary)]">
            {title}
          </h2>
          <p className="text-lg text-[var(--token-text-secondary)] max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[var(--token-border)]">
                <th className="text-left py-4 px-4 font-semibold text-[var(--token-text-primary)]">
                  Feature
                </th>
                <th className="text-left py-4 px-4 font-semibold text-[var(--token-primary)]">Dealism</th>
                <th className="text-left py-4 px-4 font-semibold text-[var(--token-text-secondary)]">
                  Competition
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <motion.tr
                  key={item.feature}
                  className="border-b border-[var(--token-border)] hover:bg-[var(--token-bg-secondary)] transition-colors"
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <td className="py-4 px-4 text-[var(--token-text-primary)] font-medium">{item.feature}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-[var(--token-primary)]">{item.dealism}</span>
                  </td>
                  <td className="py-4 px-4 text-[var(--token-text-secondary)]">{item.competitors}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
