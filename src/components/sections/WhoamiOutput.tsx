import React from "react";
import { profile } from "../../data/profile";

export const WhoamiOutput: React.FC = () => {
  return (
    <div className="font-mono text-sm space-y-2 py-1 text-[#E6E8EB]">
      <div className="text-base sm:text-lg font-bold text-[#E6E8EB] tracking-tight">
        {profile.name}
      </div>
      <div className="text-[#7EE787] font-semibold text-xs sm:text-sm">
        {profile.title}
      </div>
      <p className="text-[#A0A7B2] text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
        {profile.introduction}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#747C87] pt-2 border-t border-[#30343C]/60">
        <span>📍 {profile.location}</span>
        <span>·</span>
        <span>🎓 {profile.university}</span>
        <span>·</span>
        <span>Expected {profile.graduationYear}</span>
      </div>
    </div>
  );
};
