#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SCRATCH_ROOT = path.join(ROOT, 'node_modules', '.cache', 'ci-template-dependency-regression');
fs.mkdirSync(SCRATCH_ROOT, { recursive: true });
const RUN_ROOT = fs.mkdtempSync(path.join(SCRATCH_ROOT, 'run-'));
const TEMPLATE_PATH = 'docs/appendices/templates/ci-minimum/index.md';

const cases = [
  ['template dependency drift', TEMPLATE_PATH, (text) => text.replace(/("markdownlint-cli":\s*)"[^"]+"/, '$1"^0.0.0"')],
  ['canonical dependency drift', 'package.json', (text) => text.replace(/("markdown-link-check":\s*)"[^"]+"/, '$1"^0.0.0"')],
  ['missing template dependency', TEMPLATE_PATH, (text) => text.replace(/^\s*"markdownlint-cli":\s*"[^"]+",\r?\n/m, '')],
  ['malformed template package', TEMPLATE_PATH, (text) => text.replace('"name": "docs-quality-gate",', '"name": "docs-quality-gate"')],
];

function createFixture() {
  const fixture = fs.mkdtempSync(path.join(RUN_ROOT, 'case-'));
  fs.mkdirSync(path.join(fixture, path.dirname(TEMPLATE_PATH)), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'package.json'), path.join(fixture, 'package.json'));
  fs.copyFileSync(path.join(ROOT, TEMPLATE_PATH), path.join(fixture, TEMPLATE_PATH));
  return fixture;
}

let passed = 0;
try {
  for (const [name, relativePath, mutate] of cases) {
    const fixture = createFixture();
    try {
      const target = path.join(fixture, relativePath);
      const original = fs.readFileSync(target, 'utf8');
      const changed = mutate(original);
      if (changed === original) throw new Error(`negative fixture was not mutated: ${name}`);
      fs.writeFileSync(target, changed);

      const result = childProcess.spawnSync(process.execPath, [path.join(ROOT, 'scripts/check-ci-template-dependencies.js')], {
        cwd: ROOT,
        env: Object.assign({}, process.env, { CI_TEMPLATE_ROOT: fixture }),
        encoding: 'utf8',
      });
      if (result.error || result.signal || result.status === null) {
        throw new Error(`checker did not exit normally: ${name}`);
      }
      if (result.status !== 1 || !String(result.stderr).includes('CI template dependency check failed:')) {
        throw new Error(`negative case was not rejected as a controlled failure: ${name}`);
      }
      passed += 1;
    } finally {
      fs.rmSync(fixture, { recursive: true, force: true });
    }
  }
} finally {
  fs.rmSync(RUN_ROOT, { recursive: true, force: true });
  try {
    fs.rmdirSync(SCRATCH_ROOT);
  } catch (error) {
    if (error.code !== 'ENOENT' && error.code !== 'ENOTEMPTY') throw error;
  }
}

console.log(`CI template dependency regression passed: ${passed}/${cases.length}.`);
