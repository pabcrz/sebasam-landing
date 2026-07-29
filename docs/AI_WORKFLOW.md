# AI Workflow for SEBASAM Landing

This is the canonical workflow for AI assistants working in this public Astro repository. Tool-specific instruction files must point here instead of duplicating or weakening these rules.

## Quick Path

1. Read the issue, confirm it has `status:approved`, and identify its acceptance criteria.
2. Follow [`docs/GITFLOW.md`](GITFLOW.md) and work on one issue-backed branch.
3. Inspect the current worktree before editing and preserve unrelated user changes.
4. Implement the smallest complete solution within the approved scope.
5. Verify content, accessibility, SEO, Astro checks, and the static production build as applicable.
6. Hand off with changed files, exact verification results, and remaining risks.

## Issue, Branch, and PR Rules

| Topic | Rule |
|---|---|
| Issue first | Implementation starts only from a GitHub issue labeled `status:approved`. New ideas or discovered follow-up work require a separate issue. |
| Scope | One branch and one PR cover one approved issue or one explicitly agreed review slice. Do not bundle unrelated cleanup. |
| Base branch | Feature, fix, docs, and maintenance branches start from `develop`. Release and hotfix branches follow `docs/GITFLOW.md`. |
| Branch name | Include the issue number, for example `feature/14-contact-actions`, `fix/27-canonical-url`, or `docs/31-content-guide`. |
| Issue linkage | Every PR includes `Closes #<number>` for its approved issue. |
| PR label | Every PR has exactly one `type:*` label matching the primary change. |
| Commits | Use atomic Conventional Commits. Keep code, checks, and documentation together when they form one deliverable. |

## Label Taxonomy

| Label | Use |
|---|---|
| `status:needs-review` | Applied automatically to new bug and feature issues awaiting triage. |
| `status:approved` | Applied by a maintainer when an issue is ready for implementation. |
| `bug` | Applied automatically by the bug report form. |
| `enhancement` | Applied automatically by the feature request form. |
| `type:bug` | PR primarily fixes a defect. |
| `type:feature` | PR primarily adds or improves user-facing behavior. |
| `type:docs` | PR changes documentation only. |
| `type:refactor` | PR restructures code without intended behavior changes. |
| `type:chore` | PR primarily changes maintenance, tooling, or build configuration. |
| `type:breaking-change` | PR intentionally introduces an incompatible change. |

Issue forms can apply labels only after those labels exist in the GitHub repository. Maintainers own label creation and apply `status:approved`; contributors select exactly one `type:*` label for each PR.

## Public Repository Safety

- Never commit secrets, credentials, tokens, private keys, `.env` files, private customer data, or internal-only operational data.
- Never commit personal machine paths, editor-specific personal settings, or local service URLs as repository instructions.
- Use placeholders in examples and review diffs for accidental sensitive data before handoff.
- Do not expose unpublished business claims, prices, inventory, ratings, service areas, or customer information.

## Architecture Boundaries

| Topic | Rule |
|---|---|
| Rendering | Prefer Astro components and static HTML. Add client-side JavaScript only when the requirement cannot be met with HTML and CSS. |
| Styling | Use native CSS, shared design tokens, and scoped component styles where appropriate. Do not add Tailwind. |
| UI frameworks | Do not add React or another client framework without an explicitly approved issue and documented need. |
| Data sources | The first release has no CMS, database, Supabase dependency, or runtime API. Do not add one without an explicitly approved issue. |
| Dependencies | Prefer platform and Astro capabilities. Add a package only when the approved requirement justifies its maintenance and client-performance cost. |
| Output | Keep the site compatible with Astro's static output unless an approved issue changes the deployment architecture. |

## Content Source Discipline

- Treat `README.md` as the current product and content brief until a dedicated content source exists.
- Centralize confirmed shared business data in `src/content/business.ts` when implementation begins.
- Pages and components must consume shared business data rather than duplicating phone numbers, addresses, hours, services, products, or map links.
- Keep route-specific metadata distinct while deriving common organization details from the same confirmed source.
- Do not invent or infer business facts. Flag missing or conflicting content for maintainer confirmation.
- Keep public-facing copy in the language established by the product brief; keep technical documentation in clear professional English unless the target document uses another language.

## Accessibility and SEO

- Use semantic HTML and preserve a logical heading structure.
- Ensure complete keyboard access, visible focus states, sufficient contrast, and touch targets of at least 44 CSS pixels.
- Provide useful alternative text for informative images and `alt=""` for decorative images.
- Respect `prefers-reduced-motion` and avoid motion that blocks comprehension or interaction.
- Keep every public route usable without client-side JavaScript unless an approved requirement says otherwise.
- Provide unique titles, descriptions, and canonical URLs per route.
- Keep Open Graph data, local-business structured data, contact details, sitemap, and `robots.txt` consistent with confirmed content.
- Do not publish unverified structured-data claims.

## Checks Before Handoff

Run checks appropriate to the change, with these commands as the minimum implementation baseline:

```bash
pnpm astro check
pnpm build
```

Also review changed Markdown links, YAML syntax, generated routes, metadata, keyboard behavior, responsive layouts, and content consistency when affected.

If `pnpm astro check` requests an optional package that is not installed, report that limitation. Do not add dependencies unless the issue clearly requires them or the maintainer approves the change.

Record the exact command and result for every check. If a check is skipped or blocked, state why and describe the remaining risk.

## References

- [`docs/GITFLOW.md`](GITFLOW.md): branch, PR, release, and hotfix flow.
- [`README.md`](../README.md): product brief, content, architecture, and verification expectations.
- [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md): required PR evidence and checklist.
