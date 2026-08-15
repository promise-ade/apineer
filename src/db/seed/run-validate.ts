import {
  formatValidationReport,
  runPreSeedValidation,
} from "./validate";

const report = runPreSeedValidation();
console.log(formatValidationReport(report));

if (!report.passed) {
  process.exit(1);
}
