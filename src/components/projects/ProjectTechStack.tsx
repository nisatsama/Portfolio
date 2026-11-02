import React from "react";
import { ProjectTechStack as TechStackType } from "../../data/projects";
import { Code2, Database, Wrench } from "lucide-react";

interface ProjectTechStackProps {
  stack: TechStackType;
  variant?: "compact" | "grouped";
}

export const ProjectTechStack: React.FC<ProjectTechStackProps> = ({
  stack,
  variant = "compact",
}) => {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {stack.all.map((tech) => {
          const isCoreJava =
            tech.includes("Java") ||
            tech.includes("Spring") ||
            tech.includes("Kafka") ||
            tech.includes("PostgreSQL");

          return (
            <span
              key={tech}
              className={`text-[11px] font-mono px-2 py-0.5 rounded border transition-colors ${
                isCoreJava
                  ? "bg-[#1E2127] text-[#E6E8EB] border-[#30343C] font-medium"
                  : "bg-[#17191D] text-[#A0A7B2] border-[#30343C]/80"
              }`}
            >
              {tech}
            </span>
          );
        })}
      </div>
    );
  }

  // Grouped display for detailed inspection view
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
      <div className="p-3 rounded-lg bg-[#101114] border border-[#30343C]/80 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7EE787] font-semibold uppercase">
          <Code2 className="w-3.5 h-3.5" />
          <span>Language & Framework</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {stack.languageAndFramework.map((item) => (
            <span
              key={item}
              className="text-xs font-mono px-2 py-0.5 rounded bg-[#17191D] text-[#E6E8EB] border border-[#30343C]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-lg bg-[#101114] border border-[#30343C]/80 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#7AA2F7] font-semibold uppercase">
          <Database className="w-3.5 h-3.5" />
          <span>Database & Messaging</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {stack.databaseAndMessaging.map((item) => (
            <span
              key={item}
              className="text-xs font-mono px-2 py-0.5 rounded bg-[#17191D] text-[#E6E8EB] border border-[#30343C]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-lg bg-[#101114] border border-[#30343C]/80 space-y-1.5">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#E5C07B] font-semibold uppercase">
          <Wrench className="w-3.5 h-3.5" />
          <span>Infrastructure & Testing</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {stack.infrastructureAndTesting.map((item) => (
            <span
              key={item}
              className="text-xs font-mono px-2 py-0.5 rounded bg-[#17191D] text-[#E6E8EB] border border-[#30343C]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
