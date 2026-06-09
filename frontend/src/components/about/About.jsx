import React from "react";
import { Code, Brain, Rocket, Trophy } from "lucide-react";

const About = () => {
  const stats = [
    {
      icon: <Brain size={24} />,
      title: "327+",
      subtitle: "LeetCode Problems",
    },
    {
      icon: <Rocket size={24} />,
      title: "2+",
      subtitle: "Projects Deployed",
    },
    {
      icon: <Code size={24} />,
      title: "MERN",
      subtitle: "Full Stack Developer",
    },
    {
      icon: <Trophy size={24} />,
      title: "2027",
      subtitle: "SDE Goal",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 md:px-20 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <p className="text-cyan-400 font-semibold mb-3 tracking-widest uppercase">
          About Me
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Building Products,
          <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Solving Problems
          </span>
        </h2>

        <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
          I'm <span className="text-white font-semibold">Nisat Sama</span>, a
          Computer Science student and aspiring Software Engineer passionate
          about Full Stack Development, Data Structures & Algorithms, and
          creating impactful digital experiences.
        </p>

        <p className="text-gray-400 text-lg leading-relaxed mt-6 max-w-3xl">
          From building MERN stack applications to solving hundreds of coding
          challenges, I enjoy transforming ideas into scalable products while
          continuously improving my problem-solving skills and engineering
          mindset.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
          {stats.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/5 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-cyan-400 mb-3">{item.icon}</div>

              <h3 className="text-2xl font-bold text-white">{item.title}</h3>

              <p className="text-gray-400 text-sm mt-1">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
