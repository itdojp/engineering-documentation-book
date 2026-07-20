#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(process.env.CI_TEMPLATE_ROOT || path.join(__dirname, '..'));
const TEMPLATE_PATH = 'docs/appendices/templates/ci-minimum/index.md';
const DEPENDENCIES = ['markdownlint-cli', 'markdown-link-check'];
const errors = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8');
}

function readJson(relativePath) {
  try {
    return JSON.parse(readText(relativePath));
  } catch (error) {
    errors.push(`${relativePath}: invalid JSON (${error.message})`);
    return null;
  }
}

function extractTemplatePackage(text) {
  const heading = '### `package.json`（例）';
  const headingIndex = text.indexOf(heading);
  if (headingIndex === -1) {
    errors.push(`${TEMPLATE_PATH}: ${heading} section is missing`);
    return null;
  }

  const remainder = text.slice(headingIndex + heading.length);
  const nextHeadingIndex = remainder.search(/\r?\n###\s/);
  const section = nextHeadingIndex === -1 ? remainder : remainder.slice(0, nextHeadingIndex);
  const fences = Array.from(section.matchAll(/```json\s*\r?\n([\s\S]*?)\r?\n```/g));
  if (fences.length !== 1) {
    errors.push(`${TEMPLATE_PATH}: package.json example must contain exactly one JSON code block; found ${fences.length}`);
    return null;
  }

  try {
    return JSON.parse(fences[0][1]);
  } catch (error) {
    errors.push(`${TEMPLATE_PATH}: package.json example is invalid JSON (${error.message})`);
    return null;
  }
}

function dependencyRange(document, dependency, label) {
  if (!document || typeof document !== 'object' || Array.isArray(document)) {
    errors.push(`${label}: expected a JSON object`);
    return null;
  }
  if (!document.devDependencies || typeof document.devDependencies !== 'object') {
    errors.push(`${label}: devDependencies is missing`);
    return null;
  }
  const value = document.devDependencies[dependency];
  if (typeof value !== 'string' || !value.trim()) {
    errors.push(`${label}: devDependencies.${dependency} is missing`);
    return null;
  }
  return value;
}

const canonicalPackage = readJson('package.json');
const templatePackage = extractTemplatePackage(readText(TEMPLATE_PATH));

for (const dependency of DEPENDENCIES) {
  const expected = dependencyRange(canonicalPackage, dependency, 'package.json');
  const actual = dependencyRange(templatePackage, dependency, `${TEMPLATE_PATH} package.json example`);
  if (expected !== null && actual !== null && actual !== expected) {
    errors.push(`${dependency}: template has ${JSON.stringify(actual)}, package.json has ${JSON.stringify(expected)}`);
  }
}

if (canonicalPackage && canonicalPackage.scripts) {
  const command = canonicalPackage.scripts['check:ci-template-dependencies'];
  if (command !== 'node scripts/check-ci-template-dependencies.js') {
    errors.push('package.json: scripts.check:ci-template-dependencies is not wired to the canonical checker');
  }
  const testCommand = String(canonicalPackage.scripts.test || '');
  if (!testCommand.split('&&').map((part) => part.trim()).includes('npm run check:ci-template-dependencies')) {
    errors.push('package.json: scripts.test does not run check:ci-template-dependencies');
  }
}

if (errors.length) {
  console.error('CI template dependency check failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('CI template dependency check passed.');
for (const dependency of DEPENDENCIES) {
  console.log(`${dependency}: ${canonicalPackage.devDependencies[dependency]}`);
}
