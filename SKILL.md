---
name: persistent-memory
description: Use when a user wants cross-session personal context shared by compatible AI agents, or asks to load, save, inspect, archive, recover, clean up, or upgrade local memory files.
---

# Persistent Memory System

Persistent Memory is a transparent local context layer. It stores reviewed user context as Markdown files so compatible agents can read the same source of truth.

**v0.7.1:** This release hardens lifecycle safety and existing-memory upgrades. It does not add Summary-first or section-level loading.

## Runtime Contract

The skill is an instruction set, not a background service. Shared memory works only when all of these conditions hold:

- each agent can discover this skill or an equivalent fallback instruction;
- the agents use the same local filesystem and the same `~/.persistent-memory/` path;
- the active user has permission to read and write that path.

Platform memory may coexist. Persistent Memory does not import historical chats or replace an agent's built-in memory.

## Memory Location and Scope

`~/.persistent-memory/`

```text
~/.persistent-memory/
├── _core/                 # Baseline context; loaded when the skill is activated
│   ├── profile.md
│   └── preferences.md
├── _index.md              # One-line routes for active on-demand memory
├── projects/              # Active, on-demand Markdown memory
├── notes/                 # Active, on-demand Markdown memory
└── _archive/              # Excluded from normal loading
    ├── _index.md          # Archive and trash records
    └── _trash/            # Recoverable deletion buffer
```

Store stable context, decisions, concise project state, and pointers to source material. Keep raw repositories, downloads, media files, and datasets in their project workspaces; store a short description and path in memory instead.

## Loading

### Load Baseline Context

Trigger: `load memory`, `加载记忆`, `what do you know about me`, or `我的背景`.

When this skill is active:

1. Read every file in `_core/`.
2. Read `_index.md`.
3. Briefly acknowledge that baseline context is loaded. Do not claim to have loaded every project or note.

Never read `_archive/` or `_archive/_index.md` during normal loading.

### Load On Demand

Trigger: the active conversation matches an entry in `_index.md`.

1. Select only the relevant active memory files from their index summaries.
2. Read those file(s).
3. Use the information naturally.

## Saving

Trigger: `remember this`, `记住这个`, `save this`, `更新记忆`, `update memory`, `update my profile`, or `add to notes`.

1. Read the target file first if it already exists.
2. Propose the exact content, destination, and index change.
3. Wait for user confirmation.
4. Save only the confirmed content; update `_index.md` for active on-demand files.

For a vague update request, list explicit facts and inferred patterns separately, then wait for the user to approve individual items.

### First Save

When the memory root does not exist and the user confirms the first save:

1. Create `_core/`, `projects/`, `notes/`, `_archive/`, and `_archive/_trash/`.
2. Create `_index.md` and `_archive/_index.md`.
3. Save the approved content and report the created structure.

## Upgrade Existing Memory

Trigger: `memory upgrade` or `升级记忆`.

Use this for a memory root created before lifecycle support, or whenever `_archive/`, `_archive/_trash/`, or `_archive/_index.md` is missing.

1. Inspect the current root and list only the missing lifecycle paths.
2. Preview that the upgrade creates the missing folders or empty archive index only; it must not move, rewrite, summarize, or delete active memory.
3. Wait for **explicit user confirmation**.
4. Create only the confirmed missing structure and report the result.

Before `archive`, `delete`, `recover`, or `memory health`, verify that lifecycle structure exists. If it does not, direct the user to `memory upgrade`; do not perform the requested lifecycle mutation.

## Lifecycle Safety Contract

Every lifecycle command requires this validation before any move:

1. Accept a normalized **relative path** such as `projects/old.md`.
2. Reject absolute paths, home-path aliases, drive paths, and paths containing `..`.
3. Resolve the candidate path and verify it remains inside `~/.persistent-memory/`.
4. Never operate on `_core/`, `_index.md`, `_archive/_index.md`, hidden metadata, or lifecycle control directories.
5. Preview the source, destination, index changes, and recovery consequence; wait for **explicit user confirmation** before changing files.

## Archive

Trigger: `archive <relative-path>`, `归档 <相对路径>`, or `move to archive`.

Archive only an active on-demand file that passed the safety contract.

Use these categories:

- **Keep active:** current work or material likely needed soon.
- **Archive:** completed, low-frequency material that may be useful for future reference.
- **Delete:** clearly obsolete or duplicate material with no plausible future value; archive it first.

After confirmation:

1. Move the file to `_archive/<relative-path>`.
2. Remove its active `_index.md` entry.
3. Add its original path, archive date, and user-provided reason to `_archive/_index.md`.
4. Confirm the final location.

## Delete

Trigger: `delete <relative-path>`, `删除 <相对路径>`, or `remove file`.

Delete only a previously archived file. If the user supplies an active file, explain that it must be archived first and offer the archive preview instead.

After confirmation:

1. Move `_archive/<relative-path>` to `_archive/_trash/<relative-path>`.
2. Record the deletion date and a 30-day recovery deadline in `_archive/_index.md`.
3. Confirm the final location and deadline.

Never permanently remove a file automatically. During a health check, list expired trash items and wait for a separate explicit confirmation before permanent removal.

## Recover

Trigger: `recover <relative-path>`, `恢复 <相对路径>`, or `restore file`.

Recover only from `_archive/<relative-path>` or `_archive/_trash/<relative-path>` after the safety contract passes.

After confirmation:

1. Restore the file to its original active on-demand path, recreating its parent directory if necessary.
2. Restore the active `_index.md` entry.
3. Remove or update the matching `_archive/_index.md` record.
4. Confirm the restored location.

## Memory Health

Trigger: `memory health`, `记忆体检`, or `clean up memory`.

1. Scan active on-demand memory only; never scan or propose changes to `_core/` or control files.
2. Identify candidates from inactivity, duplication, or concluded status.
3. Classify each candidate as keep active, archive, or delete using the lifecycle categories above.
4. Present a numbered proposal with a one-line reason per item.
5. Wait for item-by-item user confirmation; never execute automatically.

Also list expired trash items separately and request a separate explicit confirmation before permanent deletion.

## Memory Status

Trigger: `memory status`, `记忆状态`, `what's saved`, or `存了什么`.

Read `_core/` and `_index.md`, then report active file count, approximate size, and one-line summaries. Do not load archive contents unless the user explicitly asks.

## Core Rules

1. Read before writing; never guess file contents.
2. The user decides what is saved, upgraded, archived, deleted, or recovered.
3. Confirm every filesystem change before executing it.
4. Keep `_core/` small and protected.
5. Keep `_index.md` synchronized with active on-demand memory.
6. Treat memory files as plain text; do not store passwords, API keys, or secrets.
7. Do not promise automatic activation, cross-device sync, full-chat import, or full-context loading.
