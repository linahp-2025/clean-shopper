# Clean Shopper — Component Specification

**Version:** 1.0 | **Date:** 2026-04-01
**Design tokens:** All classes reference `tailwind.config.js`. No hex values, pixel sizes, or raw spacing values.

---

## Table of Contents

1. [ProductCard](#1-productcard)
2. [SafetyBadge](#2-safetybadge)
3. [SearchBar](#3-searchbar)
4. [CategoryTag](#4-categorytag)
5. [NavBar](#5-navbar)
6. [Button](#6-button)
7. [InputField](#7-inputfield)
8. [EmptyState](#8-emptystate)
9. [ModeControl](#9-modecontrol)

---

## 1. ProductCard

**Purpose:** Displays a single product summary — name, safety score, category, and description — as a tappable card in search results and the saved library.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | ✅ | Product name |
| `safetyScore` | `'clean' \| 'caution' \| 'avoid'` | ✅ | Drives the SafetyBadge variant |
| `category` | `string` | ✅ | Product category label (e.g. "Dish Soap") |
| `description` | `string` | ✅ | Short AI-generated summary, max ~120 chars |
| `onClick` | `() => void` | ✅ | Handler for navigating to product detail |
| `onSave` | `() => void` | optional | Shows a save icon button when provided |
| `isSaved` | `boolean` | optional | Renders save icon in filled state when true |
| `isLoading` | `boolean` | optional | Shows skeleton shimmer when true |

### Visual Structure

```
┌─────────────────────────────────────────┐  bg-white rounded-lg shadow-sm
│  [CategoryTag]            [SafetyBadge] │  px-6 pt-5 pb-6
│                                         │
│  Product Name                           │  text-xl font-semibold
│                                         │  text-neutral-800 leading-tight
│  Short description text that gives      │  text-sm text-neutral-500
│  the user a quick sense of the product. │  leading-relaxed mt-2
│                                   [💾]  │  IconButton — bottom-right, mt-4
└─────────────────────────────────────────┘
```

**Tailwind classes by element:**

- **Card container:** `bg-white rounded-lg shadow-sm border border-neutral-200 px-6 pt-5 pb-6 flex flex-col gap-3 cursor-pointer transition-shadow duration-fast ease-default`
- **Header row:** `flex items-center justify-between`
- **Product name:** `text-xl font-semibold text-neutral-800 leading-tight`
- **Description:** `text-sm text-neutral-500 leading-relaxed`
- **Footer row:** `flex items-center justify-between mt-1`

### States

| State | Treatment |
|-------|-----------|
| **Default** | `bg-white shadow-sm border-neutral-200` |
| **Hover** | `shadow-md border-neutral-300` — transition `duration-fast ease-default` |
| **Focus (keyboard)** | `ring-2 ring-primary ring-offset-2 outline-none` |
| **Loading** | Replace all content with `SkeletonCard` — animated `bg-neutral-200` shimmer blocks at the same layout positions |
| **Saved** | Save icon fills to `text-primary`; aria-label updates to "Remove from library" |

### Usage Rules

- ✅ Use in search results grid, saved library, and shopping list
- ✅ Always pair with a real `safetyScore` — never render without a badge
- ❌ Do not embed another ProductCard inside a ProductCard
- ❌ Do not use for individual ingredients — use `IngredientRow` instead
- ❌ Do not hardcode description length — truncate via CSS (`line-clamp-3`) not JS

---

## 2. SafetyBadge

**Purpose:** A compact, color-coded pill that communicates a product's safety rating at a glance — clean, caution, or avoid — using semantic color tokens consistently across the app.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `score` | `'clean' \| 'caution' \| 'avoid'` | ✅ | Determines color and label |
| `size` | `'sm' \| 'md'` | optional | `md` default. Use `sm` inside ProductCard; use `md` on the product detail page |
| `showIcon` | `boolean` | optional | Prepends a status icon when true (default `true`) |

### Variant Map

| Score | Background | Text | Icon | Label |
|-------|-----------|------|------|-------|
| `clean` | `bg-success` | `text-white` | ✓ | Clean |
| `caution` | `bg-warning` | `text-white` | ⚠ | Caution |
| `avoid` | `bg-error` | `text-white` | ✕ | Avoid |

### Visual Structure

```
┌──────────────┐
│  ✓  Clean    │   rounded-full px-3 py-1 text-xs font-medium tracking-caps uppercase
└──────────────┘
```

**Tailwind classes by element:**

- **Base (all variants):** `inline-flex items-center gap-1 rounded-full font-medium uppercase tracking-caps`
- **Size md:** `px-3 py-1 text-xs` — product detail page header
- **Size sm:** `px-2 py-0.5 text-xs` — inside ProductCard, alongside the category tag
- **Clean:** `bg-success text-white`
- **Caution:** `bg-warning text-white`
- **Avoid:** `bg-error text-white`

### States

| State | Treatment |
|-------|-----------|
| **Default** | Solid background per variant map |
| **No score / unknown** | Render nothing — do not show a badge with empty or null data |

### Usage Rules

- ✅ Use on ProductCard, product detail header, ingredient rows, and search result metadata
- ✅ Always use the `score` prop to select the variant — never pass a class directly
- ❌ Do not create additional score values beyond `clean`, `caution`, `avoid`
- ❌ Do not change badge colors for decorative purposes — these colors carry meaning

---

## 3. SearchBar

**Purpose:** The primary product lookup input — a prominent, full-width text field with a search icon and clear button, used at the top of the search view.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | Controlled input value |
| `onChange` | `(value: string) => void` | ✅ | Change handler |
| `onSubmit` | `() => void` | ✅ | Fires on Enter or search icon press |
| `onClear` | `() => void` | optional | Shows × button when provided and value is non-empty |
| `placeholder` | `string` | optional | Defaults to `"Search products or ingredients…"` |
| `isLoading` | `boolean` | optional | Shows spinner in place of search icon when true |
| `disabled` | `boolean` | optional | Disables input and dims the field |

### Visual Structure

```
┌──────────────────────────────────────────────────────┐
│  🔍  Search products or ingredients…              [×] │
└──────────────────────────────────────────────────────┘
```

**Tailwind classes by element:**

- **Wrapper:** `relative flex items-center w-full`
- **Input:** `w-full bg-white border border-neutral-200 rounded-lg pl-10 pr-10 py-3 text-base text-neutral-800 placeholder:text-neutral-400 leading-body shadow-sm transition-shadow duration-fast ease-default`
- **Focus state on input:** `outline-none ring-2 ring-primary border-transparent`
- **Search icon (left):** `absolute left-3 text-neutral-400 pointer-events-none` — size 20px via `w-5 h-5`
- **Clear button (right):** `absolute right-3 text-neutral-400 hover:text-neutral-600 transition-colors duration-fast`
- **Loading spinner:** replaces search icon — same position, `text-primary animate-spin`

### States

| State | Treatment |
|-------|-----------|
| **Default** | `border-neutral-200 shadow-sm` |
| **Focus** | `ring-2 ring-primary border-transparent shadow-md` |
| **Filled (has value)** | Clear button `[×]` appears at right |
| **Loading** | Search icon replaced by spinner `text-primary`; input remains editable |
| **Disabled** | `bg-neutral-100 text-neutral-400 cursor-not-allowed border-neutral-200` |
| **Error** | `border-error ring-2 ring-error` — used only if search itself errors, not for no-results |

### Usage Rules

- ✅ Use at the top of the search view as the primary entry point
- ✅ Always control the value externally — this is a controlled component
- ❌ Do not use for in-list filtering — use `FilterChip` or a smaller `InputField` instead
- ❌ Do not nest inside a form element with default submit behaviour — handle `onSubmit` explicitly

---

## 4. CategoryTag

**Purpose:** A small teal chip that labels a product's category — appears on ProductCard, in filter rows, and in the library sidebar to group and filter products.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | ✅ | Category name (e.g. "Dish Soap", "Shampoo") |
| `isSelected` | `boolean` | optional | Filled teal when selected in filter context |
| `onClick` | `() => void` | optional | Makes tag interactive when provided |
| `size` | `'sm' \| 'md'` | optional | `md` default |

### Visual Structure

```
┌─────────────┐
│  Dish Soap  │   rounded-sm px-2 py-1 text-xs font-medium
└─────────────┘
```

**Tailwind classes by element:**

- **Base (read-only):** `inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium bg-neutral-100 text-accent`
- **Interactive (has onClick):** adds `cursor-pointer transition-colors duration-fast ease-default`
- **Hover (interactive):** `bg-accent text-white`
- **Selected:** `bg-accent text-white`
- **Size sm:** `px-1.5 py-0.5 text-xs`

### States

| State | Treatment |
|-------|-----------|
| **Default** | `bg-neutral-100 text-accent` |
| **Hover** | `bg-accent text-white` — only when `onClick` is provided |
| **Selected** | `bg-accent text-white` |
| **Disabled** | `bg-neutral-100 text-neutral-400 cursor-not-allowed` |

### Usage Rules

- ✅ Use on ProductCard header, library sidebar category list, and search filter row
- ✅ Use `isSelected` + `onClick` when the tag acts as a filter toggle
- ❌ Do not use SafetyBadge styles for categories — category tags are always teal, never semantic green/amber/red
- ❌ Do not truncate category labels — keep them short at the data level

---

## 5. NavBar

**Purpose:** The top-level navigation bar providing the app name and primary navigation links — persistent across all views on desktop, collapses to a bottom bar on mobile.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `activeRoute` | `'search' \| 'library' \| 'list'` | ✅ | Highlights the active nav item |
| `onNavigate` | `(route: string) => void` | ✅ | Navigation handler |

### Visual Structure (desktop)

```
┌──────────────────────────────────────────────────────────┐
│  🌿 Clean Shopper        Search    Library    My List     │
└──────────────────────────────────────────────────────────┘
```

**Tailwind classes by element:**

- **Nav container:** `w-full bg-white border-b border-neutral-200 shadow-sm px-8 h-14 flex items-center justify-between`
- **Wordmark:** `text-base font-semibold text-primary tracking-normal`
- **Nav link (default):** `text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors duration-fast ease-default px-3 py-1 rounded-md`
- **Nav link (active):** `text-sm font-medium text-primary bg-neutral-100 px-3 py-1 rounded-md`

### Visual Structure (mobile — bottom bar)

```
┌──────────────────────────────────────────┐
│    🔍 Search    📚 Library    📋 My List  │
└──────────────────────────────────────────┘
```

**Mobile Tailwind classes:**

- **Bar container:** `fixed bottom-0 inset-x-0 bg-white border-t border-neutral-200 shadow-lg flex justify-around items-center h-16 px-4 md:hidden`
- **Mobile nav item (default):** `flex flex-col items-center gap-1 text-xs font-medium text-neutral-400`
- **Mobile nav item (active):** `flex flex-col items-center gap-1 text-xs font-medium text-primary`

### States

| State | Treatment |
|-------|-----------|
| **Default link** | `text-neutral-500` |
| **Hover link** | `text-neutral-800` |
| **Active link** | `text-primary bg-neutral-100 rounded-md` |

### Usage Rules

- ✅ Render exactly once at the app root — inside `AppShell`
- ✅ Pass `activeRoute` from the router, do not derive it internally
- ❌ Do not add user account or authentication links — V1 is single-user
- ❌ Do not use for secondary or in-page navigation — use tabs or section anchors instead

---

## 6. Button

**Purpose:** The primary interactive control for all user actions — available in primary (filled) and secondary (outlined) variants, with consistent shape, spacing, and focus behaviour throughout the app.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | ✅ | Button label or content |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | optional | Defaults to `'primary'` |
| `size` | `'sm' \| 'md' \| 'lg'` | optional | Defaults to `'md'` |
| `onClick` | `() => void` | optional | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | optional | Defaults to `'button'` |
| `disabled` | `boolean` | optional | Disables interaction and dims button |
| `isLoading` | `boolean` | optional | Replaces label with spinner; disables button |
| `fullWidth` | `boolean` | optional | `w-full` when true |
| `leftIcon` | `ReactNode` | optional | Icon rendered before label |
| `rightIcon` | `ReactNode` | optional | Icon rendered after label |

### Variant Map

**Primary**
- Base: `bg-primary text-white font-medium rounded-md shadow-sm`
- Hover: `bg-primary-dark`
- Active/Pressed: `bg-primary-dark scale-[0.98]`
- Disabled: `bg-neutral-300 text-neutral-400 cursor-not-allowed shadow-none`

**Secondary**
- Base: `bg-white text-primary border border-primary font-medium rounded-md`
- Hover: `bg-neutral-100`
- Active/Pressed: `bg-neutral-100 scale-[0.98]`
- Disabled: `border-neutral-300 text-neutral-400 cursor-not-allowed`

**Ghost**
- Base: `bg-transparent text-primary font-medium rounded-md`
- Hover: `bg-neutral-100`
- Active/Pressed: `bg-neutral-200`
- Disabled: `text-neutral-400 cursor-not-allowed`

### Size Map

| Size | Tailwind classes |
|------|-----------------|
| `sm` | `px-3 py-1.5 text-sm gap-1.5` |
| `md` | `px-4 py-2 text-sm gap-2` |
| `lg` | `px-6 py-3 text-base gap-2` |

### Shared classes (all variants, all sizes)

`inline-flex items-center justify-center transition-all duration-fast ease-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`

### States

| State | Treatment |
|-------|-----------|
| **Default** | Variant base styles |
| **Hover** | Variant hover styles |
| **Focus** | `ring-2 ring-primary ring-offset-2` — visible on keyboard nav only |
| **Active** | `scale-[0.98]` — subtle press affordance |
| **Loading** | Label replaced by `<LoadingSpinner size="sm" />`, button `disabled`, opacity unchanged |
| **Disabled** | Variant disabled styles, `cursor-not-allowed`, no hover effects |

### Usage Rules

- ✅ Use `primary` for the single most important action on a surface
- ✅ Use `secondary` for secondary actions alongside a primary button
- ✅ Use `ghost` for low-emphasis actions in dense layouts (e.g. "Cancel")
- ❌ Do not place two `primary` buttons side by side — one action should be primary per context
- ❌ Do not use a Button for navigation — use a link or NavBar item instead
- ❌ Do not hardcode widths — use `fullWidth` or let content size the button

---

## 7. InputField

**Purpose:** A labelled, accessible text input for all form entry — ingredient preference settings, shopping list item names, and any future data-entry surfaces — with built-in label, helper text, and error state.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string` | ✅ | Links `<label>` and `<input>` via `htmlFor` |
| `label` | `string` | ✅ | Visible field label |
| `value` | `string` | ✅ | Controlled value |
| `onChange` | `(value: string) => void` | ✅ | Change handler |
| `type` | `string` | optional | Input type, defaults to `'text'` |
| `placeholder` | `string` | optional | Placeholder text |
| `helperText` | `string` | optional | Displayed below input — guidance or context |
| `errorText` | `string` | optional | Replaces helperText; triggers error styling |
| `disabled` | `boolean` | optional | Disables field |
| `required` | `boolean` | optional | Adds required indicator to label |
| `leftIcon` | `ReactNode` | optional | Icon inside input at left |

### Visual Structure

```
Label text *
┌──────────────────────────────────────────┐
│  🔍  Placeholder text…                   │
└──────────────────────────────────────────┘
Helper or error text below
```

**Tailwind classes by element:**

- **Wrapper:** `flex flex-col gap-1`
- **Label:** `text-sm font-medium text-neutral-700`
- **Required indicator:** `text-error ml-0.5`
- **Input wrapper:** `relative flex items-center`
- **Input:** `w-full bg-white border border-neutral-200 rounded-md px-3 py-2 text-base text-neutral-800 placeholder:text-neutral-400 leading-body transition-shadow duration-fast ease-default`
- **Input focus:** `outline-none ring-2 ring-primary border-transparent`
- **Input error:** `border-error ring-2 ring-error`
- **Input disabled:** `bg-neutral-100 text-neutral-400 cursor-not-allowed`
- **Left icon:** `absolute left-3 text-neutral-400 w-4 h-4 pointer-events-none` — add `pl-9` to input when icon present
- **Helper text:** `text-xs text-neutral-400 mt-0.5`
- **Error text:** `text-xs text-error mt-0.5`

### States

| State | Treatment |
|-------|-----------|
| **Default** | `border-neutral-200` |
| **Focus** | `ring-2 ring-primary border-transparent` |
| **Filled** | No visual change — styled identically to default |
| **Error** | `border-error ring-2 ring-error`; helper text replaced by `errorText` in `text-error` |
| **Disabled** | `bg-neutral-100 text-neutral-400 cursor-not-allowed` |

### Usage Rules

- ✅ Always provide a visible `label` — do not rely on `placeholder` as the label
- ✅ Use `helperText` for guidance; `errorText` for validation messages
- ✅ Use `leftIcon` for contextual icons (search, category) — never decorative-only icons
- ❌ Do not use InputField for product search — use `SearchBar` instead
- ❌ Do not add right-side icons via this component — extend only if a new pattern is confirmed in the design system

---

## 8. EmptyState

**Purpose:** A centred, message-driven placeholder displayed when a view has no content to show — empty search results, an empty saved library, or an empty shopping list — giving users a clear next action.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | `ReactNode` | ✅ | Illustrative icon or SVG for the context |
| `title` | `string` | ✅ | Short, plain-language headline |
| `description` | `string` | optional | One sentence explaining why it's empty and what to do |
| `action` | `{ label: string; onClick: () => void }` | optional | Renders a `Button` (primary variant) below the copy |
| `size` | `'sm' \| 'md'` | optional | `md` default; `sm` for empty inline sections |

### Visual Structure

```
         ┌───────────────────────────────┐
         │                               │
         │           [  icon  ]          │   text-neutral-300, w-12 h-12
         │                               │
         │     Nothing saved yet         │   text-base font-semibold text-neutral-700
         │                               │
         │  Search for a product to      │   text-sm text-neutral-400 leading-relaxed
         │  add it to your library.      │   max-w-xs text-center
         │                               │
         │      [ Start searching ]      │   Button variant="primary" size="md"
         │                               │
         └───────────────────────────────┘
```

**Tailwind classes by element:**

- **Container:** `flex flex-col items-center justify-center text-center gap-4 py-16 px-8`
- **Icon wrapper:** `text-neutral-300` — icon sized `w-12 h-12`
- **Title (md):** `text-base font-semibold text-neutral-700`
- **Title (sm):** `text-sm font-semibold text-neutral-600`
- **Description:** `text-sm text-neutral-400 leading-relaxed max-w-xs`
- **Action:** `<Button variant="primary" size="md">` — rendered only when `action` prop is provided

### States

| State | Treatment |
|-------|-----------|
| **Default** | Full layout as above |
| **No action** | Button row omitted; description should still provide direction |
| **No description** | Title only — use when context is self-evident (e.g. inline empty filter result) |

### Usage Rules

- ✅ Use in search results (no results found), saved library (nothing saved), and shopping list (list is empty)
- ✅ Always provide an `action` when the user can do something to resolve the empty state
- ✅ Match the icon to the context — avoid generic empty-box icons for every case
- ❌ Do not show EmptyState while loading — show `SkeletonCard` during fetch, EmptyState only after a confirmed empty response
- ❌ Do not use for error states — use `NotificationBanner` with `variant="error"` for failures

---

## 9. ModeControl

**Purpose:** A toggle control that switches the app between light mode and dark mode — rendered in the NavBar and accessible from any surface that needs a mode toggle.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `mode` | `'light' \| 'dark'` | ✅ | Current active mode — controlled externally |
| `onChange` | `(mode: 'light' \| 'dark') => void` | ✅ | Called with the new mode when the user toggles |
| `size` | `'sm' \| 'md'` | optional | `md` default; `sm` for tight contexts like a compact NavBar |

### Visual Structure

```
Light mode active:          Dark mode active:
┌─────────────────────┐     ┌─────────────────────┐
│  ☀  Light  │  🌙   │     │  ☀   │  🌙  Dark   │
└─────────────────────┘     └─────────────────────┘
  active pill left              active pill right
```

The control is a pill-shaped track containing two labelled segments. The active segment is filled; the inactive segment is transparent.

**Tailwind classes by element:**

- **Track (outer container):** `inline-flex items-center rounded-full bg-neutral-100 border border-neutral-200 p-0.5 gap-0.5 transition-colors duration-normal ease-default`
- **Segment (shared base):** `inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-normal ease-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1`
- **Size md segment:** `px-3 py-1.5 text-sm`
- **Size sm segment:** `px-2 py-1 text-xs`
- **Active segment:** `bg-white text-neutral-800 shadow-sm`
- **Inactive segment:** `bg-transparent text-neutral-400 hover:text-neutral-600`
- **Icon:** `w-4 h-4` (md) · `w-3 h-3` (sm) — sun icon for light, moon icon for dark

### States

| State | Treatment |
|-------|-----------|
| **Light active** | Light segment: `bg-white text-neutral-800 shadow-sm` · Dark segment: `bg-transparent text-neutral-400` |
| **Dark active** | Dark segment: `bg-white text-neutral-800 shadow-sm` · Light segment: `bg-transparent text-neutral-400` |
| **Hover (inactive segment)** | `text-neutral-600` — subtle affordance without changing the track |
| **Focus (keyboard)** | `ring-2 ring-primary ring-offset-1` on the focused segment |
| **Transition** | Active pill slides between segments using `duration-normal ease-default` |

### Usage Rules

- ✅ Use in the NavBar as the primary mode control — one instance per layout
- ✅ Always pass `mode` from a shared app-level state — do not manage mode locally inside this component
- ✅ Apply the resulting mode class (`dark` or `light`) to the root `<html>` or `<body>` element via the `onChange` handler
- ❌ Do not render ModeControl on individual feature pages — it belongs in the global NavBar
- ❌ Do not use an icon-only toggle without a text label — both "Light" and "Dark" labels must remain visible for clarity
- ❌ V1 note: dark mode is out of scope per the design system. ModeControl is specced here for V2 readiness — do not wire up dark mode styles until V2

---

## 10. ProductDetailPage

**Purpose:** Full product detail view rendered inside BrowsePage when a ProductCard is tapped. Shows name, brand, category tag, safety badge, score meter, and description. For caution/avoid products, fetches and shows up to 3 cleaner alternatives from the same category.

**Location:** `src/features/browse/ProductDetailPage.jsx` — feature-specific, not shared.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `product` | `object` | ✅ | Full product row: `{ id, name, brand, category, description, safety_score, safety_level }` |
| `onBack` | `() => void` | ✅ | Returns user to the Browse grid |
| `session` | `object\|null` | ✅ | Supabase session — controls save button visibility |
| `savedIds` | `Set` | ✅ | Currently saved product IDs for save state |
| `onToggleSave` | `(productId) => void` | ✅ | Save/unsave handler passed from BrowsePage |

### Visual Structure

```
← Browse

┌─────────────────────────────────────────────────────┐
│  [CategoryTag]                      [SafetyBadge]   │
│                                                      │
│  Product Name                                        │
│  by Brand Name                                       │
│                                                      │
│  Safety Score ──────────────────────────────  92     │
│                                                      │
│  Full description text goes here...                  │
│                                                      │
│                               [ 🔖 Save to list ]   │
└─────────────────────────────────────────────────────┘

── Cleaner alternatives (caution/avoid only) ──────────
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ ProductCard  │  │ ProductCard  │  │ ProductCard  │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Rules

- ✅ Rendered inside `BrowsePage` via `selectedProduct` state — not a route
- ✅ Alternatives section only renders for `caution` or `avoid` products; hidden for `clean`
- ✅ Alternatives fetch up to 3 `safety_level = 'clean'` products from the same category
- ❌ Do not show alternatives if none exist — the section is omitted entirely
- ❌ Do not navigate away from BrowsePage — use `onBack` to return to the grid

---

## Token Quick Reference

All components use the following token classes exclusively. Never hardcode values.

| Category | Available tokens |
|----------|-----------------|
| **Primary** | `bg-primary` `bg-primary-light` `bg-primary-dark` `text-primary` `text-primary-dark` `border-primary` |
| **Accent** | `bg-accent` `bg-accent-light` `text-accent` `border-accent` |
| **Semantic** | `bg-success` `bg-warning` `bg-error` `bg-info` `text-success` `text-warning` `text-error` `text-info` |
| **Neutral** | `bg-neutral-50` → `bg-neutral-900` · `text-neutral-400` → `text-neutral-900` · `border-neutral-200` `border-neutral-300` |
| **Surface** | `bg-white` (cards/modals) · `bg-neutral-50` (page) · `bg-neutral-100` (secondary surfaces) |
| **Radius** | `rounded-sm` (6px) · `rounded-md` (10px) · `rounded-lg` (16px) · `rounded-xl` (24px) · `rounded-full` |
| **Shadow** | `shadow-sm` · `shadow-md` · `shadow-lg` |
| **Typography** | `text-xs` `text-sm` `text-base` `text-xl` `text-2xl` `text-3xl` `text-4xl` · `font-light` `font-normal` `font-medium` `font-semibold` |
| **Leading** | `leading-body` (1.7) · `leading-relaxed` (1.5) · `leading-tight` (1.3) · `leading-caption` (1.4) |
| **Tracking** | `tracking-caps` (0.06em) · `tracking-display` (−0.02em) · `tracking-heading` (−0.01em) |
| **Motion** | `duration-fast` · `duration-normal` · `duration-slow` · `ease-default` · `ease-enter` · `ease-exit` |
| **Spacing** | `p-1` `p-2` `p-3` `p-4` `p-6` `p-8` `p-10` `p-12` `p-16` (and `m-`, `gap-`, `px-`, `py-` variants) |
