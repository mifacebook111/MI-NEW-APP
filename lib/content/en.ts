export interface HeroSection {
  title: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  backgroundImage?: string;
}

export interface FeatureTab {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  benefits: string[];
}

export interface ComparisonItem {
  feature: string;
  dealism: string;
  competitors: string;
}

export interface InsightCard {
  icon: string;
  title: string;
  description: string;
  metric?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  logo: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingPeriod: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BottomCTA {
  title: string;
  description: string;
  primaryCTA: string;
  secondaryCTA?: string;
}

export const heroSection: HeroSection = {
  title: 'Transform Your Workflow',
  description:
    'Dealism helps teams collaborate seamlessly and achieve their goals with powerful, intuitive tools designed for the modern workplace.',
  primaryCTA: 'Get beta access',
  secondaryCTA: 'Learn more',
  backgroundImage: '/dealism/hero/hero-mockup.png',
};

export const featureTabs: FeatureTab[] = [
  {
    id: 'unified-inbox',
    label: 'Unified Inbox',
    title: 'A Unified Inbox for All Your Communication',
    description: 'Consolidate all your messages, notifications, and tasks in one beautiful interface. Say goodbye to context switching.',
    image: '/dealism/features/unified-inbox.png',
    benefits: [
      'All messages in one place',
      'Smart sorting and filtering',
      'Priority alerts',
      'Search across all channels',
    ],
  },
  {
    id: 'active',
    label: 'Active Projects',
    title: 'Stay Active with Real-Time Collaboration',
    description:
      'Keep your team in sync with live updates, instant notifications, and collaborative editing. Activity is tracked and visible to everyone.',
    image: '/dealism/features/active-projects.png',
    benefits: [
      'Real-time collaboration',
      'Live presence indicators',
      'Instant notifications',
      'Activity timeline',
    ],
  },
  {
    id: 'inactive',
    label: 'Archive & History',
    description: 'Never lose important information with our comprehensive archive and history system.',
    image: '/dealism/features/archive.png',
    title: 'Keep Everything, Find Anything',
    benefits: [
      'Complete message history',
      'Smart archiving',
      'Full-text search',
      'Time-travel view',
    ],
  },
];

export const comparisonData: ComparisonItem[] = [
  {
    feature: 'Unified Inbox',
    dealism: '✓ Included',
    competitors: 'Scattered across apps',
  },
  {
    feature: 'Real-time Sync',
    dealism: '✓ Instant',
    competitors: 'Delayed',
  },
  {
    feature: 'AI-powered Search',
    dealism: '✓ Advanced',
    competitors: 'Basic',
  },
  {
    feature: 'Team Analytics',
    dealism: '✓ Comprehensive',
    competitors: 'Limited',
  },
  {
    feature: 'Integrations',
    dealism: '✓ 100+',
    competitors: '20-30',
  },
  {
    feature: 'Mobile App',
    dealism: '✓ Native iOS & Android',
    competitors: 'Web-only or limited',
  },
];

export const insightCards: InsightCard[] = [
  {
    icon: '⚡',
    title: 'Faster Response Times',
    description: 'Reduce response times by up to 40% with intelligent message prioritization.',
    metric: '40% faster',
  },
  {
    icon: '📊',
    title: 'Better Insights',
    description: 'Get actionable insights into team collaboration patterns and productivity trends.',
    metric: '10+ metrics',
  },
  {
    icon: '🔐',
    title: 'Enterprise Security',
    description: 'Bank-level encryption and SOC 2 compliance for peace of mind.',
    metric: '256-bit SSL',
  },
  {
    icon: '🚀',
    title: 'Scale with Ease',
    description: 'Built for teams from 5 to 5000+ members without performance degradation.',
    metric: '99.9% uptime',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechCorp',
    quote:
      'Dealism transformed how our team communicates. We saved hours every week just by consolidating our tools.',
    image: '/dealism/testimonials/avatar-1.jpg',
    logo: '/dealism/testimonials/logo-techcorp.svg',
  },
  {
    name: 'Marcus Johnson',
    role: 'Engineering Lead',
    company: 'InnovateLabs',
    quote:
      'The unified inbox feature alone is worth it. Our team is now 30% more productive.',
    image: '/dealism/testimonials/avatar-2.jpg',
    logo: '/dealism/testimonials/logo-innovatelabs.svg',
  },
  {
    name: 'Emma Rodriguez',
    role: 'CEO',
    company: 'GrowthScale',
    quote:
      'Best investment we made for our team collaboration. Couldn\'t imagine working without Dealism now.',
    image: '/dealism/testimonials/avatar-3.jpg',
    logo: '/dealism/testimonials/logo-growthscale.svg',
  },
  {
    name: 'David Kim',
    role: 'Operations Manager',
    company: 'StreamlineCo',
    quote:
      'The analytics dashboard gives us visibility we never had before. Game changer for our workflow.',
    image: '/dealism/testimonials/avatar-4.jpg',
    logo: '/dealism/testimonials/logo-streamlineco.svg',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    currency: 'USD',
    billingPeriod: '/month',
    description: 'Perfect for small teams getting started',
    features: [
      'Up to 5 team members',
      'Basic integrations',
      'Message history (30 days)',
      'Community support',
      'Mobile app access',
    ],
    cta: 'Get started',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 79,
    currency: 'USD',
    billingPeriod: '/month',
    description: 'For growing teams',
    features: [
      'Up to 50 team members',
      '100+ integrations',
      'Full message history',
      'Priority email support',
      'Analytics dashboard',
      'Custom branding',
      'Advanced search',
    ],
    cta: 'Get started',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    currency: 'USD',
    billingPeriod: '/month',
    description: 'For large organizations',
    features: [
      'Unlimited team members',
      'All integrations',
      'Unlimited message history',
      '24/7 phone & email support',
      'Advanced analytics',
      'SSO & SAML',
      'Custom integrations',
      'Dedicated account manager',
    ],
    cta: 'Contact sales',
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does Dealism work?',
    answer:
      'Dealism consolidates all your communication channels into a single unified inbox. It integrates with your existing tools and provides intelligent features like message prioritization, search, and team analytics.',
  },
  {
    id: 'faq-2',
    question: 'Is my data secure?',
    answer:
      'Yes, we use bank-level 256-bit SSL encryption for all data in transit and at rest. We\'re SOC 2 Type II compliant and conduct regular security audits to ensure your data stays safe.',
  },
  {
    id: 'faq-3',
    question: 'What integrations do you support?',
    answer:
      'We support 100+ integrations including Slack, Teams, Discord, Email, GitHub, Jira, and more. Our API also allows for custom integrations tailored to your specific needs.',
  },
  {
    id: 'faq-4',
    question: 'Can I try Dealism for free?',
    answer:
      'Absolutely! We offer a 14-day free trial for all plans. No credit card required. You get full access to all features during the trial period.',
  },
  {
    id: 'faq-5',
    question: 'How many team members can I add?',
    answer:
      'It depends on your plan. Starter supports up to 5 members, Professional supports up to 50 members, and Enterprise supports unlimited members.',
  },
  {
    id: 'faq-6',
    question: 'Do you offer on-premise deployment?',
    answer:
      'Yes, for Enterprise customers. We offer self-hosted deployments with full administrative control. Contact our sales team to learn more about this option.',
  },
];

export const bottomCTA: BottomCTA = {
  title: 'Ready to Transform Your Workflow?',
  description:
    'Join hundreds of teams already using Dealism to collaborate better and achieve more.',
  primaryCTA: 'Get beta access now',
  secondaryCTA: 'Schedule a demo',
};

export const contentData = {
  heroSection,
  featureTabs,
  comparisonData,
  insightCards,
  testimonials,
  pricingPlans,
  faqItems,
  bottomCTA,
};
