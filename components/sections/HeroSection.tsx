'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeroSection as HeroSectionType } from '@/lib/content/en';

interface HeroSectionProps {
  data: HeroSectionType;
}

export function HeroSection({ data }: HeroSectionProps) {
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
    <section className="relative min-h-[calc(100vh-64px)] lg:min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-20 lg:py-32 overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.1) 0%, transparent 50%)',
          }}
        />
      </motion.div>

      <motion.div
        className="mx-auto max-w-4xl text-center space-y-6 lg:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[var(--token-text-primary)] tracking-tight leading-tight"
          variants={itemVariants}
        >
          {data.title}
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl lg:text-2xl text-[var(--token-text-secondary)] max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          {data.description}
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center pt-4" variants={itemVariants}>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[var(--token-primary)] hover:bg-[var(--token-primary-hover)] rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            {data.primaryCTA}
          </Link>
          <Link
            href="#product"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[var(--token-text-primary)] border-2 border-[var(--token-border)] hover:border-[var(--token-text-primary)] rounded-full transition-all hover:bg-[var(--token-bg-secondary)]"
          >
            {data.secondaryCTA}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[var(--token-text-secondary)]"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
