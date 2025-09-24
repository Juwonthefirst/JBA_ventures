# Copilot Instructions for JBA_ventures

## Project Overview

- This is a React + TypeScript project using Vite for fast development and builds.
- The `src/` directory contains all source code, organized by feature and UI domain.
- Major UI components are grouped under `src/components/`, with further subfolders for admin, forms, header, home, and UI primitives.
- Routing is handled in `src/router.ts`.
- State management appears to use reducers (see `src/reducers/authReducer.ts`).
- Static assets (images, fonts, data) are under `src/assets/`.

## Key Patterns & Conventions

- **Component Structure:**
  - Use function components with TypeScript (`.tsx`).
  - Co-locate related files (e.g., form fields, admin property forms) in feature folders.
  - UI primitives (buttons, dialogs, skeletons) are in `src/components/ui/`.
- **Data:**
  - Static data (states, LGAs) is in `src/assets/data/` as JSON.
  - Use helper functions from `src/helper.ts` and `src/lib/utils.ts` for shared logic.
- **Forms:**
  - Form logic is modularized: see `src/components/form/` and `src/components/admin/property-form/`.
- **Authentication:**
  - Custom hooks like `use-auth.ts` manage auth logic.
- **Admin vs. User:**
  - Admin pages/components are under `src/components/admin/` and `src/pages/admin/`.
  - Main user-facing pages are in `src/pages/`.

## Developer Workflows

- **Build:** Use Vite (`vite.config.ts`).
- **Type Checking:** Run `tsc` (uses `tsconfig.json`, `tsconfig.app.json`).
- **Linting:** Configured via `eslint.config.js`.
- **Entry Point:** App starts at `src/main.tsx`.
- **Routing:** Managed in `src/router.ts`.

## Integration & External Dependencies

- Uses Vite, React, TypeScript, and likely shadcn/ui for UI primitives (see `src/components/ui/shadcn-io/`).
- Static assets are referenced directly from `public/` and `src/assets/`.

## Examples

- To add a new admin form section: create a new `.tsx` file in `src/components/admin/property-form/` and import it in the relevant parent form.
- To add a new page: create a `.tsx` file in `src/pages/` and update `src/router.ts`.

## Tips for AI Agents

- Prefer TypeScript for all new code.
- Follow the existing folder structure for new features/components.
- Reference `src/components/ui/` for reusable UI patterns.
- Use static data from `src/assets/data/` when possible.
- Keep admin and user-facing logic separate as per current structure.
