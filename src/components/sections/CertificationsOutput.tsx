import React from "react";
import { certifications } from "../../data/certifications";
import { ShieldCheck } from "lucide-react";

export const CertificationsOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-4 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex items-center justify-between pb-2 border-b border-[#30343C]">
        <div className="text-sm font-semibold text-[#7EE787] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#7EE787]" />
          <span>[Professional Certifications]</span>
        </div>
        <div className="text-xs text-[#747C87]">{certifications.length} Credentials Verified</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-3.5 rounded-xl bg-[#17191D] border border-[#30343C] space-y-1.5"
          >
            <div className="text-xs font-bold text-[#E6E8EB]">{cert.name}</div>
            <div className="text-xs text-[#7AA2F7]">{cert.issuer}</div>
            <div className="flex items-center justify-between text-[11px] text-[#747C87] pt-1">
              <span>{cert.date}</span>
              <span className="bg-[#101114] px-2 py-0.5 rounded border border-[#30343C]">
                {cert.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
