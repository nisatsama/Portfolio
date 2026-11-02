import React, { useState } from "react";
import { EngineeringNotes } from "../../data/projects";
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  ArrowRightLeft,
  Lock,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Info,
} from "lucide-react";

interface ProjectEngineeringNotesProps {
  notes: EngineeringNotes;
  defaultExpanded?: boolean;
}

export const ProjectEngineeringNotes: React.FC<ProjectEngineeringNotesProps> = ({
  notes,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-xl bg-[#101114] border border-[#30343C] overflow-hidden transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-[#17191D]/90 hover:bg-[#1E2127] border-b border-[#30343C]/80 flex items-center justify-between text-left transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-[#7EE787]">
            [engineering-notes]
          </span>
          <span className="text-[#30343C] hidden sm:inline">—</span>
          <span className="font-mono text-xs text-[#E6E8EB] font-medium">
            {notes.title}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#747C87]">
          <span>{isExpanded ? "collapse" : "expand details"}</span>
          {isExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#7EE787]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#A0A7B2]" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4 font-mono text-xs">
          {/* Summary Quote */}
          <div className="p-3 rounded-lg bg-[#17191D] border-l-2 border-[#7EE787] text-[#A0A7B2] italic leading-relaxed">
            "{notes.description}"
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* 1. Architectural Patterns */}
            <div className="space-y-2 p-3.5 rounded-lg bg-[#17191D]/60 border border-[#30343C]/80">
              <div className="flex items-center gap-2 text-[#7EE787] font-semibold text-xs">
                <Cpu className="w-3.5 h-3.5 shrink-0" />
                <span>01. Architectural Patterns</span>
              </div>
              <ul className="space-y-1.5 text-[#A0A7B2]">
                {notes.architecturalPatterns.map((pat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7EE787] font-bold select-none">•</span>
                    <span className="leading-relaxed">{pat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Concurrency & Consistency */}
            <div className="space-y-2 p-3.5 rounded-lg bg-[#17191D]/60 border border-[#30343C]/80">
              <div className="flex items-center gap-2 text-[#7AA2F7] font-semibold text-xs">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>02. Concurrency & Consistency Decisions</span>
              </div>
              <ul className="space-y-1.5 text-[#A0A7B2]">
                {notes.concurrencyAndConsistency.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#7AA2F7] font-bold select-none">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Security Implementation */}
            <div className="space-y-2 p-3.5 rounded-lg bg-[#17191D]/60 border border-[#30343C]/80">
              <div className="flex items-center gap-2 text-[#B4A0F7] font-semibold text-xs">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>03. Security Implementation</span>
              </div>
              <ul className="space-y-1.5 text-[#A0A7B2]">
                {notes.securityImplementation.map((sec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#B4A0F7] font-bold select-none">•</span>
                    <span className="leading-relaxed">{sec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Failure Handling */}
            <div className="space-y-2 p-3.5 rounded-lg bg-[#17191D]/60 border border-[#30343C]/80">
              <div className="flex items-center gap-2 text-[#E5C07B] font-semibold text-xs">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>04. Failure Handling & Recovery</span>
              </div>
              <ul className="space-y-1.5 text-[#A0A7B2]">
                {notes.failureHandling.map((fail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#E5C07B] font-bold select-none">•</span>
                    <span className="leading-relaxed">{fail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Data Flow Pipeline Sequence */}
          <div className="p-3.5 rounded-lg bg-[#17191D]/80 border border-[#30343C]/80 space-y-2">
            <div className="flex items-center gap-2 text-[#7EE787] font-semibold text-xs">
              <ArrowRightLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Execution & Data Flow Sequence</span>
            </div>
            <div className="space-y-1.5 pt-1">
              {notes.dataFlow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[#E6E8EB]">
                  <span className="text-[#7AA2F7] font-mono text-[11px] select-none">
                    [{idx + 1}]
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trade-offs & Known Limitations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-lg bg-[#17191D]/40 border border-[#30343C]/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[11px] text-[#A0A7B2] font-semibold uppercase">
                <Scale className="w-3.5 h-3.5 text-[#A0A7B2]" />
                <span>Design Trade-offs</span>
              </div>
              <ul className="space-y-1 text-[#A0A7B2] text-[11px]">
                {notes.designTradeoffs.map((td, idx) => (
                  <li key={idx}>• {td}</li>
                ))}
              </ul>
            </div>

            {notes.knownLimitations && notes.knownLimitations.length > 0 && (
              <div className="p-3 rounded-lg bg-[#17191D]/40 border border-[#30343C]/60 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-[#747C87] font-semibold uppercase">
                  <Info className="w-3.5 h-3.5 text-[#747C87]" />
                  <span>Scope & Known Boundaries</span>
                </div>
                <ul className="space-y-1 text-[#747C87] text-[11px]">
                  {notes.knownLimitations.map((lim, idx) => (
                    <li key={idx}>• {lim}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
