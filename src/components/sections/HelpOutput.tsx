import React from "react";

interface HelpOutputProps {
  onRunCommand?: (cmd: string) => void;
}

export const HelpOutput: React.FC<HelpOutputProps> = ({ onRunCommand }) => {
  const commands = [
    { name: "whoami", desc: "Identity & professional summary" },
    { name: "about", desc: "Personal background & engineering philosophy" },
    { name: "skills", desc: "Categorized technical capabilities & tools" },
    { name: "projects", desc: "Explore all 6 engineering repositories" },
    { name: "projects --featured", desc: "Filter to 3 primary Java/Kafka backend projects" },
    { name: "projects --fullstack", desc: "Filter to collaborative full-stack systems" },
    { name: "projects --additional", desc: "Filter to evaluated AI integration work" },
    { name: "open <project>", desc: "Deep architectural dive into a project (e.g. open HookForge)" },
    { name: "open <project> --architecture", desc: "Directly open architecture topology" },
    { name: "experience", desc: "Professional web development internship" },
    { name: "education", desc: "Adamas University & academic milestones" },
    { name: "opensource", desc: "Verified upstream contribution (Pugdom v2 PR #65)" },
    { name: "achievements", desc: "Flipkart GRiD 8.0, SIH 2026, and hackathons" },
    { name: "certifications", desc: "AWS, Azure, and Spring credentials" },
    { name: "contact", desc: "Direct email, phone, and location" },
    { name: "socials", desc: "GitHub and LinkedIn profiles" },
    { name: "ask <question>", desc: "Query the Gemini assistant about Nisat's projects" },
    { name: "resume", desc: "Resume availability status" },
    { name: "neofetch", desc: "Developer system profile summary" },
    { name: "ls", desc: "List directory structure" },
    { name: "tree", desc: "Display visual directory tree" },
    { name: "pwd", desc: "Print current working directory" },
    { name: "date", desc: "Print current system date & time" },
    { name: "clear", desc: "Clear terminal buffer" },
    { name: "history", desc: "View executed commands" },
    { name: "exit", desc: "Session close message" },
  ];

  return (
    <div className="font-mono text-xs sm:text-sm space-y-3 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="text-xs text-[#7EE787] font-semibold border-b border-[#30343C] pb-1.5">
        Available Terminal Commands:
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
        {commands.map((cmd) => (
          <div
            key={cmd.name}
            className="flex items-baseline justify-between gap-3 group"
          >
            <button
              onClick={() => onRunCommand?.(cmd.name.startsWith("open") ? "open HookForge" : cmd.name.startsWith("ask") ? "ask \"Tell me about HookForge\"" : cmd.name)}
              className="text-[#7EE787] group-hover:underline text-left font-semibold shrink-0"
              title={`Execute ${cmd.name}`}
            >
              {cmd.name}
            </button>
            <span className="text-right text-[#747C87] text-[11px] truncate">
              {cmd.desc}
            </span>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-[#747C87] pt-2 border-t border-[#30343C]/60">
        Navigation tip: Use <kbd className="px-1 py-0.5 rounded bg-[#1E2127] border border-[#30343C] text-[#E6E8EB]">↑</kbd> and <kbd className="px-1 py-0.5 rounded bg-[#1E2127] border border-[#30343C] text-[#E6E8EB]">↓</kbd> for command history, <kbd className="px-1 py-0.5 rounded bg-[#1E2127] border border-[#30343C] text-[#E6E8EB]">Tab</kbd> for autocompletion, or click any command above.
      </div>
    </div>
  );
};
