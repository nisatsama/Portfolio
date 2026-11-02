import React from "react";
import { experiences } from "../../data/experience";
import { Briefcase } from "lucide-react";

export const ExperienceOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-4 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex items-center justify-between pb-2 border-b border-[#30343C]">
        <div className="text-sm font-semibold text-[#7EE787] flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[#7EE787]" />
          <span>[Professional Experience]</span>
        </div>
        <div className="text-xs text-[#747C87]">Industry Internship</div>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-xl bg-[#17191D] border border-[#30343C] space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#30343C]/60">
              <div>
                <h4 className="text-sm font-bold text-[#E6E8EB]">{exp.role}</h4>
                <div className="text-xs text-[#7EE787] font-semibold">{exp.company}</div>
              </div>
              <div className="text-xs text-[#747C87] sm:text-right">
                <div>{exp.period}</div>
                <div>{exp.location} · {exp.type}</div>
              </div>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] uppercase tracking-wider text-[#747C87]">
                Key Responsibilities & Deliverables:
              </div>
              <ul className="space-y-1.5 text-xs text-[#A0A7B2]">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7EE787] select-none font-bold">›</span>
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-[#747C87] pt-1">
        * Documented verified engineering internships only.
      </div>
    </div>
  );
};
