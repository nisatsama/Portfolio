import React from "react";
import {
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaJava,
  FaGithub,
  FaNetworkWired,
} from "react-icons/fa";
import "./Skills.css";

const skills = [
  {
    title: "Frontend Development",
    icon: <FaLaptopCode />,
    description:
      "Building responsive, interactive and visually appealing user interfaces for modern web applications.",
    tech: ["HTML5", "CSS3", "JavaScript", "React.js", "Responsive Design"],
  },

  {
    title: "Backend Development",
    icon: <FaServer />,
    description:
      "Developing server-side applications, APIs and authentication systems that power web platforms.",
    tech: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "Middleware",
    ],
  },

  {
    title: "Database Management",
    icon: <FaDatabase />,
    description:
      "Designing and managing databases for efficient storage, retrieval and scalability of application data.",
    tech: ["MongoDB", "Mongoose", "CRUD Operations", "Schema Design"],
  },

  {
    title: "Java & DSA",
    icon: <FaJava />,
    description:
      "Applying object-oriented programming principles and data structures to solve coding and software engineering problems.",
    tech: [
      "Java",
      "OOP",
      "Data Structures",
      "Algorithms",
      "Collections",
      "Problem Solving",
    ],
  },

  {
    title: "Developer Tools",
    icon: <FaGithub />,
    description:
      "Using modern development, deployment and version control tools to build, test and manage applications efficiently.",
    tech: ["Git", "GitHub", "VS Code", "Vercel", "Render", "npm"],
  },

  {
    title: "CS Fundamentals",
    icon: <FaNetworkWired />,
    description:
      "Strong foundation in core computer science concepts that support scalable and reliable software development.",
    tech: [
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
      "OOP Concepts",
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <p className="skills-tag">TECH STACK</p>

        <h2 className="skills-title">
          What I <span>Build</span>
        </h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{skill.icon}</div>

              <h3>{skill.title}</h3>

              <p>{skill.description}</p>

              <div className="tech-tags">
                {skill.tech.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
