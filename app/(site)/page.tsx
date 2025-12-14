'use client';

import {
  HeroSection,
  FeaturesSection,
  ComparisonSection,
  InsightsSection,
  TestimonialsSection,
  PricingSection,
  FAQSection,
  BottomCTASection,
} from '@/components/sections';
import { contentData } from '@/lib/content/en';

export default function Home() {
  return (
    <>
      <HeroSection data={contentData.heroSection} />
      <FeaturesSection
        tabs={contentData.featureTabs}
        title="Powerful Features"
        description="Everything you need to transform your workflow and collaborate better"
      />
      <ComparisonSection
        data={contentData.comparisonData}
        title="Why Choose Dealism"
        description="See how Dealism stacks up against the competition"
      />
      <InsightsSection
        data={contentData.insightCards}
        title="The Dealism Difference"
        description="Measurable benefits for your team"
      />
      <TestimonialsSection
        data={contentData.testimonials}
        title="Loved by Teams"
        description="See what our customers say about Dealism"
      />
      <PricingSection
        data={contentData.pricingPlans}
        title="Simple, Transparent Pricing"
        description="Choose the perfect plan for your team"
      />
      <FAQSection
        data={contentData.faqItems}
        title="Frequently Asked Questions"
        description="Find answers to common questions about Dealism"
      />
      <BottomCTASection data={contentData.bottomCTA} />
    </>
  );
}
