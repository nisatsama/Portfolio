import { useEffect, useState } from "react";

import profile from "../config/profile";

import SkillRadar from "./SkillRadar";

import { getGithubStats } from "../services/githubService";

import { getLeetcodeStats } from "../services/leetcodeService";

const About = () => {
  const [github, setGithub] = useState(null);

  const [leetcode, setLeetcode] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const githubData = await getGithubStats();

      const lcData = await getLeetcodeStats();

      setGithub(githubData);
      setLeetcode(lcData);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="metric-card">
        <h4>LeetCode</h4>

        <span>{leetcode ? leetcode.solved : "..."}</span>
      </div>

      <div className="metric-card">
        <h4>Repositories</h4>

        <span>{github ? github.repos : "..."}</span>
      </div>

      <div className="metric-card">
        <h4>CGPA</h4>

        <span>{profile.cgpa}</span>
      </div>

      <div className="metric-card">
        <h4>Status</h4>

        <span>{profile.internshipStatus}</span>
      </div>

      <SkillRadar />
    </div>
  );
};

export default About;
