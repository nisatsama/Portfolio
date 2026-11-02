import { ReactNode } from "react";

export interface TerminalEntry {
  id: string;
  command: string;
  timestamp: Date;
  output?: ReactNode;
  isSystemInit?: boolean;
  type?: "command" | "system" | "error" | "ai";
}

export interface CommandSuggestion {
  command: string;
  description: string;
  category?: "nav" | "projects" | "info" | "utility";
}

export type TerminalActiveView =
  | "terminal"
  | "project-detail"
  | "system-overview";
