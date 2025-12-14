'use client';

import { motion } from 'framer-motion';
import { InsightCard } from '@/lib/content/en';

interface InsightsSectionProps {
  data: InsightCard[];
  title: string;
  description: string;
}

export function InsightsSection({ data, title, description }: InsightsSectionProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  const counterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  return (
    <section className="relative px-4 py-20 lg:py-32">
      <div className="mx-auto max-w-6xl">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((card, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-[var(--token-surface)] border border-[var(--token-border)] hover:border-[var(--token-primary)] transition-all hover:shadow-[var(--token-shadow-lg)]"
              whileHover={{ y: -4 }}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-[var(--token-text-primary)] mb-3">{card.title}</h3>
              <p className="text-[var(--token-text-secondary)] mb-4">{card.description}</p>
              {card.metric && (
                <motion.div
                  variants={counterVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="text-lg font-bold text-[var(--token-primary)]"
                >
                  {card.metric}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
