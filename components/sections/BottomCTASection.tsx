'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BottomCTA } from '@/lib/content/en';

interface BottomCTASectionProps {
  data: BottomCTA;
}

export function BottomCTASection({ data }: BottomCTASectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative px-4 py-20 lg:py-32 overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.08) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6 lg:space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--token-text-primary)] leading-tight"
          >
            {data.title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-[var(--token-text-secondary)] max-w-3xl mx-auto leading-relaxed"
          >
            {data.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              {data.primaryCTA}
            </Link>
            {data.secondaryCTA && (
              <Link
                href="#"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[var(--token-text-primary)] border-2 border-[var(--token-border)] hover:border-[var(--token-text-primary)] rounded-full transition-all hover:bg-[var(--token-bg-secondary)]"
              >
                {data.secondaryCTA}
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
