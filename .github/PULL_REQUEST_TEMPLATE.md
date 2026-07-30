## Linked Issue

Closes #N

The linked issue must have `status:approved` before this PR is opened.

## Type

Check exactly one option and apply the matching `type:*` label to the PR.

- [ ] `type:bug` - Bug fix
- [ ] `type:feature` - New capability or improvement
- [ ] `type:docs` - Documentation only
- [ ] `type:refactor` - Internal restructuring without behavior change
- [ ] `type:chore` - Maintenance, tooling, or build work
- [ ] `type:breaking-change` - Breaking change

## Summary

- <!-- Summarize the outcome in one to three bullets. -->

## Changes

| File or area | Change |
|---|---|
| `path/to/file` | Describe the relevant change. |

## Test Plan

- [ ] `pnpm astro check`
- [ ] `pnpm build`
- [ ] Reviewed affected pages at mobile and desktop sizes, if applicable.
- [ ] Verified keyboard access, focus, contrast, reduced motion, and image alternatives, if applicable.
- [ ] Verified route metadata, canonical URLs, structured data, and public content consistency, if applicable.

Record skipped or blocked checks and their remaining risk:

<!-- Check: reason not run; remaining risk. -->

## Contributor Checklist

- [ ] I linked one approved issue with `Closes #N`.
- [ ] I selected and applied exactly one `type:*` label.
- [ ] This PR contains one scoped, reviewable work unit.
- [ ] Commit messages follow Conventional Commits.
- [ ] I preserved unrelated worktree changes and avoided out-of-scope changes.
- [ ] I did not add secrets, `.env` files, private data, or personal machine paths.
- [ ] Shared business content remains centralized and contains only confirmed claims.
- [ ] I did not add React, Tailwind, a CMS, a database, or an API without explicit issue approval.
- [ ] I updated relevant documentation when behavior or workflow changed.
