export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  metrics: string;
  highlights?: string[];
  location: string;
}

export const educationHistory: EducationItem[] = [
  {
    id: "adamas",
    institution: "Adamas University, Kolkata",
    degree: "B.Tech — Computer Science & Engineering",
    period: "July 2024 – May 2028 (Expected)",
    metrics: "CGPA: 8.77 / 10.0",
    highlights: [
      "Specialization in Java Backend Engineering and Distributed Systems",
      "Core Coursework: Data Structures, OOP, DBMS, Computer Networks, Operating Systems",
    ],
    location: "Kolkata, India",
  },
  {
    id: "auxilium-12",
    institution: "Auxilium Convent School, Barasat",
    degree: "ISC — Class XII",
    period: "Completed March 2024",
    metrics: "Percentage: 95.75% · Chemistry: 100/100",
    highlights: [
      "Council for the Indian School Certificate Examinations (CISCE)",
      "Perfect score of 100/100 in Chemistry with academic honors",
    ],
    location: "Kolkata, India",
  },
  {
    id: "auxilium-10",
    institution: "Auxilium Convent School, Barasat",
    degree: "ICSE — Class X",
    period: "Completed May 2022",
    metrics: "Percentage: 97.00% · Mathematics: 100/100",
    highlights: [
      "Council for the Indian School Certificate Examinations (CISCE)",
      "Perfect score of 100/100 in Mathematics with academic honors",
    ],
    location: "Kolkata, India",
  },
];
