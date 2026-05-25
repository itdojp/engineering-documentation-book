#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const errors = [];

function readText(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function readJson(file) {
  return JSON.parse(readText(file));
}

function unquote(value) {
  const trimmed = String(value).trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseYamlScalars(text) {
  const result = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) {
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_.-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }
    result[match[1]] = unquote(match[2]);
  }
  return result;
}

function parseFrontMatter(file) {
  const text = readText(file);
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) {
    errors.push(`${file}: front matter is missing`);
    return {};
  }
  return parseYamlScalars(match[1]);
}

function parseNavigationList(text, section) {
  const items = [];
  let inSection = false;
  let current = null;

  for (const line of text.split(/\r?\n/)) {
    const sectionMatch = line.match(/^([A-Za-z0-9_-]+):\s*$/);
    if (sectionMatch) {
      if (current) {
        items.push(current);
        current = null;
      }
      inSection = sectionMatch[1] === section;
      continue;
    }

    if (!inSection) {
      continue;
    }

    if (!line.trim()) {
      continue;
    }

    const titleMatch = line.match(/^\s*-\s+title:\s*(.+)$/);
    if (titleMatch) {
      if (current) {
        items.push(current);
      }
      current = { title: unquote(titleMatch[1]) };
      continue;
    }

    const pathMatch = line.match(/^\s+path:\s*(.+)$/);
    if (pathMatch && current) {
      current.path = unquote(pathMatch[1]);
    }
  }

  if (current) {
    items.push(current);
  }

  return items;
}

function expectEqual(label, actual, expected) {
  if (actual !== expected) {
    errors.push(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function expectTruthy(label, actual) {
  if (!actual) {
    errors.push(`${label}: expected a non-empty value`);
  }
}

function expectFile(file) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`${file}: expected file to exist`);
    return false;
  }
  return true;
}

