import React from "react";
import { projects, Project } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { Terminal, Filter, Layers, Database, Sparkles } from "lucide-react";

export type ProjectFilterType = "all" | "featured" | "fullstack" | "additional";

interface ProjectsSectionProps {
  filter?: ProjectFilterType;
  onOpenProject: (projectName: string) => void;
  onRunCommand?: (cmd: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  filter = "all",
  onOpenProject,
  onRunCommand,
}) => {
  const displayedProjects = projects.filter((p) => {
    if (filter === "featured") return p.group === "primary";
    if (filter === "fullstack") return p.group === "fullstack";
    if (filter === "additional") return p.group === "additional";
    return true; // "all"
  });

  const primaryProjects = displayedProjects.filter((p) => p.group === "primary");
  const fullstackProjects = displayedProjects.filter((p) => p.group === "fullstack");
  const additionalProjects = displayedProjects.filter((p) => p.group === "additional");

  return (
    <div className="font-mono text-xs sm:text-sm space-y-6 py-2 text-[#E6E8EB] max-w-4xl">
      {/* Terminal Directory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#30343C]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#7EE787]" />
          <span className="text-[#7EE787] font-semibold">~/projects $ ls -la</span>
          <span className="text-[#747C87] text-xs">
            ({displayedProjects.length} repositories)
          </span>
        </div>

        {/* Category Filters (Interactive Command Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => onRunCommand?.("projects")}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === "all"
                ? "bg-[#1E2127] text-[#7EE787] border border-[#7EE787]/50 font-semibold"
                : "text-[#A0A7B2] hover:text-[#E6E8EB] border border-[#30343C]"
            }`}
            title="Display all projects: projects"
          >
            [all (6)]
          </button>

          <button
            onClick={() => onRunCommand?.("projects --featured")}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === "featured"
                ? "bg-[#1E2127] text-[#7EE787] border border-[#7EE787]/50 font-semibold"
                : "text-[#A0A7B2] hover:text-[#7EE787] border border-[#30343C]"
            }`}
            title="Display primary backend: projects --featured"
          >
            [--featured (3)]
          </button>

          <button
            onClick={() => onRunCommand?.("projects --fullstack")}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === "fullstack"
                ? "bg-[#1E2127] text-[#7AA2F7] border border-[#7AA2F7]/50 font-semibold"
                : "text-[#A0A7B2] hover:text-[#7AA2F7] border border-[#30343C]"
            }`}
            title="Display fullstack: projects --fullstack"
          >
            [--fullstack (2)]
          </button>

          <button
            onClick={() => onRunCommand?.("projects --additional")}
            className={`px-2 py-0.5 rounded transition-colors ${
              filter === "additional"
                ? "bg-[#1E2127] text-[#B4A0F7] border border-[#B4A0F7]/50 font-semibold"
                : "text-[#A0A7B2] hover:text-[#B4A0F7] border border-[#30343C]"
            }`}
            title="Display additional work: projects --additional"
          >
            [--additional (1)]
          </button>
        </div>
      </div>

      {/* Group 1: Primary Java & Distributed Backend Engineering */}
      {primaryProjects.length > 0 && (
        <section className="space-y-3.5" aria-label="Primary Java Backend Projects">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7EE787] uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>Primary Java & Distributed Backend Engineering</span>
            </div>
            <span className="text-[10px] text-[#747C87]">Core Specialization</span>
          </div>

          <div className="space-y-3.5">
            {primaryProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={onOpenProject}
                onRunCommand={onRunCommand}
              />
            ))}
          </div>
        </section>
      )}

      {/* Group 2: Selected Full-Stack & Real-Time Projects */}
      {fullstackProjects.length > 0 && (
        <section className="space-y-3.5 pt-2" aria-label="Selected Full-Stack Projects">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#7AA2F7] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Full-Stack & Real-Time Projects</span>
            </div>
            <span className="text-[10px] text-[#747C87]">Collaborative Systems</span>
          </div>

          <div className="space-y-3.5">
            {fullstackProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={onOpenProject}
                onRunCommand={onRunCommand}
              />
            ))}
          </div>
        </section>
      )}

      {/* Group 3: Additional Evaluated Work */}
      {additionalProjects.length > 0 && (
        <section className="space-y-3.5 pt-2" aria-label="Additional Evaluated Work">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B4A0F7] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Additional Evaluated Work</span>
            </div>
            <span className="text-[10px] text-[#747C87]">Verified Live Deployment</span>
          </div>

          <div className="space-y-3.5">
            {additionalProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={onOpenProject}
                onRunCommand={onRunCommand}
              />
            ))}
          </div>
        </section>
      )}

      {/* Terminal Help Navigation Footer */}
      <div className="text-xs text-[#747C87] pt-3 border-t border-[#30343C]/60 flex flex-wrap items-center justify-between gap-2">
        <span>
          Inspection syntax: <span className="text-[#7EE787]">open &lt;project-name&gt;</span> (e.g.{" "}
          <button
            onClick={() => onOpenProject("HookForge")}
            className="text-[#E6E8EB] underline hover:text-[#7EE787]"
          >
            open HookForge
          </button>
          ) or append <span className="text-[#7AA2F7]">--architecture</span>
        </span>
      </div>
    </div>
  );
};
