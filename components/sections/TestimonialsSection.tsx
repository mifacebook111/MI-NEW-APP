'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '@/lib/content/en';

interface TestimonialsSectionProps {
  data: Testimonial[];
  title: string;
  description: string;
}

export function TestimonialsSection({ data, title, description }: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, data.length]);

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const nextSlide = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
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

        <div className="relative">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12 rounded-2xl bg-[var(--token-surface)] border border-[var(--token-border)]"
                onMouseEnter={() => setAutoplay(false)}
                onMouseLeave={() => setAutoplay(true)}
              >
                <div className="space-y-6">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[var(--token-bg-secondary)]" />
                      <div>
                        <h4 className="text-lg font-semibold text-[var(--token-text-primary)]">
                          {data[activeIndex].name}
                        </h4>
                        <p className="text-sm text-[var(--token-text-secondary)]">
                          {data[activeIndex].role} at {data[activeIndex].company}
                        </p>
                      </div>
                    </div>
                    <div className="w-20 h-8 bg-[var(--token-bg-secondary)] rounded flex items-center justify-center text-xs text-[var(--token-text-secondary)]">
                      Logo
                    </div>
                  </div>

                  <blockquote className="text-xl md:text-2xl font-medium text-[var(--token-text-primary)] leading-relaxed italic">
                    &ldquo;{data[activeIndex].quote}&rdquo;
                  </blockquote>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-[var(--token-primary)] w-8'
                      : 'bg-[var(--token-border)]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full border border-[var(--token-border)] hover:border-[var(--token-primary)] hover:text-[var(--token-primary)] transition-all"
                aria-label="Previous testimonial"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full border border-[var(--token-border)] hover:border-[var(--token-primary)] hover:text-[var(--token-primary)] transition-all"
                aria-label="Next testimonial"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
