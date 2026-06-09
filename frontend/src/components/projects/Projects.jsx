import React from "react";
import "./Projects.css";

const projects = [
  {
    title: "Travelogia",
    description:
      "A full-stack travel booking platform with authentication, wishlist, cost estimation, destination management and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "#",
    live: "#",
  },
  {
    title: "AI Resume Analyzer",
    description:
      "AI-powered resume analysis platform that evaluates resumes, provides ATS scoring, extracts skills and generates improvement suggestions.",
    tech: ["React", "Node.js", "AI", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio showcasing projects, skills, achievements and development journey with modern UI design.",
    tech: ["React", "CSS"],
    github: "#",
    live: "#",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <p className="projects-tag">MY WORK</p>

        <h2 className="projects-title">
          Featured <span>Projects</span>
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>

              <div className="project-buttons">
                <a href={project.github}>GitHub</a>

                <a href={project.live}>Live Demo</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
