import React from "react";
import { Terminal, Maximize2, Minimize2, Sparkles } from "lucide-react";

interface TerminalHeaderProps {
  title?: string;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  onClear?: () => void;
  currentPath?: string;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  title = "nisat@macbook-pro — zsh — portfolio",
  isMaximized = false,
  onToggleMaximize,
  onClear,
  currentPath = "~",
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#17191D] border-b border-[#30343C] select-none rounded-t-xl">
      {/* macOS Window Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          title="Clear Terminal Output"
          className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 border border-[#E0443E] transition-transform active:scale-90 flex items-center justify-center group"
          aria-label="Close / Clear terminal"
        >
          <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#4A0000] font-bold leading-none">
            ✕
          </span>
        </button>
        <button
          onClick={onClear}
          title="Reset View"
          className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 border border-[#DEA123] transition-transform active:scale-90 flex items-center justify-center group"
          aria-label="Minimize / Reset"
        >
          <span className="opacity-0 group-hover:opacity-100 text-[8px] text-[#543500] font-bold leading-none">
            –
          </span>
        </button>
        <button
          onClick={onToggleMaximize}
          title={isMaximized ? "Restore Window" : "Maximize Window"}
          className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 border border-[#1AAB29] transition-transform active:scale-90 flex items-center justify-center group"
          aria-label="Maximize window"
        >
          <span className="opacity-0 group-hover:opacity-100 text-[7px] text-[#00380B] font-bold leading-none">
            {isMaximized ? "↙" : "↗"}
          </span>
        </button>
      </div>

      {/* Center Window Title */}
      <div className="flex items-center gap-2 text-xs font-mono text-[#A0A7B2] truncate max-w-[65%] sm:max-w-md">
        <Terminal className="w-3.5 h-3.5 text-[#7EE787] shrink-0" />
        <span className="truncate">{title}</span>
        <span className="hidden sm:inline-block text-[#747C87]">({currentPath})</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 text-xs text-[#747C87]">
        <span className="hidden md:inline font-mono text-[11px] text-[#7EE787]/80 bg-[#1E2127] px-2 py-0.5 rounded border border-[#30343C]">
          Java 21 · zsh
        </span>
        {onToggleMaximize && (
          <button
            onClick={onToggleMaximize}
            className="p-1 hover:text-[#E6E8EB] transition-colors rounded hover:bg-[#1E2127]"
            title={isMaximized ? "Restore size" : "Expand size"}
            aria-label="Toggle window size"
          >
            {isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
