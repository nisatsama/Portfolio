import React from "react";
import { profile } from "../../data/profile";

export const NeofetchOutput: React.FC = () => {
  return (
    <div className="font-mono text-xs sm:text-sm py-2 text-[#E6E8EB] flex flex-col md:flex-row gap-6 items-start max-w-3xl">
      {/* Custom ASCII Art Developer Logo */}
      <pre className="text-[#7EE787] text-[10px] sm:text-xs leading-[1.15] select-none font-bold shrink-0">
{`
       _           _             _             
 _ __ (_)___  __ _| |_    _ __  | | _____  ___ 
| '_ \\| / __|/ _\` | __|  | '_ \\ | |/ / _ \\/ __|
| | | | \\__ \\ (_| | |_   | |_) ||   < (_) \\__ \\
|_| |_|_|___/\\__,_|\\__|  | .__/ |_|\\_\\___/|___/
                         |_|                   
       .---.
      /     \\
     | () () |       [Java 21 · Spring Boot]
      \\  -  /        [Kafka · Redis · PGSQL]
       '---'         [Adamas Univ · Kolkata]
`}
      </pre>

      {/* Neofetch System Information List */}
      <div className="space-y-1 text-xs sm:text-sm">
        <div className="text-sm font-bold text-[#E6E8EB]">
          <span className="text-[#7EE787]">nisat</span>
          <span className="text-[#A0A7B2]">@</span>
          <span className="text-[#7AA2F7]">macbook-pro</span>
        </div>
        <div className="text-[#30343C] select-none">-----------------------------------</div>

        <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[160px_1fr] gap-x-2 gap-y-1">
          <span className="text-[#7AA2F7] font-semibold">OS:</span>
          <span className="text-[#E6E8EB]">macOS Sonoma (Darwin 24.1.0)</span>

          <span className="text-[#7AA2F7] font-semibold">Host:</span>
          <span className="text-[#E6E8EB]">MacBookPro18,1</span>

          <span className="text-[#7AA2F7] font-semibold">Specialization:</span>
          <span className="text-[#7EE787] font-semibold">Java Backend Engineering</span>

          <span className="text-[#7AA2F7] font-semibold">Primary Language:</span>
          <span className="text-[#E6E8EB]">Java 21 (LTS)</span>

          <span className="text-[#7AA2F7] font-semibold">Backend Framework:</span>
          <span className="text-[#E6E8EB]">Spring Boot 3.x, Spring Security, JPA</span>

          <span className="text-[#7AA2F7] font-semibold">Data & Streaming:</span>
          <span className="text-[#E6E8EB]">PostgreSQL, Apache Kafka, Redis, MongoDB</span>

          <span className="text-[#7AA2F7] font-semibold">DevOps & Cloud:</span>
          <span className="text-[#E6E8EB]">Docker, AWS, Google Cloud Run, Git</span>

          <span className="text-[#7AA2F7] font-semibold">Frontend:</span>
          <span className="text-[#E6E8EB]">React.js, TypeScript, Tailwind CSS</span>

          <span className="text-[#7AA2F7] font-semibold">Education:</span>
          <span className="text-[#E6E8EB]">{profile.degree}</span>

          <span className="text-[#7AA2F7] font-semibold">University:</span>
          <span className="text-[#E6E8EB]">{profile.university} (CGPA: 8.77)</span>

          <span className="text-[#7AA2F7] font-semibold">Location:</span>
          <span className="text-[#E6E8EB]">{profile.location}</span>

          <span className="text-[#7AA2F7] font-semibold">GitHub:</span>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7EE787] hover:underline"
          >
            github.com/nisatsama
          </a>
        </div>

        {/* Color Palette blocks */}
        <div className="flex gap-1.5 pt-3">
          <span className="w-3.5 h-3.5 rounded-sm bg-[#101114] border border-[#30343C]" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#1E2127]" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#30343C]" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#7EE787]" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#7AA2F7]" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#B4A0F7]" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#E5C07B]" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#FF7B72]" />
        </div>
      </div>
    </div>
  );
};
