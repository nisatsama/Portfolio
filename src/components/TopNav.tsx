import React from "react";
import { profile } from "../data/profile";
import { Terminal, Send } from "lucide-react";

interface TopNavProps {
  onNavClick: (cmd: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onNavClick }) => {
  return (
    <header className="w-full border-b border-[#30343C]/80 bg-[#101114]/90 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavClick("whoami")}
          className="text-base sm:text-lg font-bold tracking-tight text-[#E6E8EB] hover:text-[#7EE787] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="text-[#7EE787] font-mono text-sm sm:text-base">›_</span>
          <span>{profile.name}</span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-mono text-[#A0A7B2]">
          <button
            onClick={() => onNavClick("projects")}
            className="hover:text-[#7EE787] transition-colors whitespace-nowrap shrink-0 hover:underline"
          >
            Projects
          </button>
          <button
            onClick={() => onNavClick("skills")}
            className="hover:text-[#7EE787] transition-colors whitespace-nowrap shrink-0 hover:underline"
          >
            Skills
          </button>
          <button
            onClick={() => onNavClick("experience")}
            className="hover:text-[#7EE787] transition-colors whitespace-nowrap shrink-0 hover:underline"
          >
            Experience
          </button>
          <button
            onClick={() => onNavClick("education")}
            className="hover:text-[#7EE787] transition-colors whitespace-nowrap shrink-0 hover:underline"
          >
            Education
          </button>
          <button
            onClick={() => onNavClick("opensource")}
            className="hover:text-[#7EE787] transition-colors whitespace-nowrap shrink-0 hover:underline"
          >
            Open Source
          </button>
          <button
            onClick={() => onNavClick("contact")}
            className="hover:text-[#7EE787] transition-colors whitespace-nowrap shrink-0 hover:underline"
          >
            Contact
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`mailto:${profile.contact.email}`}
            className="px-3.5 py-1.5 text-xs font-mono font-medium text-[#101114] bg-[#7EE787] rounded-lg hover:bg-[#7EE787]/90 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Connect</span>
          </a>
        </div>
      </div>
    </header>
  );
};
