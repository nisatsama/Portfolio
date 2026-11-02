export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: "Cloud" | "Backend" | "Core Engineering";
}

export const certifications: Certification[] = [
  {
    id: "aws-cpe",
    name: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    date: "May 2026",
    category: "Cloud",
  },
  {
    id: "azure-fundamentals",
    name: "Azure Fundamentals",
    issuer: "Infosys Springboard",
    date: "July 2026",
    category: "Cloud",
  },
  {
    id: "spring-framework",
    name: "Spring Framework Overview",
    issuer: "Infosys Springboard",
    date: "July 2026",
    category: "Backend",
  },
  {
    id: "hackerrank-swe-intern",
    name: "Software Engineer Intern Role Certificate",
    issuer: "HackerRank",
    date: "July 2026",
    category: "Core Engineering",
  },
];
