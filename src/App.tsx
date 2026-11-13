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

        {/* Minimal Terminal Footer */}
        <TerminalFooter />
      </main>
    </div>
  );
}

export default App;
