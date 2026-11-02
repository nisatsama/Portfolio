import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalInput } from "./TerminalInput";
import { CommandSuggestions } from "./CommandSuggestions";
import { parseAndExecuteCommand } from "../utils/commandParser";
import { TerminalEntry } from "../types/terminal";
import { WhoamiOutput } from "./sections/WhoamiOutput";
import { TerminalPrompt } from "./TerminalPrompt";
import { FastForward } from "lucide-react";

export interface TerminalWindowRef {
  runCommand: (cmd: string) => void;
  clear: () => void;
}

export const TerminalWindow = forwardRef<TerminalWindowRef, {}>((_, ref) => {
  const [history, setHistory] = useState<string[]>([]);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [currentPath, setCurrentPath] = useState("~");
  const [isBooting, setIsBooting] = useState(true);
  const [bootStep, setBootStep] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal when entries change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries, bootStep]);

  // Initial boot sequence
  useEffect(() => {
    const hasBooted = sessionStorage.getItem("nisat_term_booted");
    if (hasBooted) {
      skipBoot();
      return;
    }

    const t1 = setTimeout(() => setBootStep(1), 250);
    const t2 = setTimeout(() => setBootStep(2), 650);
    const t3 = setTimeout(() => setBootStep(3), 1100);
    const t4 = setTimeout(() => {
      setBootStep(4);
      setIsBooting(false);
      sessionStorage.setItem("nisat_term_booted", "true");
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const skipBoot = () => {
    setIsBooting(false);
    setBootStep(4);
    sessionStorage.setItem("nisat_term_booted", "true");
  };

  const handleExecute = (commandText: string) => {
    if (!commandText.trim()) return;

    // If still in boot sequence, finish immediately
    if (isBooting) {
      skipBoot();
    }

    const trimmed = commandText.trim();
    setHistory((prev) => [...prev, trimmed]);

    const result = parseAndExecuteCommand(trimmed, currentPath, {
      onRunCommand: handleExecute,
      history: [...history, trimmed],
    });

    if (result.isClear) {
      setEntries([]);
      return;
    }

    if (result.newPath) {
      setCurrentPath(result.newPath);
    }

    const newEntry: TerminalEntry = {
      id: `${Date.now()}-${Math.random()}`,
      command: trimmed,
      timestamp: new Date(),
      output: result.output,
    };

    setEntries((prev) => [...prev, newEntry]);
  };

  useImperativeHandle(ref, () => ({
    runCommand: (cmd: string) => {
      handleExecute(cmd);
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    clear: () => setEntries([]),
  }));

  return (
    <div
      ref={containerRef}
      className={`w-full transition-all duration-300 mx-auto ${
        isMaximized
          ? "fixed inset-2 sm:inset-4 z-50 flex flex-col h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)]"
          : "max-w-5xl rounded-xl shadow-2xl"
      }`}
    >
      <div className="bg-[#17191D] rounded-xl border border-[#30343C] overflow-hidden flex flex-col h-full terminal-glow">
        {/* Terminal Header */}
        <TerminalHeader
          isMaximized={isMaximized}
          onToggleMaximize={() => setIsMaximized((prev) => !prev)}
          onClear={() => setEntries([])}
          currentPath={currentPath}
        />

        {/* Terminal Body */}
        <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto max-h-[70vh] sm:max-h-[75vh] flex flex-col font-mono text-xs sm:text-sm">
          {/* Boot Sequence */}
          <div className="space-y-1.5 text-[#A0A7B2] pb-3 border-b border-[#30343C]/60">
            <div className="text-[#747C87] text-[11px] sm:text-xs">
              Last login: {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} on ttys001
            </div>

            {bootStep >= 1 && (
              <div className="space-y-0.5 text-xs text-[#7AA2F7]">
                <div>Initializing nisat.dev environment...</div>
                <div>Loading Java 21 runtime & Spring Boot registry...</div>
                <div>Mounting distributed projects catalog...</div>
              </div>
            )}

            {bootStep >= 2 && (
              <div className="text-xs text-[#7EE787] font-semibold">
                ✓ Environment ready.
              </div>
            )}

            {bootStep >= 3 && (
              <div className="pt-2 space-y-1">
                <div className="flex items-center gap-2">
                  <TerminalPrompt path="~" />
                  <span className="text-[#E6E8EB] font-semibold">whoami</span>
                </div>
                <div className="pt-1">
                  <WhoamiOutput />
                </div>
              </div>
            )}

            {isBooting && (
              <div className="pt-2 flex items-center justify-between text-xs text-[#747C87]">
                <span className="animate-pulse">Loading developer workstation...</span>
                <button
                  onClick={skipBoot}
                  className="flex items-center gap-1 text-[#7EE787] hover:underline"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>skip boot sequence</span>
                </button>
              </div>
            )}
          </div>

          {/* Interactive Entries History */}
          <div className="space-y-4 pt-3 flex-1">
            {entries.map((entry) => (
              <div key={entry.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <TerminalPrompt path={currentPath} />
                  <span className="text-[#E6E8EB] font-semibold">{entry.command}</span>
                </div>
                {entry.output && (
                  <div className="pl-1 sm:pl-2 text-[#E6E8EB] transition-opacity duration-200">
                    {entry.output}
                  </div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Active Terminal Input */}
          {!isBooting && (
            <div className="mt-4 pt-2">
              <TerminalInput
                onExecute={handleExecute}
                history={history}
                currentPath={currentPath}
              />
            </div>
          )}

          {/* Bottom Command Suggestions */}
          {!isBooting && (
            <div className="mt-3">
              <CommandSuggestions onRunCommand={handleExecute} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

TerminalWindow.displayName = "TerminalWindow";
