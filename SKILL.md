---
name: persistent-memory
description: One memory for all your AI agents. Stores your identity, preferences, projects and notes as local markdown files that every agent shares — no more copy-pasting context between tools. Say "load memory" or "加载记忆" to activate.
---

# Persistent Memory System

You manage a cross-session memory system. The user's personal context is stored as markdown files that persist between conversations.

**Primary value: let the user load their personal context quickly, so they never have to repeat themselves.**

## Memory Location

`~/.persistent-memory/`

## Directory Structure

```
~/.persistent-memory/
├── _index.md          # Index of all on-demand files (auto-maintained)
├── _core/             # Always loaded — essential context for every conversation
│   ├── profile.md     #   Identity, background, goals
│   └── preferences.md #   Collaboration style, communication preferences, work habits
├── projects/          # On-demand: specific project details
└── notes/             # On-demand: knowledge, frameworks, learnings
```

Two tiers:
- **Core (`_core/`)**: Loaded in full every time. Keep small — only info needed in every interaction.
- **On-demand (everything else)**: Listed in `_index.md` with one-line summaries. Read full file only when the topic is relevant.

## Conversation Start

Check if `~/.persistent-memory/` exists.

- **Exists**: Read all files in `_core/` + read `_index.md`. Briefly acknowledge context is loaded (1 sentence, don't recite contents).
- **Doesn't exist**: Do nothing until you detect saveable info or user asks to set up memory.

## _index.md Format

```markdown
# Memory Index

## projects/
- side-project.md — Building a recipe app, React + Supabase, in progress
- work-q1.md — Q1 marketing campaign, launched Feb, tracking metrics

## notes/
- design-principles.md — Dieter Rams' 10 principles, applied to UI decisions
```

When saving or updating any on-demand file, always update `_index.md` to reflect the change.

## Operations

### Load Memory (Primary)
Trigger: "load memory" / "加载记忆" / "what do you know about me" / "我的背景" / start of conversation.

1. Read all files in `_core/`.
2. Read `_index.md`.
3. Briefly acknowledge what context is loaded.

### Load On-Demand
Trigger: conversation topic matches an entry in `_index.md`.

1. Identify which file(s) are relevant based on `_index.md` summaries.
2. Check file size:
   - **Under 100 lines**: Read the full file.
   - **100 lines or more**: Read only the `## Summary` section at the top first. If that answers the need, stop. If more detail is needed, then read the full file.
3. No need to announce — use the information naturally.

### Save / Update
Trigger: "remember this" / "记住这个" / "save this" / "更新记忆" / "update my profile" / "add to notes", or user confirms a save reminder.

**If the user specifies what to save:**
1. Determine: `_core/` or on-demand?
2. Read the target file first.
3. Draft the content and show the user: what will be saved, which file, how it will be worded.
4. Wait for user to confirm or adjust.
5. Save. If on-demand file: update `_index.md` summary.

**If the command is vague** (e.g., "update memory" / "更新记忆"):
1. Scan the conversation and identify candidates — look for both:
   - **Explicit info**: facts, decisions, stated preferences, new projects
   - **Implicit info**: revealed patterns, unstated values, thinking style, emotional priorities
2. Present a numbered list: what you propose to save, where, and why.
3. Wait for user to confirm, modify, or add items.
4. Save only what the user approves. Update `_index.md` if needed.

**Never write to memory files without user review.**

**Timing tip**: Memory updates work best at the end of a conversation to avoid interrupting the flow. Mid-conversation saves are fine for urgent items.

### Save Reminder (Bonus)
This feature works only when the skill is active in a conversation. It is not guaranteed to trigger in every conversation.

When you detect the user sharing:
- Personal background, identity, or role information
- New projects, goals, or significant decisions
- Preferences, opinions, or working style
- Valuable conclusions, frameworks, or learnings
- Changes to previously saved information

At a natural pause in the current topic, ask briefly:
> "Want me to save [1-sentence summary] to your memory?"

Rules:
- One reminder per topic, not per message.
- If the user declines, don't ask again for the same content.
- Don't interrupt active problem-solving or deep discussion.
- Keep the ask short — one line, not a paragraph.

### First Save (Initialization)

When memory directory doesn't exist and user confirms the first save:
1. Create the directory structure (`_core/`, `projects/`, `notes/`, `_index.md`).
2. Save the content to the appropriate file.
3. Briefly explain: "I've set up a memory system. I'll remember this across conversations. Say 'load memory' at the start of future conversations to activate it."

No formal setup wizard. Memory builds naturally through conversation.

### Memory Status
Trigger: "memory status" / "记忆状态" / "what's saved" / "存了什么".

1. Read `_index.md` and list all `_core/` files.
2. For each file: name + one-line summary.
3. Show total count and approximate size.

## Core Rules

1. **Always read before writing.** Never modify a file you haven't read in this conversation.
2. **User decides what to save.** Suggest, never auto-save silently.
3. **Confirm every change.** After any edit, state what changed and where.
4. **Don't fabricate.** If unsure about memory contents, read the file. Don't guess.
5. **Keep files clean.** Update existing entries rather than appending duplicates. Remove outdated info when updating.
6. **Keep core small.** Only put universally needed context in `_core/`. Topic-specific details go to on-demand files.
7. **Index always in sync.** Every save/update/delete to on-demand files must update `_index.md`.
8. **No sensitive data.** If user tries to store passwords or API keys, warn them that memory files are plain text.
9. **Maintain summaries for large files.** When a file reaches 100 lines or more, add or update a `## Summary` section (5–10 lines) at the top of the file. This summary should capture the key points so the AI can decide whether to read the full content.
