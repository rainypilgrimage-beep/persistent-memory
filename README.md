# persistent-memory

**Stop re-introducing yourself to AI. Install once, remember forever.**

Every new conversation starts from zero — your AI doesn't know who you are, what you're working on, or how you like to collaborate. You end up repeating the same context over and over.

This skill gives your AI a persistent memory. Your identity, preferences, projects, and notes are stored as simple markdown files and loaded into every conversation automatically.

## See It In Action

```
You:  load memory

AI:   Context loaded. I know you're a product designer at a startup,
      currently focused on the v2 redesign. You prefer direct feedback
      and like to think through problems step by step before coding.
      I also have notes on 3 projects and your design principles.

You:  Let's pick up the onboarding flow we discussed last week.

AI:   [reads the relevant project file on demand]
      Right — last time we narrowed it down to two approaches...
```

**That's the experience.** One command, and your AI is no longer a stranger.

## How Is This Different From ChatGPT Memory?

ChatGPT Memory saves things automatically — and often gets it wrong. You can't see what it stored, can't organize it, and can't load it selectively.

This skill flips that: **you decide what to save, you can read and edit every file, and your AI loads only what's relevant.** It's your memory, not the AI's guess.

## Quick Start

1. Install the skill
2. Start a conversation and share something about yourself
3. The AI will ask: *"Want me to save this to your memory?"*
4. Say yes — that's it. Your memory system is set up.

Next time, just say **"load memory"** and your AI knows you.

## What It Does

- **Load your context instantly** — say "load memory" and your AI picks up right where you left off
- **Save what matters** — the AI suggests saving important info, you decide what to keep
- **Two-tier architecture** — essential context (who you are, how you work) loads every time; project details load only when relevant
- **You stay in control** — nothing is saved without your review and approval

## How It Works

```
~/.persistent-memory/
├── _core/             # Always loaded (identity, preferences)
├── _index.md          # Lightweight index of all other files
├── projects/          # Loaded on demand
└── notes/             # Loaded on demand
```

**Core files** load every conversation — your AI always knows the basics.
**Everything else** is indexed with one-line summaries and loaded only when the topic comes up. This keeps token usage low as your memory grows.

## Commands

| Say this | What happens |
|----------|-------------|
| "load memory" | Loads your full context |
| "remember this" / "save this" | Saves info to memory (with your review) |
| "update memory" | AI scans the conversation and suggests what to save |
| "memory status" | Shows all saved files and their summaries |

## Customize

The default structure (`projects/`, `notes/`) is just a starting point. You can:
- **Rename** directories to match your workflow (e.g., `clients/`, `courses/`)
- **Add** new directories anytime — they'll be indexed automatically
- **Reorganize** `_core/` files to fit what *you* need in every conversation

The only fixed parts are `_core/` (always loaded) and `_index.md` (auto-maintained). Everything else is yours to shape.

## Tips

- **Best time to save**: End of conversation — update everything at once without interrupting your flow
- **Keep core small**: Only put info needed in *every* conversation into `_core/`. Everything else goes to `projects/` or `notes/`
- **Works in any language**: Trigger words work in English and Chinese (加载记忆, 记住这个, 记忆状态)

## What About CLAUDE.md?

CLAUDE.md tells AI how to work on your **project** (coding style, tech stack, conventions). This skill tells AI who **you** are (identity, preferences, goals, knowledge). One manages the project, the other manages the person. They work together — not a replacement for either.

## Fallback (Optional)

Skills may not activate in every conversation. For guaranteed memory loading, add this line to your CLAUDE.md:

> When I say "load memory", read files from ~/.persistent-memory/_core/ and ~/.persistent-memory/_index.md

This ensures memory works even when the skill isn't triggered.

## Compatibility

Works with any AI agent that supports the skills protocol, including Claude Code and other agents on [skills.sh](https://skills.sh).

## Privacy

All memory is stored as local markdown files on your machine. Nothing is sent to external servers. Don't store passwords or API keys — memory files are plain text.

## License

MIT
