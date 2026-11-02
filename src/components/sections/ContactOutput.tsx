import React from "react";
import { profile } from "../../data/profile";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

export const ContactOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-4 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex items-center justify-between pb-2 border-b border-[#30343C]">
        <div className="text-sm font-semibold text-[#7EE787]">
          [Contact & Communications]
        </div>
        <div className="text-xs text-[#747C87]">Open for Software Engineering Opportunities</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={`mailto:${profile.contact.email}`}
          className="p-3.5 rounded-xl bg-[#17191D] border border-[#30343C] hover:border-[#7EE787] transition-colors flex items-center gap-3 group"
        >
          <div className="p-2 rounded-lg bg-[#1E2127] text-[#7EE787] group-hover:scale-105 transition-transform">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#747C87] uppercase">Email Direct</div>
            <div className="text-xs font-semibold text-[#E6E8EB] group-hover:text-[#7EE787] truncate">
              {profile.contact.email}
            </div>
          </div>
        </a>

        <a
          href={`tel:${profile.contact.phone}`}
          className="p-3.5 rounded-xl bg-[#17191D] border border-[#30343C] hover:border-[#7EE787] transition-colors flex items-center gap-3 group"
        >
          <div className="p-2 rounded-lg bg-[#1E2127] text-[#7EE787] group-hover:scale-105 transition-transform">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#747C87] uppercase">Direct Phone</div>
            <div className="text-xs font-semibold text-[#E6E8EB] group-hover:text-[#7EE787]">
              {profile.contact.formattedPhone}
            </div>
          </div>
        </a>

        <a
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-xl bg-[#17191D] border border-[#30343C] hover:border-[#7AA2F7] transition-colors flex items-center gap-3 group"
        >
          <div className="p-2 rounded-lg bg-[#1E2127] text-[#7AA2F7] group-hover:scale-105 transition-transform">
            <Linkedin className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#747C87] uppercase">LinkedIn Profile</div>
            <div className="text-xs font-semibold text-[#E6E8EB] group-hover:text-[#7AA2F7]">
              linkedin.com/in/nisat-sama
            </div>
          </div>
        </a>

        <a
          href={profile.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-xl bg-[#17191D] border border-[#30343C] hover:border-[#E6E8EB] transition-colors flex items-center gap-3 group"
        >
          <div className="p-2 rounded-lg bg-[#1E2127] text-[#E6E8EB] group-hover:scale-105 transition-transform">
            <Github className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-[#747C87] uppercase">GitHub Repositories</div>
            <div className="text-xs font-semibold text-[#E6E8EB]">
              github.com/nisatsama
            </div>
          </div>
        </a>
      </div>

      <div className="p-3 rounded-lg bg-[#101114] border border-[#30343C] flex items-center justify-between text-xs text-[#A0A7B2]">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#E5C07B]" />
          <span>Location: {profile.location}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#7AA2F7]" />
          <a
            href={profile.contact.domain}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[#E6E8EB]"
          >
            {profile.contact.domain}
          </a>
        </span>
      </div>
    </div>
  );
};
