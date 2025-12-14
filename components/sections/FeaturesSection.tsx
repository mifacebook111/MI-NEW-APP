'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureTab } from '@/lib/content/en';

interface FeaturesSectionProps {
  tabs: FeatureTab[];
  title: string;
  description: string;
}

export function FeaturesSection({ tabs, title, description }: FeaturesSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'unified-inbox');

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <section id="features" className="relative px-4 py-20 lg:py-32 scroll-mt-20">
      <div className="mx-auto max-w-7xl">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex gap-3 mb-8 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-[var(--token-primary)] text-white shadow-lg'
                      : 'bg-[var(--token-bg-secondary)] text-[var(--token-text-primary)] hover:bg-[var(--token-bg-tertiary)]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTabData && (
                <motion.div
                  key={activeTab}
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-[var(--token-text-primary)] mb-4">
                      {activeTabData.title}
                    </h3>
                    <p className="text-lg text-[var(--token-text-secondary)] leading-relaxed">
                      {activeTabData.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activeTabData.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-[var(--token-primary)] flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-[var(--token-text-primary)] font-medium">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="relative h-96 sm:h-[500px] bg-gradient-to-br from-[var(--token-bg-secondary)] to-[var(--token-bg-tertiary)] rounded-2xl overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center justify-center text-[var(--token-text-secondary)]"
            >
              {activeTabData?.label}
              <br />
              Mockup
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
