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
  title: 'Transforma Tu Flujo de Trabajo',
  description:
    'Dealism ayuda a los equipos a colaborar sin problemas y lograr sus objetivos con herramientas potentes e intuitivas diseñadas para el lugar de trabajo moderno.',
  primaryCTA: 'Obtén acceso beta',
  secondaryCTA: 'Aprende más',
  backgroundImage: '/dealism/hero/hero-mockup.png',
};

export const featureTabs: FeatureTab[] = [
  {
    id: 'unified-inbox',
    label: 'Bandeja Unificada',
    title: 'Una Bandeja de Entrada Unificada para Todas tus Comunicaciones',
    description: 'Consolida todos tus mensajes, notificaciones y tareas en una única interfaz hermosa. Adiós al cambio de contexto.',
    image: '/dealism/features/unified-inbox.png',
    benefits: [
      'Todos los mensajes en un solo lugar',
      'Ordenamiento y filtrado inteligente',
      'Alertas prioritarias',
      'Búsqueda en todos los canales',
    ],
  },
  {
    id: 'active',
    label: 'Proyectos Activos',
    title: 'Mantente Activo con Colaboración en Tiempo Real',
    description:
      'Mantén tu equipo sincronizado con actualizaciones en vivo, notificaciones instantáneas y edición colaborativa. La actividad se rastrea y es visible para todos.',
    image: '/dealism/features/active-projects.png',
    benefits: [
      'Colaboración en tiempo real',
      'Indicadores de presencia en vivo',
      'Notificaciones instantáneas',
      'Línea de tiempo de actividad',
    ],
  },
  {
    id: 'inactive',
    label: 'Archivo e Historial',
    description: 'Nunca pierda información importante con nuestro completo sistema de archivo e historial.',
    image: '/dealism/features/archive.png',
    title: 'Mantén Todo, Encuentra Cualquier Cosa',
    benefits: [
      'Historial completo de mensajes',
      'Archivado inteligente',
      'Búsqueda de texto completo',
      'Vista de viaje en el tiempo',
    ],
  },
];

export const comparisonData: ComparisonItem[] = [
  {
    feature: 'Bandeja Unificada',
    dealism: '✓ Incluida',
    competitors: 'Dispersa en múltiples aplicaciones',
  },
  {
    feature: 'Sincronización en Tiempo Real',
    dealism: '✓ Instantánea',
    competitors: 'Retrasada',
  },
  {
    feature: 'Búsqueda Impulsada por IA',
    dealism: '✓ Avanzada',
    competitors: 'Básica',
  },
  {
    feature: 'Análisis del Equipo',
    dealism: '✓ Completo',
    competitors: 'Limitado',
  },
  {
    feature: 'Integraciones',
    dealism: '✓ 100+',
    competitors: '20-30',
  },
  {
    feature: 'Aplicación Móvil',
    dealism: '✓ iOS y Android Nativos',
    competitors: 'Solo Web o Limitado',
  },
];

