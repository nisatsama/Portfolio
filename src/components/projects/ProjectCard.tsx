import React from "react";
import { Project } from "../../data/projects";
import { ProjectTechStack } from "./ProjectTechStack";
import { FolderGit2, ExternalLink, Terminal, ArrowUpRight, ShieldCheck } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onOpen: (projectName: string) => void;
  onRunCommand?: (cmd: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpen,
  onRunCommand,
}) => {
  const isPrimary = project.group === "primary";
  const isFlagship = project.isFlagship;

  return (
    <article
      className={`rounded-xl border transition-all duration-200 flex flex-col font-mono text-xs ${
        isFlagship
          ? "bg-[#17191D] border-[#7EE787]/40 hover:border-[#7EE787] shadow-lg shadow-black/40"
          : isPrimary
          ? "bg-[#17191D] border-[#30343C] hover:border-[#7EE787]/50 shadow-sm"
          : project.group === "fullstack"
          ? "bg-[#17191D]/90 border-[#30343C] hover:border-[#7AA2F7]/50"
          : "bg-[#17191D]/80 border-[#30343C]/90 hover:border-[#B4A0F7]/50"
      } p-4 sm:p-5 group`}
    >
      {/* Header: Number, Title, Category Badge, Flagship tag & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-3 border-b border-[#30343C]/80">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[#747C87] text-xs font-mono font-bold">
              {project.number}.
            </span>
            <button
              onClick={() => onOpen(project.name)}
              className="text-base sm:text-lg font-bold text-[#E6E8EB] hover:text-[#7EE787] transition-colors text-left flex items-center gap-1.5"
            >
              <span>{project.name}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#7EE787]" />
            </button>

            {/* Subtle Flagship Indicator */}
            {isFlagship && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7EE787]/15 text-[#7EE787] border border-[#7EE787]/30 font-semibold tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7EE787] animate-pulse" />
                FLAGSHIP PROJECT
              </span>
            )}

            {/* Category Label */}
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${
                isPrimary
                  ? "bg-[#1E2127] text-[#7EE787] border-[#30343C]"
                  : project.group === "fullstack"
                  ? "bg-[#1E2127] text-[#7AA2F7] border-[#30343C]"
                  : "bg-[#1E2127] text-[#B4A0F7] border-[#30343C]"
              }`}
            >
              {project.category}
            </span>
          </div>

          <div className="text-xs text-[#A0A7B2] font-sans">
            {project.title}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
          <button
            onClick={() => onOpen(project.name)}
            className="px-2.5 py-1 text-xs font-mono font-semibold text-[#101114] bg-[#7EE787] rounded hover:bg-[#7EE787]/90 transition-all flex items-center gap-1"
            title={`Run command: open ${project.name}`}
          >
            <Terminal className="w-3 h-3" />
            <span>open</span>
          </button>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-1 text-xs font-mono text-[#E6E8EB] hover:text-[#7EE787] bg-[#1E2127] hover:bg-[#242831] rounded border border-[#30343C] transition-colors flex items-center gap-1.5"
            title="Inspect source code on GitHub"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#A0A7B2]" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 text-[#747C87]" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-1 text-xs font-mono text-[#7AA2F7] hover:underline bg-[#1E2127] hover:bg-[#242831] rounded border border-[#30343C] transition-colors flex items-center gap-1"
              title="Open verified live deployment"
            >
              <span>Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Description & Problem Statement */}
      <div className="py-3 space-y-2">
        <p className="text-xs sm:text-sm font-sans text-[#E6E8EB] leading-relaxed">
          {project.tagline}
        </p>

        <div className="p-2.5 rounded-lg bg-[#101114] border border-[#30343C]/80 text-xs">
          <span className="text-[#E5C07B] font-semibold">Problem: </span>
          <span className="text-[#A0A7B2] font-sans leading-relaxed">
            {project.problemStatement}
          </span>
        </div>
      </div>

      {/* Tech Stack Tags */}
      <div className="py-1">
        <div className="text-[10px] uppercase font-mono text-[#747C87] tracking-wider mb-1">
          Stack
        </div>
        <ProjectTechStack stack={project.stack} variant="compact" />
      </div>

      {/* Implementation Highlights (3-4 points) */}
      <div className="py-2.5 space-y-1.5">
        <div className="text-[10px] uppercase font-mono text-[#747C87] tracking-wider">
          Verified Capabilities
        </div>
        <ul className="space-y-1 text-xs text-[#A0A7B2]">
          {project.implementationHighlights.slice(0, 4).map((hl, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#7EE787] font-mono select-none font-bold">›</span>
              <span className="font-sans leading-relaxed">{hl}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer: Quick CLI shortcut hint */}
      <div className="pt-2 mt-auto border-t border-[#30343C]/60 flex items-center justify-between text-[11px] text-[#747C87]">
        <button
          onClick={() => onOpen(project.name)}
          className="text-[#7EE787] hover:underline flex items-center gap-1 font-mono"
        >
          <span>$ open {project.name}</span>
          <span className="text-[#A0A7B2] text-[10px]">(inspect details)</span>
        </button>

        <button
          onClick={() => onRunCommand?.(`open ${project.name} --architecture`)}
          className="hover:text-[#7AA2F7] transition-colors font-mono hidden sm:inline"
        >
          --architecture
        </button>
      </div>
    </article>
  );
};
