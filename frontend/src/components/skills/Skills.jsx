import React from "react";
import "./Skills.css";

const skills = [
  { name: "HTML", level: 95 },
  { name: "CSS", level: 90 },
  { name: "JavaScript", level: 88 },
  { name: "React", level: 85 },
  { name: "Node.js", level: 82 },
  { name: "Express.js", level: 82 },
  { name: "MongoDB", level: 80 },
  { name: "Java", level: 90 },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <p className="skills-tag">TECH STACK</p>

        <h2 className="skills-title">
          My <span>Skills</span>
        </h2>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span>{skill.level}%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
