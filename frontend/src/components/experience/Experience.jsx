import React from "react";
import "./Experience.css";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Personal Projects",
    period: "2025 - Present",
    description:
      "Built and deployed full-stack web applications using MERN Stack. Developed authentication systems, REST APIs, responsive UI, and database integrations.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "DSA & Problem Solving",
    company: "LeetCode",
    period: "2024 - Present",
    description:
      "Solved 327+ coding problems covering Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, and Backtracking.",
    tech: ["Java", "DSA", "Algorithms"],
  },
  {
    title: "AI Resume Analyzer",
    company: "AI Project",
    period: "2026",
    description:
      "Developed an AI-powered resume analyzer providing ATS score evaluation, skill extraction, and resume feedback using modern AI APIs.",
    tech: ["React", "Node.js", "AI", "MongoDB"],
  },
];

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <p className="section-tag">MY JOURNEY</p>

        <h2 className="section-title">
          Experience &<span> Growth</span>
        </h2>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div className="timeline-item" key={index}>
              <div className="timeline-dot"></div>

              <div className="timeline-card">
                <div className="timeline-header">
                  <h3>{exp.title}</h3>
                  <span>{exp.period}</span>
                </div>

                <h4>{exp.company}</h4>

                <p>{exp.description}</p>

                <div className="tech-stack">
                  {exp.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
