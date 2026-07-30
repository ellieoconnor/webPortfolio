# Claude Global Instructions

## Who I Am
I'm a junior-to-mid level developer actively learning. I work primarily in **TypeScript** across **React/Next.js**, **Node/Express**, and **Angular** projects.

## Code Style
- Always use **strict TypeScript** — no `any`, explicit return types on functions, proper interface/type definitions
- Use `unknown` instead of `any` when the type is genuinely uncertain
- Prefer **simple and readable** over clever or abstract
- Follow existing patterns in the codebase before introducing new ones
- Avoid adding dependencies unless truly necessary — explain why if you do

## Error Handling
- Always handle errors explicitly — no silent catches, no empty catch blocks
- Use descriptive error messages
- For async code, handle both the happy path and failure cases

## Testing
- Write tests for critical logic and non-trivial functions
- Don't skip edge cases and error paths in tests
- I'm still building my testing habits — suggest when a test would be especially valuable, but don't always require it

## How to Work With Me
- **Explain what you changed and why** — don't just produce code silently
- **Flag things I might not understand** — if you're using a pattern or concept I may not know, briefly explain it
- **Point out simpler approaches** — if there's a cleaner way to do what I'm asking, say so even if you do what I asked
- Don't over-explain basics, but don't assume I know advanced patterns

## What to Avoid
- Over-engineered solutions — no unnecessary abstractions, factories, or layers
- Verbose boilerplate that obscures what the code actually does
- Ignoring the patterns already present in a project

---
## Agent skills

### Issue tracker

GitHub Issues (`ellieoconnor/anki-voice`), via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five canonical labels, unchanged. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context — `CONTEXT.md` + `docs/adr/` at repo root. See `docs/agents/domain.md`.

---

## Angular Projects
*Apply these rules only when working in Angular codebases.*

### General
- Always use standalone components — do NOT set `standalone: true` in decorators (it's the default in Angular v20+)
- Use signals for state management; use `computed()` for derived state
- Implement lazy loading for feature routes
- Keep state transformations pure and predictable — use `update()` or `set()` on signals, never `mutate()`

### Components
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in all `@Component` decorators
- Use `input()` and `output()` functions instead of decorators
- Keep components small and focused on a single responsibility
- Prefer inline templates for small components
- Use paths relative to the component TS file for external templates/styles
- Do NOT use `@HostBinding` or `@HostListener` — use the `host` object in `@Component`/`@Directive` instead

### Templates
- Use native control flow (`@if`, `@for`, `@switch`) — NOT `*ngIf`, `*ngFor`, `*ngSwitch`
- Use `class` bindings instead of `ngClass`
- Use `style` bindings instead of `ngStyle`
- Use the async pipe to handle observables
- Keep templates simple — avoid complex logic in templates
- Do not assume globals like `new Date()` are available

### Services
- Design services around a single responsibility
- Use `providedIn: 'root'` for singleton services
- Use the `inject()` function instead of constructor injection

### Images
- Use `NgOptimizedImage` for all static images
- Note: `NgOptimizedImage` does not work for inline base64 images

### Accessibility
- All components must pass AXE checks
- Follow WCAG AA minimums — focus management, color contrast, and ARIA attributes
