# Agent Instructions

Follow the canonical repository workflow in [`docs/AI_WORKFLOW.md`](docs/AI_WORKFLOW.md).

## Non-Negotiable Rules

- Work from an approved GitHub issue and keep one scoped branch and PR per issue.
- Follow the branch and release model in [`docs/GITFLOW.md`](docs/GITFLOW.md).
- Link every PR with `Closes #N`, apply exactly one `type:*` label, and use Conventional Commits.
- Treat this as a public repository: never add secrets, credentials, private customer data, or personal machine paths.
- Preserve the Astro static-first architecture, TypeScript, and native CSS.
- Do not add React, Tailwind, a CMS, a database, or API integration without an explicitly approved issue.
- Keep shared business content centralized rather than duplicating it across pages or components.
- Run `pnpm astro check` and `pnpm build` before handoff. Report any check that cannot run and why.
