import React from "react";
import { openSourceContributions } from "../../data/opensource";
import { GitPullRequest, ExternalLink, CheckCircle } from "lucide-react";

export const OpenSourceOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm space-y-4 py-1 text-[#E6E8EB] max-w-3xl">
      <div className="flex items-center justify-between pb-2 border-b border-[#30343C]">
        <div className="text-sm font-semibold text-[#7EE787] flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-[#7EE787]" />
          <span>[Open-Source Contributions]</span>
        </div>
        <div className="text-xs text-[#747C87]">Verified Upstream Merges</div>
      </div>

      <div className="space-y-4">
        {openSourceContributions.map((contrib) => (
          <div
            key={contrib.id}
            className="p-4 rounded-xl bg-[#17191D] border border-[#30343C] space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#30343C]/60">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#E6E8EB]">{contrib.project}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#7EE787]/15 text-[#7EE787] border border-[#7EE787]/30 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Merged PR #{contrib.prNumber}
                  </span>
                </div>
                <div className="text-xs text-[#747C87] mt-0.5 font-mono">
                  Repository: {contrib.repo}
                </div>
              </div>

              <a
                href={contrib.prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#7AA2F7] hover:underline flex items-center gap-1.5 self-start sm:self-auto bg-[#1E2127] px-2.5 py-1 rounded border border-[#30343C]"
              >
                <span>View Pull Request #{contrib.prNumber}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {contrib.technologies.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[#101114] text-[#A0A7B2] border border-[#30343C]"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-xs text-[#E6E8EB] leading-relaxed">
              {contrib.summary}
            </p>

            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] uppercase tracking-wider text-[#747C87]">
                Contribution Details & Validation:
              </div>
              <ul className="space-y-1.5 text-xs text-[#A0A7B2]">
                {contrib.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#7EE787] select-none font-bold">›</span>
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
