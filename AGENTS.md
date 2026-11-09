# React Agent Rules

- This project is the React + Next.js sibling of `nexa-admin`.
- Keep `pnpm dev` directly runnable, but do not start the dev server unless explicitly requested.
- Before delivery, run `pnpm check`; if it fails, report the failed command, key error, and residual risk.
- Use TypeScript strict mode, React function components, Next App Router, shadcn/ui-style local components, Radix primitives, lucide-react icons, Tailwind CSS v4, Axios from `src/api/request.ts`, and the local i18n dictionary.
- All visible UI copy should come from `src/locales/lang/**` through `useI18n()`.
- Keep API/store models aligned with declared backend fields; derive labels and placeholders only in components.
