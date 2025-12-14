'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PricingPlan } from '@/lib/content/en';

interface PricingSectionProps {
  data: PricingPlan[];
  title: string;
  description: string;
}

export function PricingSection({ data, title, description }: PricingSectionProps) {
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

  return (
    <section id="pricing" className="relative px-4 py-20 lg:py-32 scroll-mt-20">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((plan, index) => (
            <motion.div
              key={plan.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`relative rounded-2xl transition-all ${
                plan.highlighted
                  ? 'md:scale-105 p-8 bg-[var(--token-primary)] text-white shadow-[var(--token-shadow-xl)]'
                  : 'p-8 bg-[var(--token-surface)] border border-[var(--token-border)] text-[var(--token-text-primary)]'
              }`}
              whileHover={plan.highlighted ? { scale: 1.08 } : { y: -4 }}
            >
              {plan.highlighted && (
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}

              <div className={`pt-4 ${plan.highlighted ? '' : ''}`}>
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.highlighted ? 'text-white' : 'text-[var(--token-text-primary)]'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${
                  plan.highlighted ? 'text-white/80' : 'text-[var(--token-text-secondary)]'
                }`}>
                  {plan.description}
                </p>

                <div className="mb-6">
                  <span className={`text-4xl font-bold ${
                    plan.highlighted ? 'text-white' : 'text-[var(--token-text-primary)]'
                  }`}>
                    ${plan.price}
                  </span>
                  <span className={`text-sm ml-2 ${
                    plan.highlighted ? 'text-white/80' : 'text-[var(--token-text-secondary)]'
                  }`}>
                    {plan.billingPeriod}
                  </span>
                </div>

                <Link
                  href={plan.cta === 'Contact sales' ? '#contact' : '/register'}
                  className={`w-full block text-center px-6 py-3 rounded-full font-semibold transition-all mb-8 ${
                    plan.highlighted
                      ? 'bg-white text-[var(--token-primary)] hover:bg-gray-100'
                      : 'bg-[var(--token-primary)] text-white hover:bg-[var(--token-primary-hover)]'
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? 'text-white' : 'text-[var(--token-primary)]'
                        }`}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className={`text-sm ${
                        plan.highlighted ? 'text-white/90' : 'text-[var(--token-text-secondary)]'
                      }`}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
