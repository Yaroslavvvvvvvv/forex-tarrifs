# Cloud Forex Servers

Pricing block for **Cloud Forex Servers**, built to match a Figma design. It fetches tariffs
from the API, keeps only **Forex** plans, and renders the tariff cards with a datacenter
switcher, a billing-period switcher with dynamic price updates, a params dropdown, and a buy
button whose link carries each tariff's unique id. Ships with **light and dark themes**.

**Live demo:** https://majestic-biscochitos-c29ca2.netlify.app/

## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **SCSS** — global tokens (`_vars`, auto-injected) + **global BEM** classes per component
  (`index.scss`, side-effect imported; no CSS Modules)
- **PrimeReact 10** (Lara theme) — `SelectButton` (datacenter), `Dropdown` (period),
  `OverlayPanel` (params popover), `ProgressSpinner` (loader); customised via `.p-*` overrides
- **TanStack Query** — server state / data fetching
- **Zustand** — UI state (theme + global loader)
- **React Router 7** — routing (`/`, error pages)
- **axios** — HTTP client
- **flag-icons** — datacenter flags
- **Inter** (self-hosted via `@fontsource-variable/inter`)

## Features

- **Tariff cards** pixel-matched to Figma (header, spec pill, terminals, features checklist,
  tags, BEST CHOICE badge, buy button + bag icon).
- **Datacenter switcher** — Poland / Netherlands / Germany / USA. Tariffs are filtered client
  side, so switching is instant (one fetch covers all datacenters).
- **Billing-period switcher** — 1 day / 1 / 3 / 6 / 12 months; prices update dynamically.
- **Params dropdown** — opens on hover (desktop) or click (≤1024px) and lists the tariff's
  technical params.
- **Buy link** — carries the tariff's unique pricelist id.
- **Theming** — light + dark, driven by `--app-*` CSS variables; toggle lives in the header.
- **Responsive** — 4 → 2 → 1 columns; the toolbar and switcher reflow on small screens.

## Getting started

Requires Node `>=20.19` or `>=22.12`.

```bash
npm install
npm run dev      # dev server at http://localhost:4321
```

### Scripts

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`           |
| `npm run build`   | Type-check (`tsc -b`) + production build |
| `npm run preview` | Preview the production build             |
| `npm run lint`    | ESLint                                   |
| `npm run format`  | Prettier over the whole project          |

## Project structure

```
src/
├── api/
│   ├── http.ts            # axios instance + 404/500 interceptors (silent opt-out)
│   ├── services/
│   │   └── pricelist.ts   # POST form-encoded fetch, parse, filter Forex
│   └── queries/
│       └── useTariffs.ts  # TanStack Query hook
├── components/
│   ├── common/ErrorPage/  # shared error page
│   ├── icons/             # inline SVG icon components (chart, monitor, check, …)
│   └── ui/                # reusable PrimeReact wrappers
│       ├── AppButton/  AppSelect/  AppSegmented/  AppTag/  AppPopover/
│       ├── AppMainLoader/  AppThemeToggle/
├── layout/main/           # MainLayout + Header + Footer (page transitions)
├── lib/queryClient.ts     # shared TanStack QueryClient
├── pages/
│   ├── Main/
│   │   ├── index.tsx
│   │   └── components/     # the Forex feature block (co-located)
│   │       ├── ForexPlans/  PlansToolbar/(DataCenterSwitcher, PeriodSelect)
│   │       ├── TariffGrid/  TariffCard/(+ spec.ts)  tariffContent.ts
│   ├── Page404/  Page500/
├── router/                # createBrowserRouter config
├── store/appStore.ts      # Zustand: theme + global loader
├── styles/
│   ├── _vars, _mixins, _reset, _transition, global.scss
│   └── prime/             # global .p-* overrides (selectbutton, dropdown, overlay)
├── types/tariff.ts        # API + domain types
└── utils/                 # constants, format, storage, error
```

## API & CORS

Tariffs come from the pricelist endpoint. **It is a POST** with an
`application/x-www-form-urlencoded` body (GET and `;charset=utf-8` are rejected):

```
func: v2.instances.order.pricelist
out: json
lang: en
page: 1
page_size: 999
datacenter: 12,17,19,21   # Poland, Netherlands, Germany, USA
```

Base host: `https://api.zomrodev.online/v1/api/proxy/`. Only **Forex** tariffs are kept
(`fgroup_2 == "9"`).

To avoid CORS, the app calls the `/api` prefix instead of the host directly:

- **dev** — proxied by Vite (`server.proxy` in `vite.config.ts`)
- **prod** — proxied by Netlify (`netlify.toml`)

Override the base URL with `VITE_API_URL` (defaults to `/api`). See `.env.example`.

> The cards' marketing copy (features, tags, terminals count, BEST CHOICE / highlight flags)
> is not returned by the API — it is static per-tier content in `tariffContent.ts`.

## Deploy (Netlify)

`netlify.toml` is preconfigured (build command, `dist` publish dir, SPA fallback, and the
`/api/*` proxy redirect). Connect the repo to Netlify or run `netlify deploy`.

## Docs

- `docs/TASK.md` — original assignment specification (uk).
- `docs/PROMPTS.md` — AI prompts, model, token/cost usage and workflow (submission requirement).
- `CLAUDE.md` — architecture and conventions for AI agents.