export const insightCards: InsightCard[] = [
  {
    icon: '⚡',
    title: 'Tiempos de Respuesta Más Rápidos',
    description: 'Reduce los tiempos de respuesta hasta en un 40% con priorización inteligente de mensajes.',
    metric: '40% más rápido',
  },
  {
    icon: '📊',
    title: 'Mejores Perspectivas',
    description: 'Obtén perspectivas procesables sobre patrones de colaboración del equipo y tendencias de productividad.',
    metric: '10+ métricas',
  },
  {
    icon: '🔐',
    title: 'Seguridad Empresarial',
    description: 'Cifrado de nivel bancario y cumplimiento de SOC 2 para tu tranquilidad.',
    metric: 'SSL de 256 bits',
  },
  {
    icon: '🚀',
    title: 'Escala con Facilidad',
    description: 'Construido para equipos de 5 a 5000+ miembros sin degradación del rendimiento.',
    metric: '99.9% de tiempo de actividad',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Gerente de Producto',
    company: 'TechCorp',
    quote:
      'Dealism transformó la forma en que nuestro equipo se comunica. Ahorró horas cada semana simplemente consolidando nuestras herramientas.',
    image: '/dealism/testimonials/avatar-1.jpg',
    logo: '/dealism/testimonials/logo-techcorp.svg',
  },
  {
    name: 'Marcus Johnson',
    role: 'Líder de Ingeniería',
    company: 'InnovateLabs',
    quote:
      'La función de bandeja unificada por sí sola vale la pena. Nuestro equipo es ahora 30% más productivo.',
    image: '/dealism/testimonials/avatar-2.jpg',
    logo: '/dealism/testimonials/logo-innovatelabs.svg',
  },
  {
    name: 'Emma Rodriguez',
    role: 'CEO',
    company: 'GrowthScale',
    quote:
      'La mejor inversión que hicimos para la colaboración de nuestro equipo. No podríamos imaginar trabajar sin Dealism ahora.',
    image: '/dealism/testimonials/avatar-3.jpg',
    logo: '/dealism/testimonials/logo-growthscale.svg',
  },
  {
    name: 'David Kim',
    role: 'Gerente de Operaciones',
    company: 'StreamlineCo',
    quote:
      'El panel de análisis nos da visibilidad que nunca tuvimos antes. Cambio de juego para nuestro flujo de trabajo.',
    image: '/dealism/testimonials/avatar-4.jpg',
    logo: '/dealism/testimonials/logo-streamlineco.svg',
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Inicial',
    price: 29,
    currency: 'USD',
    billingPeriod: '/mes',
    description: 'Perfecto para equipos pequeños que están comenzando',
    features: [
      'Hasta 5 miembros del equipo',
      'Integraciones básicas',
      'Historial de mensajes (30 días)',
      'Soporte comunitario',
      'Acceso a aplicación móvil',
    ],
    cta: 'Empezar',
  },
  {
    id: 'professional',
    name: 'Profesional',
    price: 79,
    currency: 'USD',
    billingPeriod: '/mes',
    description: 'Para equipos en crecimiento',
    features: [
      'Hasta 50 miembros del equipo',
      '100+ integraciones',
      'Historial completo de mensajes',
      'Soporte prioritario por correo electrónico',
      'Panel de análisis',
      'Marca personalizada',
      'Búsqueda avanzada',
    ],
    cta: 'Empezar',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Empresa',
    price: 299,
    currency: 'USD',
    billingPeriod: '/mes',
    description: 'Para grandes organizaciones',
    features: [
      'Miembros del equipo ilimitados',
      'Todas las integraciones',
      'Historial de mensajes ilimitado',
      'Soporte 24/7 por teléfono y correo',
      'Análisis avanzado',
      'SSO y SAML',
      'Integraciones personalizadas',
      'Gestor de cuenta dedicado',
    ],
    cta: 'Contactar ventas',
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Cómo funciona Dealism?',
    answer:
      'Dealism consolida todos tus canales de comunicación en una única bandeja de entrada unificada. Se integra con tus herramientas existentes y proporciona características inteligentes como priorización de mensajes, búsqueda y análisis del equipo.',
  },
  {
    id: 'faq-2',
    question: '¿Mis datos están seguros?',
    answer:
      'Sí, utilizamos cifrado SSL de 256 bits de nivel bancario para todos los datos en tránsito y en reposo. Somos compatibles con SOC 2 Tipo II y realizamos auditorías de seguridad regulares para garantizar que tus datos estén seguros.',
  },
  {
    id: 'faq-3',
    question: '¿Qué integraciones soportan?',
    answer:
      'Soportamos 100+ integraciones incluyendo Slack, Teams, Discord, Email, GitHub, Jira y más. Nuestra API también permite integraciones personalizadas adaptadas a tus necesidades específicas.',
  },
  {
    id: 'faq-4',
    question: '¿Puedo probar Dealism gratis?',
    answer:
      '¡Por supuesto! Ofrecemos una prueba gratuita de 14 días para todos los planes. Sin tarjeta de crédito requerida. Tienes acceso completo a todas las características durante el período de prueba.',
  },
  {
    id: 'faq-5',
    question: '¿Cuántos miembros del equipo puedo agregar?',
    answer:
      'Depende de tu plan. Inicial soporta hasta 5 miembros, Profesional soporta hasta 50 miembros, y Empresa soporta miembros ilimitados.',
  },
  {
    id: 'faq-6',
    question: '¿Ofrece implementación en el local?',
    answer:
      'Sí, para clientes Enterprise. Ofrecemos implementaciones auto-hospedadas con control administrativo completo. Contacta a nuestro equipo de ventas para obtener más información sobre esta opción.',
  },
];

export const bottomCTA: BottomCTA = {
  title: '¿Listo para Transformar Tu Flujo de Trabajo?',
  description:
    'Únete a cientos de equipos que ya usan Dealism para colaborar mejor y lograr más.',
  primaryCTA: 'Obtén acceso beta ahora',
  secondaryCTA: 'Programar una demostración',
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
