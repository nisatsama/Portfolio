export interface Achievement {
  id: string;
  title: string;
  event: string;
  period: string;
  summary: string;
  highlights: string[];
}

export const achievements: Achievement[] = [
  {
    id: "flipkart-grid",
    title: "Round 3 Qualifier — Software Development Track",
    event: "Flipkart GRiD 8.0",
    period: "2026",
    summary:
      "Advanced to Round 3 of Flipkart's flagship national engineering challenge in the Software Development Track, testing scalable system architecture and software design.",
    highlights: [
      "Qualified through rigorous technical evaluation rounds focused on problem-solving and software architecture.",
      "Competed at the national level alongside top engineering undergraduates.",
    ],
  },
  {
    id: "sih-2026",
    title: "Internal Hackathon Winner & Official Portal Submission",
    event: "Smart India Hackathon 2026",
    period: "2026",
    summary:
      "Selected as winner in the university internal hackathon round and submitted the complete engineering solution through the official SIH portal.",
    highlights: [
      "Proposed and developed a practical software solution addressing national problem statements.",
      "Secured top selection from internal jury to represent Adamas University on the SIH platform.",
    ],
  },
  {
    id: "hcl-guvi",
    title: "Real-Time Fraud Call Detector",
    event: "HCL GUVI AI Impact Buildathon 2026",
    period: "2026",
    summary:
      "Engineered an automated real-time fraud call detection system leveraging Python, FastAPI, and machine learning / NLP pipelines.",
    highlights: [
      "Designed low-latency audio/text analysis microservice to classify scam patterns and alert users.",
      "Built clean FastAPI service endpoints for rapid payload ingestion and real-time inference.",
    ],
  },
  {
    id: "vibe2ship",
    title: "Cloud Run Deployed Full-Stack Application",
    event: "Coding Ninjas × Google Vibe2Ship Hackathon",
    period: "2026",
    summary:
      "Built and deployed a full-stack MERN application incorporating automated Gemini workflows containerized on Google Cloud Run.",
    highlights: [
      "Integrated Gemini API for dynamic data enrichment within application flows.",
      "Configured container build pipeline and successfully deployed on Google Cloud Run serverless infrastructure.",
    ],
  },
];
