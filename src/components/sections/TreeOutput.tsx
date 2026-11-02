import React from "react";

interface TreeOutputProps {
  onRunCommand?: (cmd: string) => void;
}

export const TreeOutput: React.FC<TreeOutputProps> = ({ onRunCommand }) => {
  return (
    <pre className="font-mono text-xs sm:text-sm text-[#A0A7B2] leading-relaxed py-1">
      <span className="text-[#7EE787]">.</span>
      <br />
      ├── <button onClick={() => onRunCommand?.("about")} className="text-[#7AA2F7] hover:underline">about</button>
      <br />
      ├── <button onClick={() => onRunCommand?.("education")} className="text-[#7AA2F7] hover:underline">education</button>
      <br />
      ├── <button onClick={() => onRunCommand?.("experience")} className="text-[#7AA2F7] hover:underline">experience</button>
      <br />
      ├── <button onClick={() => onRunCommand?.("projects")} className="text-[#7EE787] hover:underline">projects</button>
      <br />
      │   ├── <button onClick={() => onRunCommand?.("open HookForge")} className="text-[#E6E8EB] hover:underline hover:text-[#7EE787]">HookForge</button>
      <br />
      │   ├── <button onClick={() => onRunCommand?.("open ShelfSense")} className="text-[#E6E8EB] hover:underline hover:text-[#7EE787]">ShelfSense</button>
      <br />
      │   ├── <button onClick={() => onRunCommand?.("open SupportFlow")} className="text-[#E6E8EB] hover:underline hover:text-[#7EE787]">SupportFlow</button>
      <br />
      │   ├── <button onClick={() => onRunCommand?.("open CodeCollab")} className="text-[#E6E8EB] hover:underline hover:text-[#7EE787]">CodeCollab</button>
      <br />
      │   ├── <button onClick={() => onRunCommand?.("open Travelogia")} className="text-[#E6E8EB] hover:underline hover:text-[#7EE787]">Travelogia</button>
      <br />
      │   └── <button onClick={() => onRunCommand?.("open AIResumeAnalyser")} className="text-[#E6E8EB] hover:underline hover:text-[#B4A0F7]">AIResumeAnalyser</button>
      <br />
      ├── <button onClick={() => onRunCommand?.("opensource")} className="text-[#7AA2F7] hover:underline">opensource</button>
      <br />
      ├── <button onClick={() => onRunCommand?.("achievements")} className="text-[#7AA2F7] hover:underline">achievements</button>
      <br />
      ├── <button onClick={() => onRunCommand?.("certifications")} className="text-[#7AA2F7] hover:underline">certifications</button>
      <br />
      └── <button onClick={() => onRunCommand?.("contact")} className="text-[#7AA2F7] hover:underline">contact</button>
      <br />
      <span className="text-[#747C87] text-[11px] block mt-2">
        8 directories, 6 project repositories
      </span>
    </pre>
  );
};
