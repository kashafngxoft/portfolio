export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Assort Tech",
    location: "Lahore",
    period: "Dec 2025 – Present",
    bullets: [
      "Shopenzi — B2B marketplace with role-based Admin, User, and Buyer flows.",
      "Amspensan — Next.js / TypeScript frontend for pharmacy student and preceptor management.",
      "Rench — Python backend for a mechanic mobile app (reports, roles, admin services).",
      "Earth Day — FastAPI backends for recycling discovery, AI sorting, and pickups.",
    ],
  },
  {
    role: "Python Developer Intern",
    company: "NGXoft Solutions",
    location: "Remote / On-site",
    period: "Aug 2025 – Oct 2025",
    bullets: [
      "Python backends for chatbot systems and hotel facilities tooling.",
      "API integration and backend logic for ongoing product development.",
    ],
  },
];
