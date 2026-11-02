import React from "react";
import { educationHistory } from "../../data/education";
import { GraduationCap } from "lucide-react";

export const EducationOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-4 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex items-center justify-between pb-2 border-b border-[#30343C]">
        <div className="text-sm font-semibold text-[#7EE787] flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#7EE787]" />
          <span>[Academic Background]</span>
        </div>
        <div className="text-xs text-[#747C87]">Verified Academic Timeline</div>
      </div>

      <div className="space-y-3.5">
        {educationHistory.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-4 rounded-xl bg-[#17191D] border border-[#30343C] space-y-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1.5 border-b border-[#30343C]/60">
              <div>
                <h4 className="text-sm font-bold text-[#E6E8EB]">{edu.institution}</h4>
                <div className="text-xs text-[#7AA2F7] font-semibold">{edu.degree}</div>
              </div>
              <div className="text-xs text-[#747C87] sm:text-right">
                <span className="text-[#7EE787] font-semibold">{edu.metrics}</span>
                <div>{edu.period}</div>
              </div>
            </div>

            {edu.highlights && (
              <ul className="space-y-1 text-xs text-[#A0A7B2] pt-1">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#747C87] select-none">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
