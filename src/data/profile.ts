export interface ProfileData {
  name: string;
  role: string;
  title: string;
  headline: string;
  tagline: string;
  location: string;
  university: string;
  degree: string;
  graduationYear: string;
  cgpa: string;
  introduction: string;
  detailedBio: string[];
  contact: {
    email: string;
    phone: string;
    formattedPhone: string;
    linkedin: string;
    github: string;
    domain: string;
  };
  specializations: string[];
}

export const profile: ProfileData = {
  name: "Nisat Sama",
  role: "Java Backend Engineer",
  title: "Java Backend Engineer | Software Developer | Full-Stack Engineer",
  headline: "Building reliable backend systems, distributed applications, and useful software products.",
  tagline: "Focused on Java 21, Spring Boot, event-driven architectures, and resilient APIs.",
  location: "Kolkata, India",
  university: "Adamas University, Kolkata",
  degree: "B.Tech in Computer Science & Engineering",
  graduationYear: "May 2028",
  cgpa: "8.77 / 10.0",
  introduction:
    "I am a Computer Science undergraduate focused on Java backend engineering and full-stack software development. I enjoy designing reliable backend systems, developing practical software products, and exploring the engineering principles behind scalable applications.",
  detailedBio: [
    "Specializing in Java backend engineering with practical experience designing resilient REST APIs, event-driven systems, and distributed application components using Spring Boot and Apache Kafka.",
    "Hands-on with relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases, implementing strict schema constraints, transaction boundaries, and idempotent processing workflows.",
    "Committed to clean software architecture, containerization with Docker, comprehensive test suites with JUnit and Mockito, and building robust end-to-end full-stack applications with React.",
  ],
  contact: {
    email: "nisatsama7547@gmail.com",
    phone: "+917439730487",
    //formattedPhone: "+91 7439730487",
    linkedin: "https://www.linkedin.com/in/nisat-sama/",
    github: "https://github.com/nisatsama",
    //domain: "https://nisatsama.dev",
  },
  specializations: [
    "Java Backend Architecture",
    "Spring Boot & Spring Security",
    "Transactional Outbox & Event Streaming",
    "PostgreSQL, Redis & Concurrency Control",
    "Distributed Webhook & Message Delivery",
    "Full-Stack Web Development (React & Node.js)",
  ],
};
