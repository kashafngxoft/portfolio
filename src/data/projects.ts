export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  role: string;
  outcome: string;
  highlights: string[];
  tech: string[];
  year: string;
  featured: boolean;
  cover?: string;
  images?: ProjectImage[];
  liveUrl?: string;
  gitlabUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "shopenzi",
    title: "Shopenzi",
    subtitle: "B2B marketplace",
    description:
      "A wholesale B2B marketplace with product discovery, seller onboarding, RFQ flows, and role-based access for Admin, User, and Buyer.",
    problem:
      "Businesses needed a marketplace to browse wholesale inventory, request quotes, and operate across buyer and seller roles with clear admin controls.",
    role: "Built backend APIs in FastAPI and integrated them with a React frontend—covering role-based access for Admin, User, and Buyer roles.",
    outcome:
      "Shipped production-ready role flows and marketplace surfaces spanning search, categories, RFQ, and seller journeys.",
    highlights: [
      "Role-based access for Admin, User, and Buyer",
      "Product search, categories, and RFQ (Request for Quotation)",
      "Seller onboarding and marketplace discovery",
      "FastAPI backends integrated with React UI",
    ],
    tech: ["FastAPI", "React", "Python", "REST", "MongoDB"],
    year: "2025",
    featured: true,
    images: [
      {
        src: "/projects/shopenzi.png",
        width: 476,
        height: 466,
        alt: "Shopenzi B2B marketplace homepage with search and categories",
      },
    ],
  },
  {
    slug: "amspensan",
    title: "Amspensan",
    subtitle: "Pharmacy education platform",
    description:
      "Pharmacy management for students, preceptors, rotations, evaluations, and compliance—built for schools and clinical sites.",
    problem:
      "Pharmacy programs needed a single system to manage students, preceptors, rotations, approvals, and compliance status.",
    role: "Developed the frontend with Next.js and TypeScript, including admin and preceptor dashboards for students, preceptors, and rotation workflows.",
    outcome:
      "Delivered filtered grid/list management UIs for students and preceptors with status tracking, search, and role-specific navigation.",
    highlights: [
      "Student and preceptor management dashboards",
      "Filters, search, list/grid views, and compliance tracking",
      "Rotation, evaluation, and approval workflows",
      "Next.js + TypeScript frontend for multi-role UX",
    ],
    tech: ["Next.js", "TypeScript", "React"],
    year: "2025",
    featured: true,
    images: [
      {
        src: "/projects/amspensan-students.png",
        width: 1024,
        height: 505,
        alt: "Amspensan My Students dashboard for preceptors",
      },
      {
        src: "/projects/amspensan-admin.png",
        width: 1024,
        height: 522,
        alt: "Amspensan Student Management admin grid",
      },
      {
        src: "/projects/amspensan-preceptors.png",
        width: 1024,
        height: 483,
        alt: "Amspensan Preceptor Management admin view",
      },
    ],
  },
  {
    slug: "rench",
    title: "Rench",
    subtitle: "Mechanic mobile app",
    description:
      "Mechanic services platform with customer and mechanic roles—problem reports, service flows, and admin tools backed by a Python API server.",
    problem:
      "Customers and mechanics needed a mobile product for service requests, issue reporting, and role-based operations with a reliable backend.",
    role: "Built Python backend services for the mechanic app—including admin problem-report listing with filters for customer and mechanic issues.",
    outcome:
      "Service layer supporting mechanic/customer reports, priorities, statuses, and admin review workflows.",
    highlights: [
      "Customer and mechanic problem report APIs",
      "Admin filters for issue type, priority, and status",
      "Role-based authorization on service endpoints",
      "Python backend with Vite client architecture",
    ],
    tech: ["Python", "FastAPI", "REST", "Mobile"],
    year: "2025",
    featured: true,
  },
  {
    slug: "earth-day",
    title: "Earth Day",
    subtitle: "Recycling backend APIs",
    description:
      "Backend APIs for a mobile recycling ecosystem—company discovery, AI-assisted waste sorting, pickup scheduling, digital receipts, and activity tracking.",
    problem:
      "The mobile product needed a solid API layer for discovery, sorting assistance, pickups, and digital receipt / feedback flows.",
    role: "Built the Python / FastAPI backend that powers Earth Day’s recycling flows—APIs for mobile clients across discovery, sorting, pickups, and receipts.",
    outcome:
      "REST endpoints ready for mobile clients covering discovery, AI sorting assist, pickups, digital receipts, and activity history.",
    highlights: [
      "Company discovery endpoints",
      "AI-assisted waste sorting APIs",
      "Pickup management and digital receipts",
      "Python + FastAPI service architecture",
    ],
    tech: ["Python", "FastAPI", "REST", "AI"],
    year: "2025",
    featured: true,
    images: [
      {
        src: "/projects/earth-day.png",
        width: 714,
        height: 222,
        alt: "Earth Day recycling app promo with digital receipt feedback screen",
      },
    ],
  },
  {
    slug: "her-golf",
    title: "Her Golf",
    subtitle: "Landing page",
    description:
      "Marketing landing page for a golf lifestyle product—profile onboarding, engagement journey, and clear conversion CTA.",
    problem:
      "Needed a polished landing page that explained the product journey and drove sign-ups.",
    role: "Designed and built the landing experience, including how-it-works steps and primary call-to-action.",
    outcome:
      "Clean, conversion-focused landing page with a three-step product story.",
    highlights: [
      "How-it-works section with stepped journey",
      "Clear primary CTA",
      "Modern marketing layout",
    ],
    tech: ["React", "HTML/CSS", "Landing page"],
    year: "2025",
    featured: false,
    images: [
      {
        src: "/projects/her-golf.png",
        width: 796,
        height: 471,
        alt: "Her Golf landing page how-it-works section",
      },
    ],
  },
  {
    slug: "breast-cancer-detection",
    title: "Breast Cancer Detection System",
    subtitle: "CNN image classifier",
    description:
      "CNN-based medical image classifier with a Flask API and React frontend.",
    problem:
      "Needed an accessible way to run CNN classification on medical images through a simple web UI.",
    role: "Built the TensorFlow model pipeline with Flask API endpoints and a React frontend.",
    outcome:
      "Working classifier demo spanning model inference, API, and UI.",
    highlights: [
      "TensorFlow CNN classifier",
      "Flask inference API",
      "React frontend for results",
    ],
    tech: ["Python", "TensorFlow", "Flask", "React"],
    year: "2024",
    featured: false,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
