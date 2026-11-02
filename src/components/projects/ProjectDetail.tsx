import React, { useEffect, useRef } from "react";
import { Project } from "../../data/projects";
import { ProjectTechStack } from "./ProjectTechStack";
import { ProjectEngineeringNotes } from "./ProjectEngineeringNotes";
import { ProjectArchitecture } from "./ProjectArchitecture";
import {
  ArrowLeft,
  FolderGit2,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
} from "lucide-react";

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
  onRunCommand?: (cmd: string) => void;
  initialSection?: "all" | "architecture";
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  onBack,
  onRunCommand,
  initialSection = "all",
}) => {
  const archRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSection === "architecture") {
      setTimeout(() => {
        archRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [initialSection]);

  const isPrimary = project.group === "primary";

  return (
    <div className="font-mono text-xs sm:text-sm space-y-6 py-2 text-[#E6E8EB] max-w-4xl">
      {/* 1. Header & Navigation breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#30343C]">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-[#7EE787] hover:underline self-start sm:self-auto group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>cd .. / return to projects (Esc)</span>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              archRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 text-xs text-[#E6E8EB] hover:text-[#7EE787] bg-[#1E2127] px-2.5 py-1 rounded border border-[#30343C] transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#7EE787]" />
            <span className="hidden sm:inline">Architecture</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#E6E8EB] hover:text-[#7EE787] bg-[#1E2127] px-2.5 py-1 rounded border border-[#30343C] transition-colors"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#A0A7B2]" />
            <span>View Source Code</span>
            <ExternalLink className="w-3 h-3 text-[#747C87]" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#101114] bg-[#7EE787] font-semibold px-2.5 py-1 rounded transition-colors hover:bg-[#7EE787]/90"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Project Title & Identity Lockup */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#747C87]">
            {project.number}.
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#E6E8EB]">
            {project.name}
          </h2>

          {project.isFlagship && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7EE787]/15 text-[#7EE787] border border-[#7EE787]/30 font-semibold">
              FLAGSHIP BACKEND
            </span>
          )}

          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E2127] text-[#7AA2F7] border border-[#30343C]">
            {project.category}
          </span>
        </div>

        <div className="text-sm text-[#A0A7B2] font-sans font-medium">
          {project.title}
        </div>
      </div>

      {/* A. Project Overview & Context */}
      <div className="space-y-3">
        <div className="p-4 rounded-xl bg-[#17191D] border border-[#30343C] space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7EE787]">
            <Cpu className="w-4 h-4 text-[#7EE787]" />
            <span>Project Overview</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#E6E8EB] leading-relaxed">
            {project.tagline}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-[#101114] border border-[#30343C]/80 space-y-1">
              <span className="text-[11px] font-semibold text-[#E5C07B] uppercase tracking-wider block">
                Problem Being Solved:
              </span>
              <p className="font-sans text-xs text-[#A0A7B2] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#101114] border border-[#30343C]/80 space-y-1">
              <span className="text-[11px] font-semibold text-[#7AA2F7] uppercase tracking-wider block">
                Engineering Rationale / Why Built:
              </span>
              <p className="font-sans text-xs text-[#A0A7B2] leading-relaxed">
                {project.whyBuilt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* B. Technology Stack Grouped */}
      <div className="p-4 rounded-xl bg-[#17191D] border border-[#30343C] space-y-2">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7AA2F7]">
            <Layers className="w-4 h-4" />
            <span>Technology Stack Architecture</span>
          </div>
          <span className="text-[10px] text-[#747C87]">
            Grouped by Responsibility
          </span>
        </div>
        <ProjectTechStack stack={project.stack} variant="grouped" />
      </div>

      {/* C. Verified Implemented Capabilities */}
      <div className="p-4 rounded-xl bg-[#17191D] border border-[#30343C] space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#30343C]/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7EE787]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified Implemented Capabilities</span>
          </div>
          <span className="text-[10px] text-[#747C87]">
            {project.verifiedCapabilities.length} Confirmed Features
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-1">
          {project.verifiedCapabilities.map((cap, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2 rounded bg-[#101114]/60 border border-[#30343C]/40 text-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7EE787] shrink-0 mt-0.5" />
              <span className="font-sans text-[#E6E8EB] leading-relaxed">
                {cap}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* E. Architecture Visualization */}
      <div ref={archRef} className="pt-1">
        <ProjectArchitecture architecture={project.architectureDiagram} />
      </div>

      {/* D. Engineering Notes (Expandable) */}
      <div className="pt-1">
        <ProjectEngineeringNotes notes={project.engineeringNotes} defaultExpanded={true} />
      </div>

      {/* F. Action Footer */}
      <div className="p-4 rounded-xl bg-[#17191D] border border-[#30343C] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="text-[#E6E8EB] font-semibold">
            Repository: {project.name}
          </div>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7EE787] hover:underline truncate block max-w-sm sm:max-w-md"
          >
            {project.githubUrl}
          </a>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onRunCommand?.(`ask "Tell me about ${project.name}"`)}
            className="px-3 py-1.5 rounded-lg bg-[#1E2127] text-[#B4A0F7] hover:bg-[#B4A0F7]/15 border border-[#B4A0F7]/40 transition-colors flex items-center gap-1.5 font-mono text-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Assistant</span>
          </button>

          <button
            onClick={onBack}
            className="px-3 py-1.5 rounded-lg bg-[#1E2127] text-[#A0A7B2] hover:text-[#E6E8EB] border border-[#30343C] transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </div>
    </div>
  );
};
