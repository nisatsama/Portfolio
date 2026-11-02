import React from "react";
import { profile } from "../../data/profile";

export const AboutOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-4 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#30343C]">
        <div className="text-sm font-semibold text-[#7EE787]">
          [Engineering Profile] · Nisat Sama
        </div>
        <div className="text-xs text-[#747C87]">
          {profile.location} · B.Tech CSE (Adamas Univ)
        </div>
      </div>

      <div className="space-y-2.5 text-[#A0A7B2] leading-relaxed">
        {profile.detailedBio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div className="p-3 rounded-lg bg-[#1E2127]/80 border border-[#30343C]">
          <div className="text-[#7EE787] text-xs font-semibold mb-1">
            01. Core Architecture Focus
          </div>
          <div className="text-xs text-[#A0A7B2] space-y-1">
            <div>• Backend design & REST API reliability</div>
            <div>• Event streaming with Apache Kafka</div>
            <div>• Relational integrity & transactional boundaries</div>
            <div>• Concurrency control & idempotent processing</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#1E2127]/80 border border-[#30343C]">
          <div className="text-[#7AA2F7] text-xs font-semibold mb-1">
            02. Engineering Identity
          </div>
          <div className="text-xs text-[#A0A7B2] space-y-1">
            <div>• Primary: Java Backend Engineering (Java 21, Spring Boot)</div>
            <div>• Secondary: Full-Stack Web Products (React, Node.js)</div>
            <div>• Academics: Adamas University (CGPA: 8.77 / 10.0)</div>
            <div>• Graduation: May 2028 (Undergraduate)</div>
          </div>
        </div>
      </div>

      <div className="text-xs text-[#747C87] pt-1">
        Type <span className="text-[#7EE787] font-semibold">projects</span> to inspect primary backend systems, or <span className="text-[#7EE787] font-semibold">skills</span> for the full technical stack.
      </div>
    </div>
  );
};
