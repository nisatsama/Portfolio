import React, { useState, useEffect, useRef } from "react";
import { TerminalPrompt } from "./TerminalPrompt";

interface TerminalInputProps {
  onExecute: (command: string) => void;
  history: string[];
  currentPath?: string;
  isBusy?: boolean;
}

const AVAILABLE_COMMANDS = [
  "help",
  "whoami",
  "about",
  "skills",
  "projects",
  "projects --featured",
  "projects --fullstack",
  "projects --additional",
  "experience",
  "education",
  "opensource",
  "achievements",
  "certifications",
  "contact",
  "socials",
  "resume",
  "neofetch",
  "pwd",
  "ls",
  "tree",
  "date",
  "clear",
  "history",
  "exit",
  "open HookForge",
  "open HookForge --architecture",
  "open ShelfSense",
  "open ShelfSense --architecture",
  "open SupportFlow",
  "open CodeCollab",
  "open Travelogia",
  "open AIResumeAnalyser",
  "ask",
];

export const TerminalInput: React.FC<TerminalInputProps> = ({
  onExecute,
  history,
  currentPath = "~",
  isBusy = false,
}) => {
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus terminal input on mount and clicks
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inputVal.trim();
      if (trimmed || trimmed === "") {
        onExecute(trimmed);
        setInputVal("");
        setHistoryIndex(null);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(history[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((cmd) =>
        cmd.toLowerCase().startsWith(current)
      );
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div
      className="flex items-center gap-2 pt-2 pb-1 font-mono text-xs sm:text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <TerminalPrompt path={currentPath} />

      <div className="relative flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isBusy}
          aria-label="Terminal command input"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder={isBusy ? "Processing..." : "Type a command or 'help'..."}
          className="w-full bg-transparent text-[#E6E8EB] outline-none border-none placeholder-[#747C87]/60 caret-transparent font-mono text-xs sm:text-sm"
        />

        {/* Custom Terminal Block Cursor */}
        <span
          className="inline-block w-2 sm:w-2.5 h-4 bg-[#7EE787] animate-term-cursor select-none pointer-events-none"
          style={{
            position: "absolute",
            left: `${inputVal.length * 8.2}px`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
