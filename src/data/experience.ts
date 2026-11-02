export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "inamigos",
    role: "AI Web Development Intern",
    company: "InAmigos Foundation",
    type: "Internship",
    period: "June 2026 – July 2026",
    location: "Remote",
    responsibilities: [
      "Built responsive web interfaces and reusable UI components for an NGO and EdTech platform based on functional requirements.",
      "Improved navigation and visual consistency across client pages through thorough UI/UX analysis.",
      "Designed an NGO website prototype in Figma and delivered an actionable design improvement report.",
    ],
  },
];
