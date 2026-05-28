# AI Prompts Log

Record of the AI assistance used to build the Cloud Forex Servers block: the tool/model,
the workflow, the prompts (translated to English and grouped by phase), and token/cost usage.

## Tool & model

- **Tool:** Claude Code (CLI). _The task mentions Cursor; I used Claude Code instead — the
  usage figures below are from Claude Code's `/usage`._
- **Model:** **Claude Opus 4.8** (primary) + **Claude Haiku 4.5** (minor background work).

## Token / cost usage

From Claude Code `/usage` (this machine, the build session):

- **Total cost:** **$76.21**
- **Duration:** API 2h 34m 28s · wall 4h 49m 18s
- **Code changes:** +3424 / −698 lines
- **By model:**
  - **Claude Opus 4.8** — 65.2k input, 496.9k output, 192.2M cache read, 1.1M cache write
    (**$73.65**)
  - **Claude Haiku 4.5** — 27.4k input, 20.3k output, 2.6M cache read, 135.3k cache write
    (**$2.56**)

## Workflow

**Planning.** Stack fixed up front: React 19 + TS + Vite, SCSS, PrimeReact (Lara), TanStack
Query for server state, local `useState` + Zustand for UI state. The app shell (layout,
routing, theme, loader) already existed; this session built the Forex block on top.

**How it went (what after what).**

1. Set the default theme to dark and wired theme colour tokens from the Figma (background
   radial gradient, text, label) into CSS variables, with light-theme analogs.
2. Reviewed the design and proposed a component tree (`App*` PrimeReact wrappers,
   `index.{tsx,scss}` folders, hybrid `.p-*` overrides). Decided: show 4 datacenters incl.
   USA (matches the mockup), build on PrimeReact, use `flag-icons`.
3. **Probed the live API** to learn its real shape: it's a **POST** with
   `application/x-www-form-urlencoded` (GET → "Method Not Allowed"); Forex tariffs are the
   elems with `fgroup_2 == "9"`; datacenter ids 12/17/19/21; period keys -50/1/3/6/12. Wrote
   typed `pricelist.ts` + `useTariffs` from this.
4. Built the data layer, the reusable `ui/` wrappers, the global `.p-*` overrides, and the
   feature block (`ForexPlans` → toolbar → grid → card).
5. Switched the whole codebase from CSS Modules to **global BEM SCSS** and updated `CLAUDE.md`.
6. Got **Figma MCP** access to a copy of the file and pulled exact design context to align the
   card 1:1 — typography, colours (accent `#FF4AB7`, title `#432B54`, …), 32px radius, the
   light spec pill, the feature/terminals gradient pills, and the BEST CHOICE badge with a
   gradient border.
7. Recreated the icons as **inline SVG components** from the Figma exports (chart, monitor,
   question, ellipsis, check, shopping bag).
8. Iterated on many small details against the design: per-tier chart-icon layout (2/3/4/6),
   badge sizing, the purple params dropdown, hover states (magenta title, white price,
   gradient stroke, top light streak), the buy pill + bag acting as one unit, and the
   "more" icon rotating on open.
9. **Extracted every colour into `--app-*` CSS variables** and implemented full **light +
   dark themes** (light theme keeps black/pink cards on a soft-lavender page).
10. Full **responsive** pass (4 → 2 → 1 columns; toolbar and switcher reflow), branded the
    global loader, then a final cleanup (stripped comments, Prettier).

**AI vs. by hand.**

- **AI (Claude Code):** all the implementation — components, SCSS, API parsing, theming,
  responsive rules, icon components, build/lint fixes, and reading exact values from Figma
  via the MCP server.
- **By hand / human-driven:** every design decision and the tight visual review loop —
  comparing each iteration against the Figma, feeding exact colours/spacings, and approving or
  correcting each change.

**Difficulties.**

- The pricelist API only works as a **POST form-encoded** request, and it does an _exact_
  content-type match — it rejects the `;charset=utf-8` axios appends to a `URLSearchParams`
  body (HTTP 400). Fixed by sending `body.toString()` with an explicit content-type.
- The mockup shows **4 datacenters (incl. USA)** while the task text says only 3 (12,17,19) —
  kept 4 to match the design (USA = datacenter 21, which the API returns).
- The Lara theme ships **no ProgressSpinner CSS** in this setup, so the loader spinner was
  styled from scratch with custom keyframes.
- The marketing copy (features, tags, terminals, BEST CHOICE/highlight) isn't in the API, so
  it lives as static per-tier content in `tariffContent.ts`.

## Prompts (representative, grouped by phase)

1. Set the default theme to dark.
2. Here are the dark-theme colours — wire them into variables (background radial gradient
   `#261433 → #160720`, text `#FFFFFF`, labels `#FFF599`); then derive matching light-theme
   values.
3. Review the design and propose the components needed for layout and future API wiring;
   I use PrimeReact — propose the wrappers and customisation accordingly.
4. Start building. (→ probe the API, build data layer + UI wrappers + feature block.)
5. The datacenter switch doesn't seem to filter — check it. (→ fixed `optionValue`, and the
   `.p-button-group` class.)
6. Convert the project to global BEM; then convert the remaining components too and sync
   `CLAUDE.md`.
7. Do you have access to this Figma file? (→ used a shared copy + Figma MCP.)
8. Align the Tariff Component fully with Figma — pull exact tokens/sizes.
9. Make the icons custom inline-SVG components. (→ added each icon from its Figma SVG.)
10. A series of pixel-level corrections: badge size, spec pill (radius/gradient/border),
    dropdown spacing & typography, chart-icon arrangement per card, datacenter active state,
    control heights (55/42), white dropdown icons, "ПОДХОДИТ ДЛЯ" alignment.
11. Hover behaviour: the magenta look as a hover effect on any card; price white; darker
    border in the light theme; a top light streak (small by default, larger on hover);
    the buy pill + bag react as one; the "more" icon rotates and turns white when open.
12. Params dropdown: purple styling from Figma; open on hover (desktop) / click (≤1024);
    keep it open when the cursor moves onto it.
13. Extract all colours into variables and implement proper light and dark themes; make the
    light-theme cards black with pink; remove the light-theme top streak.
14. Make the full responsive layout.
15. Style the global loader to match the project.
16. Remove all of your comments from the code; update the README and this prompts log.
