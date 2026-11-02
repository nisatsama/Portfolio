export interface SkillGroup {
  category: string;
  commandName: string;
  featured?: boolean;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend Engineering (Primary)",
    commandName: "backend",
    featured: true,
    skills: [
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "REST APIs",
      "JWT",
      "OAuth 2.0",
      "Microservices",
      "Node.js",
      "Express.js",
    ],
  },
  {
    category: "Programming Languages",
    commandName: "languages",
    featured: true,
    skills: ["Java (Primary)", "JavaScript", "SQL", "C"],
  },
  {
    category: "Databases & Messaging",
    commandName: "data",
    featured: true,
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Apache Kafka"],
  },
  {
    category: "Cloud, DevOps & Tools",
    commandName: "tools",
    skills: [
      "Docker",
      "AWS",
      "Google Cloud Run",
      "Git",
      "GitHub",
      "Postman",
      "Prometheus",
      "Micrometer",
    ],
  },
  {
    category: "Frontend Development",
    commandName: "frontend",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    category: "Computer Science Fundamentals",
    commandName: "cs-core",
    skills: [
      "Object-Oriented Programming",
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
    ],
  },
];
