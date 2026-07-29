# Gitflow Workflow

This repository uses a pragmatic Gitflow model. `main` represents production, while `develop` is the integration branch for planned landing-site work.

## Quick Path

1. Start with a GitHub issue labeled `status:approved`.
2. Branch from `develop` using the issue number and a short description.
3. Implement one reviewable issue scope and run the required checks.
4. Open a PR to `develop` with `Closes #N` and exactly one `type:*` label.
5. Promote a tested release from `develop` to `main` through a release PR.

## Branch Rules

| Branch | Purpose | Source and destination |
|---|---|---|
| `main` | Production-ready site | Protected from direct commits; receives release and hotfix PRs. |
| `develop` | Integration for approved work | Receives feature, fix, docs, and maintenance PRs. |
| `feature/<issue>-short-name` | User-facing capability | Branch from `develop`; PR back to `develop`. |
| `fix/<issue>-short-name` | Non-production defect | Branch from `develop`; PR back to `develop`. |
| `docs/<issue>-short-name` | Documentation-only work | Branch from `develop`; PR back to `develop`. |
| `chore/<issue>-short-name` | Tooling or repository maintenance | Branch from `develop`; PR back to `develop`. |
| `release/<version-or-date>` | Production release preparation | Branch from `develop`; PR to `main`, then merge release-only fixes back to `develop`. |
| `hotfix/<issue>-short-name` | Urgent production correction | Branch from `main`; PR to `main`, then merge the fix back to `develop`. |

Use lowercase names with hyphens, for example `feature/14-contact-actions` or `fix/27-canonical-url`.

## Pull Request Rules

- Do not commit directly to `main`.
- Use PRs for changes entering `develop` or `main`.
- Keep each branch and PR limited to one approved issue or one explicitly agreed review slice.
- Include `Closes #N` in the PR description.
- Apply exactly one `type:*` label.
- Use Conventional Commits such as `feat(contact): add WhatsApp action` or `docs(workflow): define release flow`.
- Keep implementation, verification, and related documentation in the same work unit.
- Never include secrets, `.env` files, private data, or personal machine paths in this public repository.

## Release Flow

1. Confirm the intended changes are integrated and verified on `develop`.
2. Create `release/<version-or-date>` from `develop`.
3. Limit release-branch changes to release blockers, metadata, and deployment preparation.
4. Run `pnpm astro check` and `pnpm build`.
5. Open a release PR to `main` and deploy only after review and passing checks.
6. Merge any release-only corrections back into `develop`.

## Hotfix Flow

1. Create `hotfix/<issue>-short-name` from `main` for an approved urgent production issue.
2. Make the smallest safe correction and run the required checks.
3. Open a PR to `main`.
4. After merge, bring the same correction back into `develop` to prevent regression.
