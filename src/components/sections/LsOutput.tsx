import React from "react";

interface LsOutputProps {
  onRunCommand?: (cmd: string) => void;
  showAll?: boolean;
}

export const LsOutput: React.FC<LsOutputProps> = ({ onRunCommand, showAll }) => {
  const dirs = [
    "about",
    "projects",
    "experience",
    "education",
    "opensource",
    "achievements",
    "certifications",
    "contact",
  ];

  if (showAll) {
    return (
      <div className="font-mono text-xs sm:text-sm text-[#A0A7B2] space-y-1 py-1">
        <div className="text-[#747C87] text-[11px]">total 32</div>
        <div className="grid grid-cols-[100px_40px_60px_60px_1fr] gap-x-3 text-[#747C87]">
          <span>drwxr-xr-x</span>
          <span>4</span>
          <span>nisat</span>
          <span>staff</span>
          <span className="text-[#7EE787]">.</span>
        </div>
        <div className="grid grid-cols-[100px_40px_60px_60px_1fr] gap-x-3 text-[#747C87]">
          <span>drwxr-xr-x</span>
          <span>12</span>
          <span>nisat</span>
          <span>staff</span>
          <span className="text-[#7EE787]">..</span>
        </div>
        {dirs.map((dir) => (
          <div
            key={dir}
            className="grid grid-cols-[100px_40px_60px_60px_1fr] gap-x-3"
          >
            <span className="text-[#747C87]">drwxr-xr-x</span>
            <span className="text-[#747C87]">2</span>
            <span className="text-[#747C87]">nisat</span>
            <span className="text-[#747C87]">staff</span>
            <button
              onClick={() => onRunCommand?.(dir)}
              className="text-left text-[#7AA2F7] hover:underline hover:text-[#7EE787]"
            >
              {dir}/
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="font-mono text-xs sm:text-sm grid grid-cols-2 sm:grid-cols-4 gap-2 py-1">
      {dirs.map((dir) => (
        <button
          key={dir}
          onClick={() => onRunCommand?.(dir)}
          className="text-left text-[#7AA2F7] hover:text-[#7EE787] hover:underline"
        >
          {dir}/
        </button>
      ))}
    </div>
  );
};
