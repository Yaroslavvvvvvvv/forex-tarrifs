# CLAUDE.md

Guidance for Claude Code / Cursor when working in this repository.

## Task

Implement the **Cloud Forex Servers** pricing block per the Figma design:
tariff cards, datacenter switcher (Poland / Netherlands / Germany), billing-period
switcher with dynamic price updates, a buy button whose link carries the tariff's
unique id, and a dropdown showing tariff params.

## Commands

| Command           | Action                                   |
| :---------------- | :--------------------------------------- |
| `npm run dev`     | Dev server at `localhost:4321`           |
| `npm run build`   | Type-check (`tsc -b`) + production build |
| `npm run preview` | Preview the production build             |
| `npm run lint`    | ESLint                                   |
| `npm run format`  | Prettier over the whole project          |

## Tech Stack

React 19 + Vite + TypeScript. **SCSS** with **global BEM** classes per component
(`index.scss`, side-effect imported) — block `.tariff-card`, element `&__name`,
modifier `&--highlighted`. No CSS Modules.

- **PrimeReact 10** with the **Lara** theme — legacy CSS theming, NOT Aura/@primeuix
  (Aura needs PrimeReact 11, alpha-only). Components are imported explicitly.
- **TanStack Query** — server state (the API fetch); `useState` + a small loader
  context for UI state. **No Redux/Zustand.**
- **React Router 7** (data router), **react-transition-group** (page fade), **axios**,
  **@fontsource-variable/inter** (self-hosted Inter).

## Architecture

### Structure

- `src/api/http.ts` — axios instance + response interceptor: `500` → `/server-error`,
  `404` → `/page-not-found`. Pass `{ silent: true }` on a request to skip that redirect
  and handle the error locally (use this for the tariffs fetch).
- `src/api/services/` — API service modules (axios calls, e.g. the pricelist) — to build.
- `src/api/queries/` — TanStack Query hooks (e.g. `useTariffs`) — to build.
- `src/lib/queryClient.ts` — shared TanStack `QueryClient`.
- `src/store/appStore.ts` — Zustand app store: theme (`theme`, `setTheme`, `toggleTheme` +
  `applyTheme`/`getInitialTheme` helpers) and the global loader (`loaderCount`,
  `showLoader`/`hideLoader`).
- `src/hooks/` — reusable hooks (currently empty).
- `src/components/ui/` — UI widgets: `AppMainLoader`, `AppThemeToggle`.
- `src/components/common/` — shared composite components: `ErrorPage`.
- `src/layout/main/` — `MainLayout` (Header + `<Outlet/>` + Footer; sticky footer; page
  transitions) plus its `Header/` and `Footer/`.
- `src/pages/` — `Main`, `Page404`, `Page500`.
- `src/router/index.tsx` — `createBrowserRouter`: `/` (Main), `/server-error`, `/page-not-found`,
  catch-all `*` → Page404. Single shared `MainLayout`.
- `src/types/` — domain/API types (`tariff.ts`).
- `src/utils/` — `constants.ts` (datacenters 12/17/19, periods), `format.ts` (price),
  `storage.ts` (prefixed localStorage), `error.ts` (`getRequestError`).
- `src/styles/` — `_vars.scss`, `_mixins.scss` (auto-injected via vite.config.ts),
  `_reset.scss`, `_transition.scss`, `global.scss`.

### Bootstrap (`main.tsx`)

Provider order: `PrimeReactProvider` → `QueryClientProvider` → `App`. `App` renders
`<AppMainLoader/>` + `<RouterProvider/>` + React Query Devtools (dev only).
`applyTheme(getInitialTheme())` runs before first paint; Inter is imported here alongside the
Lara light theme.

### Global loader

`AppMainLoader` (fixed overlay, PrimeReact `ProgressSpinner`) is visible when either the
manual loader is active (`useAppStore` `showLoader()` / `hideLoader()`, ref-counted) **or**
any query is fetching (`useIsFetching()`).

### Theme (light/dark)

Light Lara theme is bundled; dark is a lazy `<link>` swapped in by `applyTheme` plus a
`.theme-dark` class on `<html>`. Custom chrome uses `--app-*` CSS variables (defined in
`global.scss`, overridden under `:root.theme-dark`) so it flips with PrimeReact. Choice is
persisted via `storage` (`forex_theme`) in the Zustand `appStore`. Toggle lives in `Header`.

### Page transitions

`MainLayout` wraps `useOutlet()` in `SwitchTransition mode="out-in"` + `CSSTransition`
(`classNames="fade"`, 600ms, keyed by pathname). `nodeRef` is **required** (React 19 removed
`findDOMNode`). Fade classes live in `_transition.scss`.

## API

Pricelist via the proxy: `func:v2.instances.order.pricelist`, params
`out:json lang:en page:1 page_size:999 datacenter:12,17,19`. Filter **Forex** tariffs only.
Base host: `https://api.zomrodev.online/v1/api/proxy/`.

**CORS:** never call the host directly from the browser. Use the `/api` prefix —
proxied in dev via `vite.config.ts` (`server.proxy`) and in prod via `netlify.toml`.

## Conventions

- Path alias `@` → `src/`.
- Prettier: single quotes, semicolons, 2-space indent, 100 char width, trailing commas.
- PrimeReact components are imported explicitly (no auto-import resolver, unlike PrimeVue).
- Component folder pattern: `index.tsx` + `index.scss` (global BEM, `import './index.scss'`).
- BEM naming: block = kebab-case class, element = `&__name`, modifier = `&--variant`.
  Reusable `App*` wrappers live in `src/components/ui/`; feature components are
  co-located under `src/pages/Main/components/`. Global PrimeReact `.p-*` overrides
  live in `src/styles/prime/`.
- Media queries: raw `@media screen and (max-width: Npx)`, not the `media-down` mixin.
- Keep it lean — this is a single block, not a full app.
