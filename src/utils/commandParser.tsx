import React, { ReactNode } from "react";
import { WhoamiOutput } from "../components/sections/WhoamiOutput";
import { AboutOutput } from "../components/sections/AboutOutput";
import { SkillsOutput } from "../components/sections/SkillsOutput";
import { ProjectsOutput } from "../components/sections/ProjectsOutput";
import { ProjectDetailView } from "../components/sections/ProjectDetailView";
import { ExperienceOutput } from "../components/sections/ExperienceOutput";
import { EducationOutput } from "../components/sections/EducationOutput";
import { OpenSourceOutput } from "../components/sections/OpenSourceOutput";
import { AchievementsOutput } from "../components/sections/AchievementsOutput";
import { CertificationsOutput } from "../components/sections/CertificationsOutput";
import { ContactOutput } from "../components/sections/ContactOutput";
import { NeofetchOutput } from "../components/sections/NeofetchOutput";
import { HelpOutput } from "../components/sections/HelpOutput";
import { TreeOutput } from "../components/sections/TreeOutput";
import { LsOutput } from "../components/sections/LsOutput";
import { AskOutput } from "../components/sections/AskOutput";
import { projects } from "../data/projects";
import { profile } from "../data/profile";

export interface CommandExecutionResult {
  output: ReactNode;
  newPath?: string;
  isClear?: boolean;
}

