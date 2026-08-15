import { spawnSync } from "node:child_process";

type Step = {
  name: string;
  command: string;
  args: string[];
};

const steps: Step[] = [
  { name: "seed validation", command: "npm", args: ["run", "db:validate-seed"] },
  { name: "full test audit", command: "npm", args: ["run", "test:audit"] },
  { name: "production build", command: "npm", args: ["run", "build"] },
  {
    name: "production verification",
    command: "npx",
    args: ["tsx", "scripts/verify-phase12-production.ts"],
  },
];

function runStep(step: Step): boolean {
  console.log(`\n=== ${step.name} ===`);
  const result = spawnSync(step.command, step.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    console.error(`\nPhase 12 prep failed at step: ${step.name}`);
    return false;
  }

  return true;
}

function main() {
  console.log("Running Phase 12 production preparation...");

  for (const step of steps) {
    if (!runStep(step)) {
      process.exitCode = 1;
      return;
    }
  }

  console.log("\nPhase 12 production preparation passed.");
  console.log("Next: deploy preview, verify routes/responsive behavior, then promote to production.");
}

main();
