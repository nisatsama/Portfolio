import React, { useRef } from "react";
import { TopNav } from "./components/TopNav";
import { TerminalWindow, TerminalWindowRef } from "./components/TerminalWindow";
import { TerminalFooter } from "./components/TerminalFooter";
import { profile } from "./data/profile";
import { Cpu, Database, Network, ShieldCheck } from "lucide-react";

export function App() {
  const terminalRef = useRef<TerminalWindowRef>(null);

  const handleNavClick = (command: string) => {
    terminalRef.current?.runCommand(command);
  };

  return (
    <div className="min-h-screen bg-[#101114] text-[#E6E8EB] flex flex-col font-sans selection:bg-[#7EE787]/20 selection:text-[#7EE787]">
      {/* 3-Zone Top Bar */}
      <TopNav onNavClick={handleNavClick} />

      {/* Main Developer Workstation Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-12 flex flex-col items-center">
        {/* Workstation Header Intro */}
        <section className="w-full max-w-5xl text-center sm:text-left mb-6 sm:mb-8 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#30343C]/80">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#E6E8EB] mt-1">
                {profile.name} — Engineering Console
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#A0A7B2]">
              <span className="px-2.5 py-1 rounded-md bg-[#17191D] border border-[#30343C]">
                Java 21 LTS
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#17191D] border border-[#30343C]">
                Spring Boot 3
              </span>
              <span className="px-2.5 py-1 rounded-md bg-[#17191D] border border-[#30343C] hidden md:inline">
                Apache Kafka
              </span>
            </div>
          </div>
        </section>

        {/* Central Terminal Window */}
        <section className="w-full flex justify-center mb-8" aria-label="Terminal Console">
          <TerminalWindow ref={terminalRef} />
        </section>

        {/* Architecture & Engineering Focus KPI Strip */}
        <section className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs mb-4">
          <div className="p-3.5 rounded-xl bg-[#17191D]/80 border border-[#30343C] hover:border-[#7EE787]/50 transition-colors">
            <div className="flex items-center gap-2 text-[#7EE787] font-semibold mb-1">
              <Cpu className="w-4 h-4" />
              <span>Backend Core</span>
            </div>
            <div className="text-[#A0A7B2] text-[11px] leading-relaxed">
              Java 21, Spring Boot, Spring Security, REST APIs & Asynchronous Workflows
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#17191D]/80 border border-[#30343C] hover:border-[#7AA2F7]/50 transition-colors">
            <div className="flex items-center gap-2 text-[#7AA2F7] font-semibold mb-1">
              <Network className="w-4 h-4" />
              <span>Event Streaming</span>
            </div>
            <div className="text-[#A0A7B2] text-[11px] leading-relaxed">
              Apache Kafka, Transactional Outbox, Concurrent Delivery & Retries
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#17191D]/80 border border-[#30343C] hover:border-[#E5C07B]/50 transition-colors">
            <div className="flex items-center gap-2 text-[#E5C07B] font-semibold mb-1">
              <Database className="w-4 h-4" />
              <span>Data Consistency</span>
            </div>
            <div className="text-[#A0A7B2] text-[11px] leading-relaxed">
              PostgreSQL, Redis Cache, Row Locks, Constraints & Idempotency
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#17191D]/80 border border-[#30343C] hover:border-[#B4A0F7]/50 transition-colors">
            <div className="flex items-center gap-2 text-[#B4A0F7] font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Academic Honors</span>
            </div>
            <div className="text-[#A0A7B2] text-[11px] leading-relaxed">
              Adamas University CSE · CGPA 8.77 · Class XII 95.75% · Chemistry 100/100
            </div>
          </div>
        </section>

        {/* Minimal Terminal Footer */}
        <TerminalFooter />
      </main>
    </div>
  );
}

export default App;
