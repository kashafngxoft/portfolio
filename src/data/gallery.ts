export type GalleryItem = {
  src: string;
  alt: string;
  projectSlug: string;
  projectTitle: string;
  label: string;
};

/** UI / product screens only — backend IDE shots stay out of the gallery */
export const galleryItems: GalleryItem[] = [
  {
    src: "/projects/shopenzi.png",
    alt: "Shopenzi B2B marketplace homepage",
    projectSlug: "shopenzi",
    projectTitle: "Shopenzi",
    label: "B2B marketplace",
  },
  {
    src: "/projects/amspensan-students.png",
    alt: "Amspensan My Students dashboard",
    projectSlug: "amspensan",
    projectTitle: "Amspensan",
    label: "Preceptor students view",
  },
  {
    src: "/projects/amspensan-admin.png",
    alt: "Amspensan Student Management admin",
    projectSlug: "amspensan",
    projectTitle: "Amspensan",
    label: "Student management",
  },
  {
    src: "/projects/amspensan-preceptors.png",
    alt: "Amspensan Preceptor Management",
    projectSlug: "amspensan",
    projectTitle: "Amspensan",
    label: "Preceptor management",
  },
  {
    src: "/projects/earth-day.png",
    alt: "Earth Day recycling app promo",
    projectSlug: "earth-day",
    projectTitle: "Earth Day",
    label: "Recycling product",
  },
  {
    src: "/projects/her-golf.png",
    alt: "Her Golf landing page",
    projectSlug: "her-golf",
    projectTitle: "Her Golf",
    label: "Landing page",
  },
];
