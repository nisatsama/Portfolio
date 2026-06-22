import React from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaGithub,
  FaTrophy,
  FaLaptopCode,
  FaCode,
} from "react-icons/fa";

import "./Experience.css";

const experiences = [
  {
    icon: <FaBriefcase />,
    title: "Software Development Intern",
    company: "Prodigy InfoTech",
    period: "2026",
    description:
      "Selected as a Software Development Intern. Worked on industry-level web development projects, strengthened software engineering fundamentals, and gained practical development experience.",
    tech: ["JavaScript", "React", "Web Development"],
  },

  {
    icon: <FaTrophy />,
    title: "Hackathon Participant",
    company: "National & University Hackathons",
    period: "2025 - Present",
    description:
      "Participated in multiple hackathons, building innovative solutions under time constraints while collaborating with teams on full-stack applications and problem-solving challenges.",
    tech: ["MERN Stack", "Teamwork", "Problem Solving"],
  },

  {
    icon: <FaGithub />,
    title: "Open Source Contributor",
    company: "GitHub",
    period: "2025 - Present",
    description:
      "Contributed to open-source repositories by fixing bugs, improving documentation, submitting pull requests, and collaborating with developers worldwide.",
    tech: ["Git", "GitHub", "Open Source"],
  },
];

const Experience = () => {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <p className="section-tag">MY JOURNEY</p>

        <h2 className="section-title">
          Experience & <span>Growth</span>
        </h2>

        <div className="experience-stats">
          <div className="stat-card">
            <h3>327+</h3>
            <p>Problems Solved</p>
          </div>

          <div className="stat-card">
            <h3>10+</h3>
            <p>Projects Built</p>
          </div>

          <div className="stat-card">
            <h3>3+</h3>
            <p>Hackathons</p>
          </div>

          <div className="stat-card">
            <h3>OSS</h3>
            <p>Contributor</p>
          </div>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="timeline-dot"></div>

              <div className="timeline-card">
                <div className="experience-icon">{exp.icon}</div>

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
