import React from "react";

interface TerminalPromptProps {
  path?: string;
  user?: string;
  host?: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  path = "~",
  user = "nisat",
  host = "macbook-pro",
}) => {
  return (
    <span className="font-mono text-sm inline-flex items-center gap-1.5 select-none shrink-0 font-medium">
      <span className="text-[#7AA2F7]">{user}@{host}</span>
      <span className="text-[#A0A7B2]">{path}</span>
      <span className="text-[#7EE787] font-semibold">%</span>
    </span>
  );
};