export function parseAndExecuteCommand(
  rawInput: string,
  currentPath: string,
  callbacks: {
    onRunCommand: (cmd: string) => void;
    history: string[];
  }
): CommandExecutionResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { output: null };
  }

  const parts = trimmed.split(" ");
  const mainCmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const fullArgs = args.join(" ").trim();

  // clear
  if (mainCmd === "clear") {
    return { output: null, isClear: true };
  }

  // help
  if (mainCmd === "help") {
    return {
      output: <HelpOutput onRunCommand={callbacks.onRunCommand} />,
    };
  }

  // whoami
  if (mainCmd === "whoami") {
    return { output: <WhoamiOutput /> };
  }

  // about
  if (mainCmd === "about") {
    return { output: <AboutOutput /> };
  }

  // skills
  if (mainCmd === "skills" || mainCmd === "stack") {
    return { output: <SkillsOutput /> };
  }

  // projects
  if (mainCmd === "projects") {
    const isFeatured = fullArgs.includes("--featured");
    const isFullstack = fullArgs.includes("--fullstack");
    const isAdditional = fullArgs.includes("--additional");
    const filter = isFeatured
      ? "featured"
      : isFullstack
      ? "fullstack"
      : isAdditional
      ? "additional"
      : "all";
    return {
      output: (
        <ProjectsOutput
          filter={filter}
          onRunCommand={callbacks.onRunCommand}
        />
      ),
    };
  }

  // open <project> [--architecture | --github]
  if (mainCmd === "open") {
    const hasArchFlag = fullArgs.includes("--architecture") || fullArgs.includes("-a");
    const hasGithubFlag = fullArgs.includes("--github") || fullArgs.includes("-g");

    // Clean up flags and quotes from project target
    const cleanedTarget = fullArgs
      .replace(/--architecture|-a/gi, "")
      .replace(/--github|-g/gi, "")
      .replace(/['"]/g, "")
      .trim()
      .toLowerCase();

    // Match by ID, exact name, or partial name
    const found = projects.find((p) => {
      const pId = p.id.toLowerCase();
      const pName = p.name.toLowerCase();
      const pNormalized = pName.replace(/[\s-_]/g, "");
      const targetNormalized = cleanedTarget.replace(/[\s-_]/g, "");

      return (
        pId === cleanedTarget ||
        pName === cleanedTarget ||
        pNormalized === targetNormalized ||
        targetNormalized.includes(pNormalized) ||
        pNormalized.includes(targetNormalized)
      );
    });

    if (found) {
      if (hasGithubFlag) {
        // Open GitHub repository
        if (typeof window !== "undefined") {
          window.open(found.githubUrl, "_blank", "noopener,noreferrer");
        }
        return {
          output: (
            <div className="font-mono text-xs sm:text-sm space-y-1.5 py-1 text-[#E6E8EB]">
              <div className="text-[#7EE787] font-semibold">
                Opening GitHub repository for {found.name}...
              </div>
              <div className="text-[#A0A7B2]">
                URL:{" "}
                <a
                  href={found.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#7AA2F7] hover:underline"
                >
                  {found.githubUrl}
                </a>
              </div>
            </div>
          ),
        };
      }

      return {
        output: (
          <ProjectDetailView
            project={found}
            onBack={() => callbacks.onRunCommand("projects")}
            onRunCommand={callbacks.onRunCommand}
            initialSection={hasArchFlag ? "architecture" : "all"}
          />
        ),
      };
    } else {
      return {
        output: (
          <div className="font-mono text-xs sm:text-sm text-[#FF7B72] space-y-1.5 py-1">
            <div>open: project not found: '{cleanedTarget || fullArgs}'</div>
            <div className="text-[#A0A7B2]">
              Available projects: HookForge, ShelfSense, SupportFlow, CodeCollab, Travelogia, AIResumeAnalyser
            </div>
            <div className="text-xs text-[#747C87]">
              Usage: <span className="text-[#7EE787]">open HookForge</span>, <span className="text-[#7EE787]">open ShelfSense --architecture</span>, or <span className="text-[#7EE787]">open HookForge --github</span>
            </div>
          </div>
        ),
      };
    }
  }

  // experience
  if (mainCmd === "experience" || mainCmd === "work") {
    return { output: <ExperienceOutput /> };
  }

  // education
  if (mainCmd === "education" || mainCmd === "academics") {
    return { output: <EducationOutput /> };
  }

  // opensource
  if (
    mainCmd === "opensource" ||
    mainCmd === "open-source" ||
    mainCmd === "os"
  ) {
    return { output: <OpenSourceOutput /> };
  }

  // achievements
  if (mainCmd === "achievements" || mainCmd === "awards") {
    return { output: <AchievementsOutput /> };
  }

  // certifications
  if (mainCmd === "certifications" || mainCmd === "certs") {
    return { output: <CertificationsOutput /> };
  }

  // contact
  if (mainCmd === "contact") {
    return { output: <ContactOutput /> };
  }

  // socials
  if (mainCmd === "socials" || mainCmd === "social") {
    return {
      output: (
        <div className="font-mono text-xs sm:text-sm space-y-2 py-1 text-[#E6E8EB]">
          <div className="text-[#7EE787] font-semibold pb-1 border-b border-[#30343C]">
            Verified Professional Profiles:
          </div>
          <div className="space-y-1 text-xs">
            <div>
              <span className="text-[#7AA2F7] font-semibold w-24 inline-block">LinkedIn:</span>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E6E8EB] hover:text-[#7AA2F7] underline"
              >
                {profile.contact.linkedin}
              </a>
            </div>
            <div>
              <span className="text-[#7AA2F7] font-semibold w-24 inline-block">GitHub:</span>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E6E8EB] hover:text-[#7EE787] underline"
              >
                {profile.contact.github}
              </a>
            </div>
          </div>
        </div>
      ),
    };
  }

  // resume
  if (mainCmd === "resume") {
    return {
      output: (
        <div className="font-mono text-xs sm:text-sm space-y-2 py-1 text-[#E6E8EB] max-w-2xl">
          <div className="text-[#E5C07B] font-semibold">
            [Resume Notice]
          </div>
          <p className="text-xs text-[#A0A7B2] leading-relaxed">
            Direct resume download is currently disabled pending the next quarterly versioned PDF upload.
            To receive a verified PDF copy tailored for backend engineering or software development roles:
          </p>
          <div className="p-3 rounded-lg bg-[#1E2127] border border-[#30343C] text-xs space-y-1 text-[#E6E8EB]">
            <div>• Email: <a href={`mailto:${profile.contact.email}`} className="text-[#7EE787] underline">{profile.contact.email}</a></div>
            <div>• Phone: <a href={`tel:${profile.contact.phone}`} className="text-[#7EE787] underline">{profile.contact.formattedPhone}</a></div>
            <div>• LinkedIn: <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#7AA2F7] underline">linkedin.com/in/nisat-sama</a></div>
          </div>
          <div className="text-[11px] text-[#747C87]">
            Tip: You can inspect verified project implementations anytime via <button onClick={() => callbacks.onRunCommand("projects")} className="text-[#7EE787] underline">projects</button>.
          </div>
        </div>
      ),
    };
  }

  // neofetch
  if (mainCmd === "neofetch") {
    return { output: <NeofetchOutput /> };
  }

  // pwd
  if (mainCmd === "pwd") {
    const full =
      currentPath === "~"
        ? "/Users/nisatsama/portfolio"
        : `/Users/nisatsama/portfolio/${currentPath.replace("~/", "")}`;
    return {
      output: <div className="font-mono text-xs sm:text-sm text-[#A0A7B2]">{full}</div>,
    };
  }

  // ls
  if (mainCmd === "ls") {
    const hasLa = fullArgs.includes("-la") || fullArgs.includes("-l") || fullArgs.includes("-a");
    return {
      output: <LsOutput onRunCommand={callbacks.onRunCommand} showAll={hasLa} />,
    };
  }

  // tree
  if (mainCmd === "tree") {
    return {
      output: <TreeOutput onRunCommand={callbacks.onRunCommand} />,
    };
  }

  // date
  if (mainCmd === "date") {
    return {
      output: (
        <div className="font-mono text-xs sm:text-sm text-[#A0A7B2]">
          {new Date().toString()}
        </div>
      ),
    };
  }

  // history
  if (mainCmd === "history") {
    return {
      output: (
        <div className="font-mono text-xs sm:text-sm space-y-0.5 text-[#A0A7B2]">
          {callbacks.history.map((cmd, i) => (
            <div key={i} className="flex gap-3">
              <span className="text-[#747C87] w-8 text-right">{i + 1}</span>
              <span className="text-[#E6E8EB]">{cmd}</span>
            </div>
          ))}
        </div>
      ),
    };
  }

  // exit
  if (mainCmd === "exit") {
    return {
      output: (
        <div className="font-mono text-xs sm:text-sm text-[#A0A7B2] py-1">
          Session terminal halted. Press any key or execute a new command to restore active shell.
        </div>
      ),
    };
  }

  // cd
  if (mainCmd === "cd") {
    if (!fullArgs || fullArgs === "~" || fullArgs === "/") {
      return {
        output: null,
        newPath: "~",
      };
    } else if (fullArgs === ".." || fullArgs === "../") {
      return {
        output: null,
        newPath: "~",
      };
    } else if (fullArgs.includes("projects")) {
      return {
        output: (
          <div className="font-mono text-xs text-[#7EE787]">
            Directory changed to ~/projects. Showing project repositories:
            <ProjectsOutput onRunCommand={callbacks.onRunCommand} />
          </div>
        ),
        newPath: "~/projects",
      };
    } else {
      return {
        output: (
          <div className="font-mono text-xs text-[#FF7B72]">
            cd: no such file or directory: {fullArgs}
          </div>
        ),
      };
    }
  }

  // cat <file>
  if (mainCmd === "cat") {
    const file = fullArgs.toLowerCase();
    if (file.includes("about")) return { output: <AboutOutput /> };
    if (file.includes("contact")) return { output: <ContactOutput /> };
    if (file.includes("skills")) return { output: <SkillsOutput /> };
    if (file.includes("readme")) return { output: <AboutOutput /> };
    return {
      output: (
        <div className="font-mono text-xs text-[#FF7B72]">
          cat: {fullArgs || "empty"}: No such file or directory
        </div>
      ),
    };
  }

  // ask <query>
  if (mainCmd === "ask") {
    const cleanQuestion = fullArgs.replace(/^["']|["']$/g, "").trim();
    if (!cleanQuestion) {
      return {
        output: (
          <div className="font-mono text-xs text-[#FF7B72]">
            Usage: ask "&lt;question about Nisat's background or projects&gt;"
            <br />
            Example: <span className="text-[#7EE787]">ask "Tell me about HookForge"</span>
          </div>
        ),
      };
    }
    return {
      output: <AskOutput question={cleanQuestion} />,
    };
  }

  // Unknown command
  return {
    output: (
      <div className="font-mono text-xs sm:text-sm text-[#FF7B72] space-y-1">
        <div>zsh: command not found: {mainCmd}</div>
        <div className="text-xs text-[#A0A7B2]">
          Type <button onClick={() => callbacks.onRunCommand("help")} className="text-[#7EE787] underline">help</button> to see available commands, or tap any suggestion below.
        </div>
      </div>
    ),
  };
}
