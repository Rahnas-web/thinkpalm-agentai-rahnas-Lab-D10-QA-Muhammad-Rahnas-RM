#!/usr/bin/env npx tsx
/**
 * ============================================================================
 * OrangeHRM Login Automation — TypeScript Executable
 * ============================================================================
 *
 * Single entry-point .ts file to run the full automation pipeline:
 *   1. Install npm dependencies (if missing)
 *   2. Install Playwright Chromium browser
 *   3. Execute all login test scenarios
 *   4. Generate PDF execution report
 *
 * HOW TO RUN (pick one):
 *   npx tsx OrangeHRM-Automation.executable.ts
 *   npm run executable
 *   Double-click: Run-OrangeHRM-Automation.bat
 *
 * OUTPUT:
 *   reports/OrangeHRM-Login-Automation-Report.pdf
 *   playwright-report/index.html
 *   test-results/results.json
 *
 * REQUIRES: Node.js 18+ and npm — https://nodejs.org/
 * ============================================================================
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(__dirname);
const PDF_REPORT = path.join(ROOT, 'reports', 'OrangeHRM-Login-Automation-Report.pdf');
const TEST_SPEC = 'tests/orangehrm-login.spec.ts';
const PDF_SCRIPT = 'scripts/generate-pdf-report.ts';

function log(message: string): void {
  console.log(message);
}

function run(command: string, args: string[]): number {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  if (result.error) {
    console.error(`[ERROR] Failed to run ${command}:`, result.error.message);
    return 1;
  }
  return result.status ?? 1;
}

function ensureNodeTooling(): void {
  const nodeCheck = spawnSync('node', ['--version'], { shell: true, encoding: 'utf-8' });
  if (nodeCheck.status !== 0) {
    console.error('[ERROR] Node.js is not installed. Download: https://nodejs.org/');
    process.exit(1);
  }
  log(`[INFO] Node ${(nodeCheck.stdout ?? '').trim()}`);
}

function ensureDependencies(): void {
  const nodeModules = path.join(ROOT, 'node_modules');
  if (!fs.existsSync(nodeModules)) {
    log('[INFO] Installing npm packages...');
    if (run('npm', ['install']) !== 0) process.exit(1);
  }
}

function ensureBrowser(): void {
  log('[INFO] Ensuring Playwright Chromium is installed...');
  if (run('npx', ['playwright', 'install', 'chromium']) !== 0) process.exit(1);
}

function runTests(): number {
  log('[INFO] Running Playwright login tests...');
  log('');
  return run('npx', ['playwright', 'test', TEST_SPEC]);
}

function generatePdfReport(): number {
  log('');
  log('[INFO] Generating PDF report...');
  return run('npx', ['tsx', PDF_SCRIPT]);
}

function openPdfReport(): void {
  if (!fs.existsSync(PDF_REPORT)) return;

  log(`[INFO] Opening PDF: ${PDF_REPORT}`);
  if (process.platform === 'win32') {
    spawnSync('cmd', ['/c', 'start', '', PDF_REPORT], { shell: true });
  } else if (process.platform === 'darwin') {
    spawnSync('open', [PDF_REPORT], { shell: false });
  } else {
    spawnSync('xdg-open', [PDF_REPORT], { shell: false });
  }
}

export async function executeAutomation(): Promise<number> {
  log('============================================================');
  log('  OrangeHRM Login Automation (TypeScript Executable)');
  log('  https://opensource-demo.orangehrmlive.com/');
  log('============================================================');
  log('');

  ensureNodeTooling();
  ensureDependencies();
  ensureBrowser();

  const testExit = runTests();
  if (testExit !== 0) {
    log('');
    log('[FAILED] Tests did not pass. See playwright-report/index.html');
    return testExit;
  }

  const pdfExit = generatePdfReport();
  if (pdfExit !== 0) return pdfExit;

  log('');
  log('[SUCCESS] All tests passed.');
  log(`          PDF : ${PDF_REPORT}`);
  log(`          HTML: ${path.join(ROOT, 'playwright-report', 'index.html')}`);

  openPdfReport();
  return 0;
}

const isDirectRun =
  typeof require !== 'undefined' &&
  require.main === module;

if (isDirectRun) {
  executeAutomation()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error('[ERROR]', err);
      process.exit(1);
    });
}
