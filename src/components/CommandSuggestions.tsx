import React from "react";
import { Sparkles, Terminal } from "lucide-react";

interface CommandSuggestionsProps {
  onRunCommand: (command: string) => void;
  currentInput?: string;
}

export const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  onRunCommand,
  currentInput = "",
}) => {
  const primarySuggestions = [
    { label: "whoami", cmd: "whoami", desc: "Identity" },
    { label: "projects", cmd: "projects", desc: "Showcase" },
    { label: "skills", cmd: "skills", desc: "Stack" },
    { label: "open HookForge", cmd: "open HookForge", desc: "Flagship" },
    { label: "experience", cmd: "experience", desc: "Internship" },
    { label: "education", cmd: "education", desc: "Adamas Univ" },
    { label: "opensource", cmd: "opensource", desc: "PR #65" },
    { label: "achievements", cmd: "achievements", desc: "Flipkart/SIH" },
    { label: "contact", cmd: "contact", desc: "Reach out" },
    { label: "neofetch", cmd: "neofetch", desc: "System info" },
    { label: "ask assistant", cmd: "ask \"Tell me about HookForge\"", desc: "Gemini", isAi: true },
    { label: "help", cmd: "help", desc: "All cmds" },
  ];

  return (
    <div className="pt-2 pb-1 border-t border-[#30343C]/60 select-none">
      <div className="flex items-center justify-between text-[11px] font-mono text-[#747C87] mb-1.5 px-0.5">
        <span className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-[#7EE787]" />
          <span>Quick actions & touch shortcuts:</span>
        </span>
        <span className="hidden sm:inline text-[10px]">Tap to execute immediately</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
        {primarySuggestions.map((item) => (
          <button
            key={item.label}
            onClick={() => onRunCommand(item.cmd)}
            className={`font-mono text-xs px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 shrink-0 ${
              item.isAi
                ? "bg-[#1E2127] text-[#B4A0F7] border border-[#B4A0F7]/40 hover:bg-[#B4A0F7]/15 hover:border-[#B4A0F7]"
                : "bg-[#17191D] text-[#A0A7B2] border border-[#30343C] hover:text-[#7EE787] hover:border-[#7EE787]/50 hover:bg-[#1E2127]"
            }`}
            title={`Run command: ${item.cmd}`}
          >
            {item.isAi && <Sparkles className="w-3 h-3 text-[#B4A0F7]" />}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
