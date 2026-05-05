# Core Learnings

> **Purpose**: Capture insights, patterns, and best practices (accumulates over time)
>
> **Updated**: Automatically by close-session skill after each session

---

## What Works Well

- Auto-memory (`~/.claude/projects/.../memory/`) reliably persists small, structured facts (user identity, brand rules, repo pointers) across sessions. It's the right place for things that should outlive any single Nexus session.

## What to Avoid

- Don't conflate Nexus memory with Claude Code's auto-memory — they are separate systems with different triggers. Be explicit which one you're reading or writing.
- Don't auto-fill `goals.md` or `user-config.yaml` from inferences. Those fields are user-owned; fabricating them creates false context that compounds over future sessions.

## Best Practices

- Run `close-session` at the end of each working session — it's the only mechanism that creates session reports and grows this file. Without it, Nexus memory stays empty regardless of how much work was done.
- When discussing memory state, distinguish: Nexus 01-memory (project-scoped, ritual-based via close-session) vs auto-memory (cross-project, trigger-based on memory-worthy facts).

## Insights

- This Nexus instance had never run close-session before 2026-05-05. The skill is documented as "auto-triggered by all other skills" but in practice nothing had triggered it — meaning `core-learnings.md` and `session-reports/` only grow when the user explicitly closes a session or runs a triggering skill.

---

**Last Updated**: 2026-05-05
