import React from "react";
import { Project } from "../../data/projects";
import { ProjectDetail } from "../projects/ProjectDetail";

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onRunCommand?: (cmd: string) => void;
  initialSection?: "all" | "architecture";
}

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onRunCommand,
  initialSection = "all",
}) => {
  return (
    <ProjectDetail
      project={project}
      onBack={onBack}
      onRunCommand={onRunCommand}
      initialSection={initialSection}
    />
  );
};
