export interface OpenSourceContribution {
  id: string;
  project: string;
  repo: string;
  prNumber: number;
  prUrl: string;
  status: "Merged";
  technologies: string[];
  summary: string;
  details: string[];
}

export const openSourceContributions: OpenSourceContribution[] = [
  {
    id: "pugdom-pr65",
    project: "Pugdom v2",
    repo: "cajuuh/pugdomv2",
    prNumber: 65,
    prUrl: "https://github.com/cajuuh/pugdomv2/pull/65",
    status: "Merged",
    technologies: ["TypeScript", "React Native", "Jest"],
    summary:
      "Merged Pull Request #65 — UI refactor using shared design tokens and comprehensive test suite validation.",
    details: [
      "Refactored Login, Thread, and Search screens using shared theme tokens and reusable UI primitives.",
      "Improved UI consistency, code structure, and component maintainability.",
      "Updated, fixed, and validated the test suite.",
      "Successfully verified 21 test suites comprising 223 tests passing with zero regressions.",
    ],
  },
];
