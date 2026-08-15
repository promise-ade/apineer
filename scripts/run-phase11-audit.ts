import { spawnSync } from "node:child_process";

type Step = {
  name: string;
  command: string;
  args: string[];
};

const steps: Step[] = [
  { name: "typecheck", command: "npm", args: ["run", "typecheck"] },
  { name: "lint", command: "npm", args: ["run", "lint"] },
  { name: "seed validation", command: "npm", args: ["run", "db:validate-seed"] },
  { name: "unit tests", command: "npm", args: ["run", "test"] },
  {
    name: "integration tests",
    command: "npx",
    args: ["tsx", "scripts/verify-phase11-integration.ts"],
  },
  { name: "build", command: "npm", args: ["run", "build"] },
];

function runStep(step: Step): boolean {
  console.log(`\n=== ${step.name} ===`);
  const result = spawnSync(step.command, step.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    console.error(`\nAudit failed at step: ${step.name}`);
    return false;
  }

  return true;
}

function main() {
  console.log("Running Phase 11 audit...");

  for (const step of steps) {
    if (!runStep(step)) {
      process.exitCode = 1;
      return;
    }
  }

  console.log("\nPhase 11 audit passed.");
}

main();
