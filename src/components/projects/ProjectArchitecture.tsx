import React from "react";
import { ArchitectureDiagram } from "../../data/projects";
import {
  Server,
  Database,
  Layers,
  Box,
  Globe,
  Radio,
  ArrowRight,
  GitBranch,
} from "lucide-react";

interface ProjectArchitectureProps {
  architecture: ArchitectureDiagram;
}

export const ProjectArchitecture: React.FC<ProjectArchitectureProps> = ({
  architecture,
}) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "service":
        return <Server className="w-3.5 h-3.5 text-[#7EE787]" />;
      case "database":
        return <Database className="w-3.5 h-3.5 text-[#7AA2F7]" />;
      case "queue":
        return <Radio className="w-3.5 h-3.5 text-[#E5C07B]" />;
      case "sandbox":
        return <Box className="w-3.5 h-3.5 text-[#B4A0F7]" />;
      case "external":
        return <Globe className="w-3.5 h-3.5 text-[#FF7B72]" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-[#A0A7B2]" />;
    }
  };

  return (
    <div className="rounded-xl bg-[#101114] border border-[#30343C] p-4 sm:p-5 font-mono text-xs space-y-4">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-[#30343C]/80">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-[#7EE787]" />
          <span className="font-semibold text-xs text-[#E6E8EB]">
            System Architecture & Component Topology
          </span>
        </div>
        <span className="text-[10px] text-[#747C87]">
          [pattern: {architecture.type}]
        </span>
      </div>

      <p className="text-xs text-[#A0A7B2] leading-relaxed">
        {architecture.description}
      </p>

      {/* Component Nodes Grid */}
      <div className="space-y-2 pt-1">
        <div className="text-[10px] uppercase tracking-wider text-[#747C87] font-semibold">
          Component Topology ({architecture.nodes.length} Verified Modules):
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {architecture.nodes.map((node) => (
            <div
              key={node.id}
              className="p-3 rounded-lg bg-[#17191D] border border-[#30343C] flex items-start gap-2.5 transition-colors hover:border-[#7EE787]/50"
            >
              <div className="p-1.5 rounded bg-[#101114] border border-[#30343C] shrink-0 mt-0.5">
                {getNodeIcon(node.type)}
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-semibold text-[#E6E8EB] truncate">
                  {node.label}
                </div>
                {node.sublabel && (
                  <div className="text-[10px] text-[#A0A7B2] truncate">
                    {node.sublabel}
                  </div>
                )}
                <div className="text-[9px] uppercase tracking-wider text-[#747C87] pt-0.5">
                  [{node.type}]
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connection Bus & Protocols */}
      <div className="space-y-2 pt-2 border-t border-[#30343C]/60">
        <div className="text-[10px] uppercase tracking-wider text-[#747C87] font-semibold">
          Data Interaction Links & Protocols:
        </div>

        <div className="space-y-1.5">
          {architecture.connections.map((conn, idx) => {
            const fromNode =
              architecture.nodes.find((n) => n.id === conn.from)?.label ||
              conn.from;
            const toNode =
              architecture.nodes.find((n) => n.id === conn.to)?.label ||
              conn.to;

            return (
              <div
                key={idx}
                className="p-2 rounded bg-[#17191D]/70 border border-[#30343C]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]"
              >
                <div className="flex items-center gap-1.5 text-[#E6E8EB] truncate">
                  <span className="text-[#7EE787] font-semibold truncate">
                    {fromNode}
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#747C87] shrink-0" />
                  <span className="text-[#7AA2F7] font-semibold truncate">
                    {toNode}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <span className="text-[#A0A7B2] text-[10px]">{conn.label}</span>
                  {conn.protocol && (
                    <span className="px-1.5 py-0.5 rounded bg-[#101114] text-[#E5C07B] text-[9px] border border-[#30343C]">
                      {conn.protocol}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step by Step Flow Sequence */}
      <div className="p-3.5 rounded-lg bg-[#17191D]/50 border border-[#30343C]/60 space-y-2 pt-2.5">
        <div className="text-[10px] uppercase tracking-wider text-[#7EE787] font-semibold">
          Verified Execution Pipeline Steps:
        </div>
        <div className="space-y-1.5">
          {architecture.flowSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#A0A7B2]">
              <span className="text-[#7EE787] font-mono text-[10px] px-1 py-0.5 rounded bg-[#101114] border border-[#30343C] shrink-0">
                0{idx + 1}
              </span>
              <span className="leading-relaxed text-[#E6E8EB]">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
