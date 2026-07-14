import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('documents an explicit upgrade path for existing memory', async () => {
  const [en, zh] = await Promise.all([read('SKILL.md'), read('SKILL_zh.md')]);

  assert.match(en, /## Upgrade Existing Memory/);
  assert.match(zh, /## 升级已有记忆/);
  assert.match(en, /memory upgrade/);
  assert.match(zh, /升级记忆/);
});

test('limits lifecycle paths and protects core memory', async () => {
  const [en, zh] = await Promise.all([read('SKILL.md'), read('SKILL_zh.md')]);

  assert.match(en, /relative path/i);
  assert.match(zh, /相对路径/);

  for (const text of [en, zh]) {
    assert.match(text, /_core/);
    assert.match(text, /_archive\/_index\.md/);
    assert.match(text, /\.{2}/);
  }
});

test('requires explicit confirmation before lifecycle migration or mutation', async () => {
  const [en, zh] = await Promise.all([read('SKILL.md'), read('SKILL_zh.md')]);

  assert.match(en, /explicit user confirmation/i);
  assert.match(zh, /用户明确确认/);
});

test('states the cross-agent sharing conditions without claiming full-context loading', async () => {
  const [en, zh] = await Promise.all([read('README.md'), read('README_zh.md')]);

  assert.match(en, /same local filesystem/i);
  assert.match(en, /compatible agent/i);
  assert.match(en, /baseline context/i);
  assert.doesNotMatch(en, /Loads your full context/);
  assert.match(zh, /同一.*本地文件系统/);
  assert.match(zh, /基础上下文/);
});

test('keeps raw repositories and media outside managed memory', async () => {
  const [en, zh] = await Promise.all([read('README.md'), read('README_zh.md')]);

  assert.match(en, /raw repositories, downloads, media files, and datasets/i);
  assert.match(zh, /原始仓库、下载文件、媒体文件和数据集/);
});

test('does not present Summary-first loading as a current feature', async () => {
  const [en, zh] = await Promise.all([read('SKILL.md'), read('SKILL_zh.md')]);

  assert.doesNotMatch(en, /100 lines or more.*Summary/s);
  assert.doesNotMatch(zh, /100 行及以上.*Summary/s);
});
