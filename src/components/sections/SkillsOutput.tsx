import React from "react";
import { skillGroups } from "../../data/skills";

export const SkillsOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-4 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex items-center justify-between pb-2 border-b border-[#30343C]">
        <div className="text-sm font-semibold text-[#7EE787]">
          [Technical Capabilities] · Java Backend & Distributed Architecture
        </div>
        <div className="text-xs text-[#747C87]">6 Core Domains</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {skillGroups.map((group) => {
          const isPrimary = group.featured;
          return (
            <div
              key={group.category}
              className={`p-3.5 rounded-lg border transition-colors ${
                isPrimary
                  ? "bg-[#1E2127]/90 border-[#30343C] hover:border-[#7EE787]/50"
                  : "bg-[#17191D]/80 border-[#30343C]/80 hover:border-[#7AA2F7]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    isPrimary ? "text-[#7EE787]" : "text-[#7AA2F7]"
                  }`}
                >
                  {group.category}
                </span>
                <span className="text-[10px] text-[#747C87] font-mono">
                  {group.skills.length} items
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {group.skills.map((skill) => {
                  const isHighlighted =
                    skill.includes("Java") ||
                    skill.includes("Spring") ||
                    skill.includes("Kafka") ||
                    skill.includes("PostgreSQL");

                  return (
                    <span
                      key={skill}
                      className={`text-xs px-2 py-0.5 rounded font-mono transition-colors ${
                        isHighlighted
                          ? "bg-[#242831] text-[#E6E8EB] border border-[#7EE787]/40 font-medium"
                          : "bg-[#17191D] text-[#A0A7B2] border border-[#30343C]"
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-[#747C87] pt-1 flex items-center justify-between">
        <span>* Java 21, Spring ecosystem, and Kafka represent primary daily engineering stack.</span>
      </div>
    </div>
  );
};
