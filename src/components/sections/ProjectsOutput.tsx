import React from "react";
import { ProjectsSection, ProjectFilterType } from "../projects/ProjectsSection";

interface ProjectsOutputProps {
  filter?: "all" | "featured" | "fullstack" | "additional";
  onSelectProject?: (projectId: string) => void;
  onRunCommand?: (cmd: string) => void;
}

export const ProjectsOutput: React.FC<ProjectsOutputProps> = ({
  filter = "all",
  onSelectProject,
  onRunCommand,
}) => {
  const handleOpen = (projectName: string) => {
    if (onRunCommand) {
      onRunCommand(`open ${projectName}`);
    } else if (onSelectProject) {
      onSelectProject(projectName);
    }
  };

  return (
    <ProjectsSection
      filter={filter as ProjectFilterType}
      onOpenProject={handleOpen}
      onRunCommand={onRunCommand}
    />
  );
};