function parseGitHubRepositoryUrl(value, label, options = {}) {
  const { recordError = true } = options;
  if (typeof value !== 'string' || !value.trim()) {
    if (recordError) {
      errors.push(`${label}: expected a non-empty GitHub repository URL`);
    }
    return null;
  }

  try {
    const parsed = new URL(value.trim().replace(/\.git$/, ''));
    const [owner, repo, ...rest] = parsed.pathname.replace(/^\//, '').split('/');
    if (parsed.hostname !== 'github.com' || !owner || !repo || rest.length) {
      if (recordError) {
        errors.push(`${label}: expected https://github.com/<owner>/<repo>[.git], got ${JSON.stringify(value)}`);
      }
      return null;
    }
    return {
      owner,
      repo,
      url: `https://github.com/${owner}/${repo}`,
    };
  } catch (error) {
    if (recordError) {
      errors.push(`${label}: expected a valid URL, got ${JSON.stringify(value)} (${error.message})`);
    }
    return null;
  }
}

const bookConfig = readJson('book-config.json');
const pkg = readJson('package.json');
const lock = readJson('package-lock.json');
const rootConfig = parseYamlScalars(readText('_config.yml'));
const docsConfig = parseYamlScalars(readText('docs/_config.yml'));
const docsIndex = parseFrontMatter('docs/index.md');
const navigationText = readText('docs/_data/navigation.yml');

const packageRepositoryInfo = parseGitHubRepositoryUrl(
  pkg.repository && pkg.repository.url,
  'package.json repository.url'
);
const fallbackRepositoryInfo = packageRepositoryInfo ||
  parseGitHubRepositoryUrl(rootConfig.repository, '_config.yml repository', { recordError: false }) ||
  parseGitHubRepositoryUrl(docsConfig.repository, 'docs/_config.yml repository', { recordError: false });
const owner = fallbackRepositoryInfo ? fallbackRepositoryInfo.owner : 'itdojp';
const repo = fallbackRepositoryInfo ? fallbackRepositoryInfo.repo : (pkg.name || 'engineering-documentation-book');
const repoUrl = `https://github.com/${owner}/${repo}`;
const pagesUrl = `https://${owner}.github.io/${repo}/`;
const issuesUrl = `${repoUrl}/issues`;
const baseurl = `/${repo}`;

expectEqual('package.json name', pkg.name, repo);
expectEqual('package.json version', pkg.version, bookConfig.version);
expectEqual('package.json description', pkg.description, bookConfig.description);
expectEqual('package.json license', pkg.license, 'CC-BY-NC-SA-4.0');
expectEqual('package.json repository.url', pkg.repository && pkg.repository.url, `${repoUrl}.git`);
expectEqual('package.json homepage', pkg.homepage, pagesUrl);
expectEqual('package.json bugs.url', pkg.bugs && pkg.bugs.url, issuesUrl);
expectEqual('package.json scripts.check:metadata', pkg.scripts && pkg.scripts['check:metadata'], 'node scripts/check-metadata-consistency.js');

expectEqual('package-lock.json name', lock.name, repo);
expectEqual('package-lock.json version', lock.version, bookConfig.version);
expectEqual('package-lock.json packages[""].name', lock.packages && lock.packages[''] && lock.packages[''].name, repo);
expectEqual('package-lock.json packages[""].version', lock.packages && lock.packages[''] && lock.packages[''].version, bookConfig.version);
expectEqual('package-lock.json packages[""].license', lock.packages && lock.packages[''] && lock.packages[''].license, 'CC-BY-NC-SA-4.0');

for (const [file, config] of [['_config.yml', rootConfig], ['docs/_config.yml', docsConfig]]) {
  expectEqual(`${file} title`, config.title, bookConfig.title);
  expectEqual(`${file} description`, config.description, bookConfig.description);
  expectEqual(`${file} author`, config.author, bookConfig.author);
  expectEqual(`${file} version`, config.version, bookConfig.version);
  expectEqual(`${file} url`, config.url, `https://${owner}.github.io`);
  expectEqual(`${file} baseurl`, config.baseurl, baseurl);
  expectEqual(`${file} repository`, config.repository, repoUrl);
}

expectEqual('docs/index.md front matter title', docsIndex.title, bookConfig.title);
expectEqual('docs/index.md front matter description', docsIndex.description, bookConfig.description);
expectEqual('docs/index.md front matter author', docsIndex.author, bookConfig.author);
expectEqual('docs/index.md front matter version', docsIndex.version, bookConfig.version);

const navigationChapters = parseNavigationList(navigationText, 'chapters');
const navigationAppendices = parseNavigationList(navigationText, 'appendices');
expectEqual('navigation chapter count', navigationChapters.length, bookConfig.structure.chapters.length);
expectEqual('navigation appendix count', navigationAppendices.length, bookConfig.structure.appendices.length);

bookConfig.structure.chapters.forEach((chapter, index) => {
  const expectedPath = `/chapters/${chapter.id}/`;
  const item = navigationChapters[index] || {};
  expectEqual(`navigation chapter[${index}].title`, item.title, chapter.title);
  expectEqual(`navigation chapter[${index}].path`, item.path, expectedPath);

  const file = `docs/chapters/${chapter.id}/index.md`;
  if (expectFile(file)) {
    const front = parseFrontMatter(file);
    expectEqual(`${file} front matter title`, front.title, chapter.title);
    expectTruthy(`${file} front matter order`, front.order);
  }
});

bookConfig.structure.appendices.forEach((appendix, index) => {
  const expectedPath = `/appendices/${appendix.id}/`;
  const item = navigationAppendices[index] || {};
  expectEqual(`navigation appendix[${index}].title`, item.title, appendix.title);
  expectEqual(`navigation appendix[${index}].path`, item.path, expectedPath);

  const file = `docs/appendices/${appendix.id}/index.md`;
  if (expectFile(file)) {
    const front = parseFrontMatter(file);
    expectEqual(`${file} front matter title`, front.title, appendix.title);
    expectTruthy(`${file} front matter order`, front.order);
  }
});

if (errors.length) {
  console.error('Metadata consistency check failed:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log('Metadata consistency check passed.');
console.log(`Repository: ${owner}/${repo}`);
console.log(`Version: ${bookConfig.version}`);
console.log(`Pages: ${pagesUrl}`);
