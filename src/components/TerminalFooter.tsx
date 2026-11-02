import React from "react";
import { profile } from "../data/profile";
import { TerminalPrompt } from "./TerminalPrompt";
import { Github, Linkedin, Mail } from "lucide-react";

export const TerminalFooter: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto pt-8 pb-12 font-mono text-xs text-[#747C87]">
      <div className="p-4 sm:p-5 rounded-xl bg-[#17191D]/60 border border-[#30343C]/60 space-y-3">
        <div className="flex items-center gap-2">
          <TerminalPrompt path="~" />
          <span className="text-[#E6E8EB]">echo "Thanks for exploring my work."</span>
        </div>

        <div className="text-xs text-[#A0A7B2] leading-relaxed">
          Built with curiosity, code, and care for distributed reliability.
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#30343C]/60 text-[11px]">
          <div>
            © 2026 {profile.name} · Connection: <span className="text-[#7EE787]">Open for software engineering opportunities</span>
          </div>

          <div className="flex items-center gap-4 text-[#A0A7B2]">
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7EE787] flex items-center gap-1 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-[#30343C]">·</span>
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7AA2F7] flex items-center gap-1 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span className="text-[#30343C]">·</span>
            <a
              href={`mailto:${profile.contact.email}`}
              className="hover:text-[#E6E8EB] flex items-center gap-1 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
