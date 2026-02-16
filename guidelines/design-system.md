# MoonShine v4 Design Tokens Summary

Reference of all design tokens used in the v4 system, needed for building the legacy v3 theme.

## Architecture

- **Color system**: oklch color space, `--ms-cm-*` overrides via `PaletteContract`
- **Component tokens**: `@theme` blocks in component CSS files (`--ms-*`)
- **Inline tokens**: `var(--ms-*, fallback)` patterns in component classes — equally important for theming but not formally in `@theme`
- **Theme switching**: `@custom-variant dark (&:where(.dark, .dark *))` class-based
- **Spacing**: Tailwind v4 `--spacing()` function (1 unit = 0.25rem = 4px)

Legend: **@theme** = formally registered in `@theme` block, **inline** = defined via `var(--token, fallback)` pattern

---

## Global Tokens (main.css) `@theme`

### Base
| Token | Default | Description |
|-------|---------|-------------|
| `--radius` | `var(--radius-lg)` | Default border radius |
| `--font-sans` | `'Gilroy', 'Roboto', sans-serif` | Default font stack |
| `--default-font-size` | `15px` | Root font size |
| `--default-line-height` | `18px` | Root line height |

### Typography Scale
| Token | Default |
|-------|---------|
| `--text-2xs` | `0.75rem` |
| `--text-xs` | `0.875rem` |
| `--text-sm` | `0.9375rem` |
| `--text-base` | `1rem` |
| `--text-md` | `1.125rem` |
| `--text-lg` | `1.25rem` |
| `--text-xl` | `1.5rem` |
| `--text-2xl` | `1.875rem` |
| `--text-3xl` | `2.25rem` |
| `--text-4xl` | `3rem` |
| `--text-5xl` | `3.75rem` |
| `--text-6xl` | `4.5rem` |
| `--text-7xl` | `6rem` |
| `--text-8xl` | `8rem` |

### Z-Index
| Token | Default |
|-------|---------|
| `--z-aside` | `50` |
| `--z-dropdown` | `150` |
| `--z-notifications` | `300` |
| `--z-overlay` | `1000` |
| `--z-offcanvas` | `1050` |
| `--z-modal` | `1100` |
| `--z-menu` | `1200` |
| `--z-toast` | `1300` |

### Custom Variants (main.css)
- `@custom-variant dark (&:where(.dark, .dark *))`
- `@custom-variant is_active (&:where(&._is-active))`
- `@custom-variant hover (&:hover { @media (hover: hover) ... })`

---

## Color Tokens (base/colors.css) `@theme inline`

### Light Mode
| Token | Default | Description |
|-------|---------|-------------|
| `--color-body` | `oklch(1 0 0)` | Page background |
| `--color-primary` | `oklch(0 0 0)` | Primary actions (black) |
| `--color-primary-text` | `oklch(1 0 0)` | Text on primary bg |
| `--color-secondary` | `oklch(0.92 0 0)` | Secondary actions (gray) |
| `--color-secondary-text` | `oklch(0 0 0)` | Text on secondary bg |
| `--color-base-stroke` | `oklch(0 0 0 / 10%)` | Border/stroke color |
| `--color-base-text` | `oklch(0.21 0.006 285.885)` | Default text |
| `--color-base` | `oklch(1 0 0)` | Cards, forms, modals bg |
| `--color-base-50` | `oklch(0.985 0 0)` | Shade 50 |
| `--color-base-100` | `oklch(0.97 0 0)` | Shade 100 |
| `--color-base-200` | `oklch(0.955 0 0)` | Shade 200 |
| `--color-base-300` | `oklch(0.94 0 0)` | Shade 300 |
| `--color-base-400` | `oklch(0.925 0 0)` | Shade 400 |
| `--color-base-500` | `oklch(0.91 0 0)` | Shade 500 |
| `--color-base-600` | `oklch(0.895 0 0)` | Shade 600 |
| `--color-base-700` | `oklch(0.88 0 0)` | Shade 700 |
| `--color-base-800` | `oklch(0.865 0 0)` | Shade 800 |
| `--color-base-900` | `oklch(0.85 0 0)` | Shade 900 |
| `--color-success` | `oklch(0.64 0.22 142.49)` | Success state |
| `--color-success-text` | `oklch(0.46 0.16 142.49)` | Text for success |
| `--color-warning` | `oklch(0.75 0.17 75.35)` | Warning state |
| `--color-warning-text` | `oklch(0.5 0.1 76.1)` | Text for warning |
| `--color-error` | `oklch(0.58 0.21 26.855)` | Error state |
| `--color-error-text` | `oklch(0.37 0.145 26.85)` | Text for error |
| `--color-info` | `oklch(0.6 0.219 257.63)` | Info state |
| `--color-info-text` | `oklch(0.35 0.12 257.63)` | Text for info |
| `--gradient-start` | `var(--color-primary)` | Gradient start |
| `--gradient-end` | `var(--color-primary)` | Gradient end |

All color tokens use `--ms-cm-*` indirection, e.g. `--color-primary: var(--ms-cm-primary, oklch(0 0 0))`.

### Dark Mode (overrides via `@variant dark`)
| Token | Default | Description |
|-------|---------|-------------|
| `--color-body` | `oklch(0.2 0.0168 274.32)` | Dark background |
| `--color-primary` | `oklch(1 0 0)` | Primary (white) |
| `--color-primary-text` | `oklch(0 0 0)` | Text on primary bg |
| `--color-secondary` | `oklch(0.8 0 0)` | Secondary dark |
| `--color-secondary-text` | `oklch(0 0 0)` | Text on secondary |
| `--color-base-stroke` | `oklch(1 0 0 / 10%)` | Border/stroke |
| `--color-base-text` | `oklch(0.87 0.01 258.34)` | Default text |
| `--color-base` | `oklch(0.24 0.0168 274.32)` | Content bg |
| `--color-base-50..900` | 0.255..0.39 | Dark shade scale |
| `--color-success` / `--color-success-text` | dark overrides | Success states |
| `--color-warning` / `--color-warning-text` | dark overrides | Warning states |
| `--color-error` / `--color-error-text` | dark overrides | Error states |
| `--color-info` / `--color-info-text` | dark overrides | Info states |

---

## Breakpoint Tokens (base/breakpoints.css) `@theme`

| Token | Default | Description |
|-------|---------|-------------|
| `--breakpoint-xs` | `375px` | Extra small |
| `--breakpoint-sm` | `640px` | Small |
| `--breakpoint-md` | `768px` | Medium |
| `--breakpoint-lg` | `1024px` | Large |
| `--breakpoint-xl` | `1280px` | Extra large |
| `--breakpoint-2xl` | `1536px` | 2x Extra large |
| `--breakpoint-3xl` | `120rem` | 3x Extra large |

---

## Base Tokens (base/common.css) — inline

### Scrollbar
| Token | Default |
|-------|---------|
| `--ms-scrollbar-color` | `var(--color-base-800)` light / `var(--color-base-300)` dark |
| `--ms-scrollbar-hover-color` | `var(--color-base-700)` light / `var(--color-base-400)` dark |

### HTML / Body Defaults
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-html-font-size` | `var(--text-base, 16px)` | Root font size |
| `--ms-html-mobile-font-size` | `14px` | Mobile font size |
| `--ms-layout-body-bg-color` | `var(--color-body)` | Body background |
| `--ms-layout-body-color` | `var(--color-base-text)` | Body text color |

### Link Defaults
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-defaults-link-color` | `var(--color-base-text)` | Link color |
| `--ms-defaults-link-hover-color` | `var(--color-primary)` | Link hover color |

### Paragraph
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-defaults-paragraph-space-y` | `--spacing(2)` | Paragraph margin |

### Images Row
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-images-row-size` | `--spacing(10)` | Image row size |
| `--ms-images-row-radius` | `50%` | Image row radius |
| `--ms-images-row-border-width` | `--spacing(0.5)` | Image row border |
| `--ms-images-row-border-color` | `var(--color-base-stroke)` | Image row border color |

### Divider / HR
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-hr-divider-spacing-y` | `--spacing(4)` | HR vertical spacing |
| `--ms-hr-divider-border-color` | `var(--color-base-stroke)` | HR border color |
| `--ms-divider-color` | `var(--color-base-text)` | Divider text color |
| `--ms-divider-line-bg-color` | `var(--color-base-stroke)` | Divider line bg |
| `--ms-divider-line-min-width` | `--spacing(4)` | Divider line min width |
| `--ms-divider-line-height` | `1px` | Divider line height |
| `--ms-divider-gap` | `--spacing(2.5)` | Divider gap |
| `--ms-divider-space-y` | `--spacing(4)` | Divider vertical space |

---

## Layout Tokens

### layouts/basic.css `@theme`

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-main-centered-max-width` | `1080px` | Max width centered layout |
| `--ms-layout-wrapper-spacing` | `--spacing(2)` | Wrapper padding |
| `--ms-layout-page-padding-y` | `--spacing(4)` | Page vertical padding |
| `--ms-layout-page-padding-x` | `--spacing(4)` | Page horizontal padding |
| `--ms-layout-page-border-width` | `1px` | Page border |
| `--ms-layout-page-bg-color` | `var(--color-base-50)` | Page background |
| `--ms-layout-navigation-gap` | `--spacing(3)` | Nav gap |
| `--ms-layout-content-padding-y` | `--spacing(6)` | Content padding |
| `--ms-layout-footer-padding-top` | `--spacing(6)` | Footer top padding |
| `--ms-layout-metrics-margin-bottom` | `--spacing(6)` | Metrics bottom margin |

### layouts/basic.css — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-wrapper-gap-y` | `var(--ms-layout-wrapper-spacing)` | Wrapper vertical gap |
| `--ms-layout-wrapper-gap-x` | `var(--ms-layout-wrapper-spacing)` | Wrapper horizontal gap |
| `--ms-layout-page-radius` | `var(--radius-xl)` | Page border radius |
| `--ms-layout-page-border-color` | `var(--color-base-stroke)` | Page border color |
| `--ms-layout-page-simple-padding-y` | `--spacing(2.5)` | Simple page padding Y |
| `--ms-layout-page-simple-padding-x` | `--spacing(2.5)` | Simple page padding X |
| `--ms-layout-metrics-gap-y` | `--spacing(6)` | Metrics gap Y |
| `--ms-layout-metrics-gap-x` | `--spacing(6)` | Metrics gap X |
| `--ms-layout-overlay-bg-color` | `var(--color-black)` | Overlay background (used in `--alpha(… / 0.6)`) |
| `--ms-layout-overlay-blur` | `2px` | Overlay blur (used in `blur(…)`) |
| `--ms-layout-collapse-btn-width` | `--spacing(5)` | Collapse button width |
| `--ms-layout-collapse-btn-radius` | `var(--radius-md)` | Collapse button radius |
| `--ms-layout-collapse-btn-padding-y` | `--spacing(2)` | Collapse button padding |

### layouts/layout-menu.css `@theme`

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-vertical-menu-width` | `264px` | Sidebar expanded |
| `--ms-layout-vertical-menu-minimized-width` | `68px` | Sidebar collapsed |

### layouts/layout-menu.css — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-menu-gap-y` | `--spacing(3)` | Menu vertical gap |

### layouts/layout-menu-horizontal.css `@theme`

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-menu-horizontal-height` | `--spacing(12)` | Horizontal menu height |

### layouts/layout-menu-horizontal.css — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-menu-horizontal-gap-x` | `--spacing(3)` | Horizontal menu gap |
| `--ms-layout-menu-horizontal-bg-color` | `var(--color-body)` | Horizontal menu bg |

### layouts/layout-bottom-bar.css `@theme`

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-bottom-bar-height` | `--spacing(18)` | Bottom bar height |
| `--ms-layout-bottom-bar-padding-y` | `--spacing(2)` | Vertical padding |
| `--ms-layout-bottom-bar-padding-x` | `--spacing(3)` | Horizontal padding |
| `--ms-layout-bottom-bar-gap` | `--spacing(2)` | Gap |
| `--ms-layout-bottom-bar-radius` | `--spacing(4)` | Border radius |
| `--ms-layout-bottom-bar-bg-blur` | `blur(20px)` | Background blur |
| `--ms-layout-bottom-bar-bg-opacity` | `0.8` | Background opacity |

### components/second-bar.css `@theme`

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-layout-second-sidebar-width` | `220px` | Second sidebar width |
| `--ms-layout-second-sidebar-minimized-width` | `68px` | Second sidebar collapsed |

---

## Component Tokens

### Button (components/buttons.css)

#### `@theme`
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-btn-padding-x` | `--spacing(3.5)` | Horizontal padding |
| `--ms-btn-padding-y` | `--spacing(2)` | Vertical padding |
| `--ms-btn-gap-x` | `--spacing(2)` | Icon-text gap |
| `--ms-btn-radius` | `--spacing(2)` | Border radius (8px) |
| `--ms-btn-border-width` | `1px` | Border width |
| `--ms-btn-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-btn-bg-color` | `var(--color-base)` | Background |
| `--ms-btn-color` | `var(--color-base-text)` | Text color |
| `--ms-btn-font-size` | `var(--text-xs)` | Font size |
| `--ms-btn-font-weight` | `var(--font-weight-medium)` | Font weight |
| `--ms-btn-icon-size` | `1.125em` | Icon size |
| `--ms-btn-hover-border-color` | `var(--color-base-stroke)` | Hover border |
| `--ms-btn-hover-bg-color` | `var(--color-base-300)` | Hover background |
| `--ms-btn-hover-color` | `var(--color-base-text)` | Hover text |
| `--ms-btn-disabled-opacity` | `0.6` | Disabled opacity |
| `--ms-btn-badge-padding-x` | `--spacing(1.5)` | Badge padding X |
| `--ms-btn-badge-padding-y` | `0px` | Badge padding Y |
| `--ms-btn-badge-font-size` | `0.925em` | Badge font size |

#### Inline
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-btn-align-items` | `center` | Flex align |
| `--ms-btn-justify-content` | `center` | Flex justify |
| `--ms-btn-min-height` | `auto` | Min height |
| `--ms-btn-active-translateY` | `1px` | Active press offset |
| `--ms-btn-disabled-border-color` | `var(--color-base-200)` | Disabled border |
| `--ms-btn-disabled-bg-color` | `var(--color-base-200)` | Disabled bg |
| `--ms-btn-disabled-color` | `var(--color-base-text)` | Disabled text |
| `--ms-btn-badge-bg-color` | `var(--ms-btn-hover-bg-color)` | Badge bg |
| `--ms-btn-badge-color` | `var(--ms-btn-hover-color)` | Badge text |
| `--ms-btn-lg-padding-x` | `--spacing(5)` | Large padding X |
| `--ms-btn-lg-padding-y` | `--spacing(3)` | Large padding Y |
| `--ms-btn-lg-font-size` | `var(--text-sm)` | Large font size |
| `--ms-btn-link-icon-size` | `--spacing(4)` | Link icon size |
| `--ms-btn-link-gap` | `--spacing(2)` | Link gap |
| `--ms-btn-link-color` | `var(--color-base-text)` | Link color |
| `--ms-btn-link-font-size` | `var(--text-xs)` | Link font size |
| `--ms-btn-link-font-weight` | `var(--font-weight-medium)` | Link font weight |
| `--ms-btn-link-hover-color` | `var(--color-primary)` | Link hover color |
| `--ms-btn-square-size` | `--spacing(10)` | Square button size |
| `--ms-btn-square-font-size` | `var(--text-md)` | Square font size |
| `--ms-btn-fit-font-size` | `var(--text-xs)` | Fit font size |

### Form (components/forms.css)

#### `@theme`
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-form-default-placeholder-color` | `--alpha(var(--ms-form-default-color) / 0.5)` | Placeholder color |
| `--ms-form-default-min-height` | `--spacing(9)` | Input min height (36px) |
| `--ms-form-default-padding-y` | `--spacing(2)` | Vertical padding |
| `--ms-form-default-padding-x` | `--spacing(2)` | Horizontal padding |
| `--ms-form-default-radius` | `var(--radius-lg)` | Border radius |
| `--ms-form-default-border-width` | `1px` | Border width |
| `--ms-form-default-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-form-default-bg-color` | `var(--color-base)` | Background |
| `--ms-form-default-color` | `var(--color-base-text)` | Text |
| `--ms-form-default-font-size` | `var(--text-sm)` | Font size |
| `--ms-form-default-font-weight` | `var(--font-weight-normal)` | Font weight |
| `--ms-form-focus-border-color` | `var(--color-primary)` | Focus border |
| `--ms-form-focus-ring-width` | `--spacing(0.875)` | Focus ring |
| `--ms-form-focus-ring-color` | `var(--color-primary)` | Focus ring color |
| `--ms-form-readonly-placeholder-color` | `--alpha(var(--ms-form-default-color) / 0.5)` | Readonly placeholder |
| `--ms-form-readonly-border-color` | `var(--color-base-stroke)` | Readonly border |
| `--ms-form-readonly-bg-color` | `var(--color-base-50)` | Readonly bg |
| `--ms-form-readonly-color` | `var(--color-base-text)` | Readonly text |
| `--ms-form-disabled-placeholder-color` | `--alpha(var(--ms-form-default-color) / 0.5)` | Disabled placeholder |
| `--ms-form-disabled-border-color` | `var(--color-base-stroke)` | Disabled border |
| `--ms-form-disabled-bg-color` | `var(--color-base-100)` | Disabled bg |
| `--ms-form-disabled-color` | `var(--color-base-text)` | Disabled text |
| `--ms-form-error-border-color` | `var(--color-error)` | Error border |
| `--ms-form-error-bg-color` | `var(--color-error)` | Error bg |
| `--ms-form-error-color` | `var(--color-error)` | Error text |
| `--ms-form-error-ring-color` | `var(--color-error)` | Error ring |
| `--ms-form-control-size` | `--spacing(5)` | Control size |

#### Inline
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-fieldset-padding` | | Fieldset padding |
| `--ms-fieldset-border-width` | `1px` | Fieldset border |
| `--ms-fieldset-border-color` | `var(--color-base-stroke)` | Fieldset border color |
| `--ms-fieldset-radius` | `var(--radius-lg)` | Fieldset radius |
| `--ms-legend-left` | | Legend left offset |
| `--ms-legend-margin` | | Legend margin |
| `--ms-legend-padding-x` | | Legend padding |
| `--ms-draggable-bg-color` | `var(--color-base-50)` | Draggable bg |
| `--ms-draggable-ring-width` | `1px` | Draggable ring |
| `--ms-draggable-ring-color` | `var(--color-base-stroke)` | Draggable ring color |
| `--ms-form-hint-margin-top` | `--spacing(1)` | Hint margin top |
| `--ms-form-hint-font-size` | `var(--text-xs)` | Hint font size |
| `--ms-form-hint-color` | | Hint color |
| `--ms-form-error-margin-top` | `0px` | Error margin top |
| `--ms-form-error-font-size` | `var(--text-xs)` | Error font size |
| `--ms-form-select-padding-right` | | Select right padding |
| `--ms-form-select-arrow-position-x` | | Select arrow X position |
| `--ms-form-select-arrow-size` | | Select arrow size |
| `--ms-form-textarea-min-height` | `120px` | Textarea min height |
| `--ms-form-field-padding` | | Field padding |
| `--ms-file-upload-button-bg-color` | | File upload btn bg |
| `--ms-file-upload-button-color` | | File upload btn color |
| `--ms-form-control-border-width` | `1px` | Control border |
| `--ms-form-control-border-color` | `var(--color-base-stroke)` | Control border color |
| `--ms-form-control-radius` | | Control radius |
| `--ms-form-control-bg-color` | `var(--color-base)` | Control bg |
| `--ms-form-control-color` | | Control color |
| `--ms-form-control-checked-border-color` | `var(--color-primary)` | Checked border |
| `--ms-form-control-checked-bg-color` | `var(--color-primary)` | Checked bg |
| `--ms-form-control-checked-color` | `var(--color-primary-text)` | Checked color |
| `--ms-form-control-disabled-opacity` | `0.7` | Disabled opacity |
| `--ms-form-checkbox-size` | | Checkbox size |
| `--ms-form-radio-size` | | Radio size |
| `--ms-form-switcher-width` | `--spacing(10.5)` | Switcher width |
| `--ms-form-switcher-height` | `--spacing(6)` | Switcher height |
| `--ms-form-switcher-border-width` | `1px` | Switcher border |
| `--ms-form-switcher-border-color` | `var(--color-base-stroke)` | Switcher border color |
| `--ms-form-switcher-bg-color` | `var(--ms-form-default-bg-color)` | Switcher bg |
| `--ms-form-switcher-thumb-offset` | `--spacing(0.75)` | Switcher thumb offset |
| `--ms-form-switcher-thumb-size` | `--spacing(4.5)` | Switcher thumb size |
| `--ms-form-switcher-thumb-bg-color` | `var(--color-primary)` | Switcher thumb bg |
| `--ms-form-switcher-disabled-opacity` | `0.7` | Switcher disabled opacity |
| `--ms-form-expansion-bg-color` | `var(--color-base-100)` | Expansion bg |
| `--ms-form-expansion-color` | `var(--color-base-text)` | Expansion color |
| `--ms-form-expansion-min-width` | | Expansion min width |
| `--ms-form-expansion-padding-x` | | Expansion padding X |
| `--ms-form-expansion-font-size` | `var(--text-xs)` | Expansion font size |
| `--ms-form-expansion-button-hover-bg` | `var(--color-base-400)` | Expansion hover bg |
| `--ms-form-range-track-size` | | Range track size |
| `--ms-form-range-track-from-color` | | Range track from |
| `--ms-form-range-track-to-color` | | Range track to |
| `--ms-form-group-range-gap` | | Range group gap |
| `--ms-form-range-track-height` | `--spacing(1)` | Range track height |
| `--ms-form-range-track-bg-color` | `var(--color-base-200)` | Range track bg |
| `--ms-form-range-connect-gradient-start` | `var(--gradient-start)` | Range gradient start |
| `--ms-form-range-connect-gradient-end` | `var(--gradient-end)` | Range gradient end |
| `--ms-form-range-fields-margin-top` | | Range fields margin |
| `--ms-form-range-fields-gap` | | Range fields gap |
| `--ms-form-range-field-max-width` | | Range field max width |
| `--ms-form-color-thumb-size` | `--spacing(6)` | Color thumb size |
| `--ms-form-color-thumb-left` | | Color thumb left |
| `--ms-form-color-thumb-radius` | `var(--radius-sm)` | Color thumb radius |
| `--ms-color-input-padding-left` | | Color input padding |
| `--ms-form-group-gap` | `--spacing(2)` | Form group gap |
| `--ms-json-indent` | `--spacing(6)` | JSON indent |
| `--ms-json-line-top` | `--spacing(2.5)` | JSON line top |
| `--ms-json-line-width` | `--spacing(4)` | JSON line width |
| `--ms-json-line-color` | `var(--color-base-stroke)` | JSON line color |

### Box (components/box.css)

#### `@theme`
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-box-margin-bottom` | `--spacing(4)` | Bottom margin |
| `--ms-box-padding-y` | `--spacing(4)` | Vertical padding |
| `--ms-box-padding-x` | `--spacing(4)` | Horizontal padding |
| `--ms-box-radius` | `var(--radius-lg)` | Border radius |
| `--ms-box-border-width` | `1px` | Border |
| `--ms-box-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-box-bg-color` | `var(--color-base)` | Background |
| `--ms-box-color` | `var(--color-base-text)` | Text |
| `--ms-box-title-gap` | `--spacing(2.5)` | Title gap |
| `--ms-box-title-padding-bottom` | `--spacing(3)` | Title bottom padding |
| `--ms-box-title-border-width` | `1px` | Title border width |
| `--ms-box-title-border-color` | `var(--color-base-stroke)` | Title border color |
| `--ms-box-title-font-size` | `var(--text-base)` | Title font size |
| `--ms-box-title-font-weight` | `var(--font-weight-semibold)` | Title font weight |

#### Inline
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-box-dark-bg-color` | `var(--color-neutral-900)` | Dark variant bg |
| `--ms-box-dark-color` | `var(--color-white)` | Dark variant text |

### Card (components/cards.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-card-gap` | `--spacing(6)` | Card gap |
| `--ms-card-padding-y` | `--spacing(4)` | Vertical padding |
| `--ms-card-padding-x` | `--spacing(4)` | Horizontal padding |
| `--ms-card-radius` | `var(--radius-lg)` | Border radius |
| `--ms-card-border-width` | `1px` | Border |
| `--ms-card-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-card-bg-color` | `var(--color-base)` | Background |
| `--ms-card-photo-height` | `--spacing(52)` | Photo height |
| `--ms-card-photo-radius` | `var(--radius-md)` | Photo radius |
| `--ms-card-photo-content-gap` | | Photo-content gap |
| `--ms-card-photo-content-padding-y` | | Photo content padding Y |
| `--ms-card-photo-content-padding-x` | | Photo content padding X |
| `--ms-card-photo-overlay-height` | | Overlay height |
| `--ms-card-photo-overlay-color` | | Overlay color |
| `--ms-card-photo-overlay-opacity` | | Overlay opacity |
| `--ms-card-photo-content-title-color` | | Photo title color |
| `--ms-card-photo-content-title-font-size` | | Photo title font size |
| `--ms-card-photo-content-title-font-weight` | | Photo title font weight |
| `--ms-card-photo-content-subcategory-color` | | Photo subcategory color |
| `--ms-card-photo-content-subcategory-font-size` | | Photo subcategory font size |
| `--ms-card-photo-content-subcategory-opacity` | | Photo subcategory opacity |
| `--ms-card-body-gap-y` | `--spacing(2)` | Body gap |
| `--ms-card-actions-gap` | `--spacing(2)` | Actions gap |
| `--ms-card-actions-padding-top` | `--spacing(5)` | Actions padding top |
| `--ms-card-actions-border-width` | `1px` | Actions border |
| `--ms-card-actions-border-color` | `var(--color-base-stroke)` | Actions border color |
| `--ms-report-card-gap-y` | | Report card gap |
| `--ms-report-card-padding-y` | | Report card padding Y |
| `--ms-report-card-padding-x` | | Report card padding X |
| `--ms-report-card-heading-icon-size` | | Report heading icon size |
| `--ms-report-card-indicator-gap` | | Report indicator gap |
| `--ms-report-card-indicator-padding-y` | | Report indicator padding Y |
| `--ms-report-card-indicator-padding-x` | | Report indicator padding X |
| `--ms-report-card-indicator-radius` | | Report indicator radius |
| `--ms-report-card-indicator-bg-color` | | Report indicator bg |
| `--ms-report-card-indicator-color` | | Report indicator color |
| `--ms-report-card-indicator-font-size` | | Report indicator font size |
| `--ms-report-card-value-font-size` | | Report value font size |
| `--ms-report-card-value-font-weight` | | Report value font weight |
| `--ms-report-card-title-color` | | Report title color |
| `--ms-report-card-title-font-size` | | Report title font size |

### Menu (components/menu.css)

#### `@theme`
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-menu-gap-y` | `--spacing(3)` | Vertical gap |
| `--ms-menu-gap-x` | `--spacing(3)` | Horizontal gap |
| `--ms-menu-space-y` | `--spacing(1)` | Item spacing Y |
| `--ms-menu-space-x` | `--spacing(1.5)` | Item spacing X |
| `--ms-menu-icon-size` | `--spacing(5)` | Icon size |
| `--ms-menu-arrow-size` | `--spacing(3)` | Arrow size |
| `--ms-menu-item-gap-y` | `--spacing(1)` | Item gap Y |
| `--ms-menu-item-gap-x` | `--spacing(2)` | Item gap X |
| `--ms-menu-item-padding-y` | `--spacing(1.5)` | Item padding Y |
| `--ms-menu-item-padding-x` | `--spacing(2.5)` | Item padding X |
| `--ms-menu-item-radius` | `--spacing(2)` | Item radius |
| `--ms-menu-item-font-size` | `var(--text-sm)` | Item font size |
| `--ms-menu-item-color` | `var(--color-base-text)` | Item text color |
| `--ms-menu-item-hover-bg-color` | `--alpha(var(--color-primary) / 0.15)` | Hover bg |
| `--ms-menu-item-active-bg-color` | `var(--color-base-100)` | Active bg |
| `--ms-menu-item-active-color` | `var(--color-base-text)` | Active text |
| `--ms-menu-item-active-icon-color` | `var(--color-primary)` | Active icon |
| `--ms-menu-submenu-space-y` | `--spacing(1)` | Submenu space Y |

#### Inline
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-menu-divider-space-y` | | Divider space Y |
| `--ms-menu-horizontal-divider-space-x` | | Horizontal divider space X |
| `--ms-menu-horizontal-divider-width` | | Horizontal divider width |
| `--ms-menu-horizontal-divider-height` | | Horizontal divider height |
| `--ms-menu-item-active-glow-color` | | Active glow color |
| `--ms-menu-header-border-width` | | Header border width |
| `--ms-menu-header-border-color` | `var(--color-base-stroke)` | Header border color |
| `--ms-menu-footer-border-width` | | Footer border width |
| `--ms-menu-footer-border-color` | `var(--color-base-stroke)` | Footer border color |
| `--ms-menu-actions-gap-y` | | Actions gap Y |
| `--ms-menu-actions-gap-x` | | Actions gap X |
| `--ms-menu-divider-gap` | | Divider gap |
| `--ms-menu-divider-bg-color` | `var(--color-base-stroke)` | Divider bg |
| `--ms-menu-divider-min-width` | | Divider min width |
| `--ms-menu-divider-size` | | Divider size |
| `--ms-menu-divider-vertical-space-x` | | Vertical divider space X |
| `--ms-menu-divider-vertical-width` | | Vertical divider width |
| `--ms-menu-divider-vertical-height` | | Vertical divider height |
| `--ms-menu-divider-label-space-left` | | Divider label left space |
| `--ms-menu-divider-font-size` | | Divider font size |
| `--ms-menu-divider-opacity` | | Divider opacity |
| `--ms-menu-item-font-weight` | | Item font weight |
| `--ms-menu-badge-radius` | | Badge radius |
| `--ms-menu-badge-border-color` | | Badge border color |
| `--ms-menu-badge-bg-color` | | Badge bg |
| `--ms-menu-badge-color` | | Badge color |
| `--ms-menu-badge-font-size` | | Badge font size |
| `--ms-submenu-space-y` | | Submenu space Y (alias) |

### Modal (components/modals.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-modal-dialog-max-width` | `520px` | Dialog max width |
| `--ms-modal-dialog-margin-y` | `--spacing(4)` | Dialog margin Y |
| `--ms-modal-dialog-padding-x` | `--spacing(4)` | Dialog padding X |
| `--ms-modal-auto-padding` | `--spacing(4)` | Auto padding |
| `--ms-modal-content-radius` | `var(--radius-xl)` | Content radius |
| `--ms-modal-content-border-width` | `1px` | Content border width |
| `--ms-modal-content-border-color` | `var(--color-base-stroke)` | Content border color |
| `--ms-modal-content-bg-color` | `var(--color-base)` | Content bg |
| `--ms-modal-content-color` | `var(--color-base-text)` | Content text |
| `--ms-modal-header-gap` | `--spacing(4)` | Header gap |
| `--ms-modal-header-padding-y` | `--spacing(4)` | Header padding Y |
| `--ms-modal-header-padding-x` | `--spacing(4)` | Header padding X |
| `--ms-modal-header-border-width` | `1px` | Header border width |
| `--ms-modal-header-border-color` | `var(--color-base-stroke)` | Header border color |
| `--ms-modal-title-font-size` | `var(--text-md)` | Title font size |
| `--ms-modal-title-font-weight` | `var(--font-weight-semibold)` | Title font weight |
| `--ms-modal-body-padding-y` | `--spacing(5)` | Body padding Y |
| `--ms-modal-body-padding-x` | `--spacing(4)` | Body padding X |
| `--ms-modal-backdrop-bg-color` | `var(--color-black)` | Backdrop bg (used in `--alpha(… / 0.5)`) |
| `--ms-modal-backdrop-blur` | `4px` | Backdrop blur (used in `blur(…)`) |

### Table (components/tables.css)

#### `@theme`
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-table-border-color` | `var(--color-base-stroke)` | Border |
| `--ms-table-bg-color` | `var(--color-base)` | Background |
| `--ms-table-radius` | `var(--radius-lg)` | Radius |
| `--ms-table-thead-bg-color` | `var(--color-base-100)` | Header bg |

#### Inline
| Token | Default | Description |
|-------|---------|-------------|
| `--ms-table-border-width` | `1px` | Border width |
| `--ms-table-font-size` | `var(--text-xs)` | Font size |
| `--ms-table-col-max-width` | | Column max width |
| `--ms-table-thead-border-width` | `1px` | Header border width |
| `--ms-table-thead-border-color` | `var(--color-base-stroke)` | Header border color |
| `--ms-table-space-y` | `--spacing(2.5)` | Cell padding Y |
| `--ms-table-space-x` | `--spacing(3)` | Cell padding X |
| `--ms-table-thead-space-y` | `--spacing(3)` | Header cell padding Y |
| `--ms-table-thead-space-x` | `--spacing(3)` | Header cell padding X |
| `--ms-table-thead-font-weight` | `var(--font-weight-semibold)` | Header font weight |
| `--ms-table-tbody-border-width` | `1px` | Body row border width |
| `--ms-table-tbody-border-color` | `var(--color-base-stroke)` | Body row border color |
| `--ms-table-tbody-space-y` | `--spacing(2)` | Body cell padding Y |
| `--ms-table-tbody-space-x` | `--spacing(3)` | Body cell padding X |
| `--ms-table-tfoot-border-width` | `1px` | Footer border width |
| `--ms-table-tfoot-border-color` | `var(--color-base-stroke)` | Footer border color |
| `--ms-table-tfoot-space-y` | `--spacing(2.5)` | Footer cell padding Y |
| `--ms-table-tfoot-space-x` | `--spacing(3)` | Footer cell padding X |
| `--ms-table-thead-radius` | | Header radius |
| `--ms-table-list-col-max-width` | | List column max width |
| `--ms-table-list-col-min-width` | | List column min width |
| `--ms-table-list-hover-bg-color` | `var(--color-base-100)` | List hover bg |
| `--ms-table-list-table-grid-min-width` | | Grid min width |
| `--ms-table-sticky-max-height` | | Sticky max height |
| `--ms-table-sticky-z-index` | | Sticky z-index |
| `--ms-table-btn-square-size` | `--spacing(8)` | Action btn size |

### Dropdown (components/dropdowns.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-dropdown-padding-y` | `--spacing(2.5)` | Padding Y |
| `--ms-dropdown-padding-x` | `--spacing(3)` | Padding X |
| `--ms-dropdown-border-width` | `1px` | Border width |
| `--ms-dropdown-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-dropdown-radius` | `var(--radius-lg)` | Radius |
| `--ms-dropdown-bg-color` | `var(--color-base)` | Background |
| `--ms-dropdown-color` | `var(--color-base-text)` | Text |
| `--ms-dropdown-heading-padding-y` | | Heading padding Y |
| `--ms-dropdown-heading-padding-x` | | Heading padding X |
| `--ms-dropdown-heading-border-width` | | Heading border width |
| `--ms-dropdown-heading-border-color` | | Heading border color |
| `--ms-dropdown-heading-bg-color` | | Heading bg |
| `--ms-dropdown-heading-font-size` | | Heading font size |
| `--ms-dropdown-heading-font-weight` | | Heading font weight |
| `--ms-dropdown-content-padding-y` | | Content padding Y (inherits from dropdown padding) |
| `--ms-dropdown-content-padding-x` | | Content padding X (inherits from dropdown padding) |
| `--ms-dropdown-content-min-width` | `148px` | Content min width |
| `--ms-dropdown-content-max-width` | | Content max width |
| `--ms-dropdown-content-max-height` | | Content max height |
| `--ms-dropdown-content-font-size` | `var(--text-sm)` | Content font size |
| `--ms-dropdown-content-divider-width` | `1px` | Content divider width |
| `--ms-dropdown-content-divider-color` | `var(--color-base-stroke)` | Content divider color |
| `--ms-dropdown-footer-padding-y` | | Footer padding Y |
| `--ms-dropdown-footer-padding-x` | | Footer padding X |
| `--ms-dropdown-footer-border-width` | | Footer border width |
| `--ms-dropdown-footer-border-color` | | Footer border color |
| `--ms-dropdown-footer-bg-color` | `var(--color-base-100)` | Footer bg |
| `--ms-dropdown-menu-divider-width` | `1px` | Menu divider width |
| `--ms-dropdown-menu-divider-color` | `var(--color-base-stroke)` | Menu divider color |
| `--ms-dropdown-menu-item-gap` | `--spacing(2)` | Menu item gap |
| `--ms-dropdown-menu-item-padding-y` | | Menu item padding Y (inherits from content padding) |
| `--ms-dropdown-menu-item-padding-x` | | Menu item padding X (inherits from content padding) |
| `--ms-dropdown-menu-item-hover-bg-color` | `var(--color-base-100)` | Menu item hover bg |
| `--ms-dropdown-menu-item-hover-color` | | Menu item hover color |

### Accordion (components/accordions.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-accordion-space-y` | `--spacing(2)` | Space between items |
| `--ms-accordion-item-radius` | `var(--radius-lg)` | Item radius |
| `--ms-accordion-item-border-width` | `1px` | Item border width |
| `--ms-accordion-item-border-color` | `var(--color-base-stroke)` | Item border color |
| `--ms-accordion-item-bg-color` | `var(--color-base)` | Item bg |
| `--ms-accordion-item-color` | `var(--color-base-text)` | Item text |
| `--ms-accordion-item-opened-bg-color` | `var(--color-base)` | Opened item bg |
| `--ms-accordion-item-opened-color` | `var(--color-base-text)` | Opened item text |
| `--ms-accordion-btn-gap` | `--spacing(3)` | Button gap |
| `--ms-accordion-btn-padding-y` | | Button padding Y (inherits from item padding) |
| `--ms-accordion-btn-padding-x` | | Button padding X (inherits from item padding) |
| `--ms-accordion-item-padding-y` | `--spacing(3)` | Item padding Y |
| `--ms-accordion-item-padding-x` | `--spacing(3)` | Item padding X |
| `--ms-accordion-btn-color` | `var(--color-base-text)` | Button color |
| `--ms-accordion-btn-font-size` | `var(--text-base)` | Button font size |
| `--ms-accordion-btn-font-weight` | `var(--font-weight-semibold)` | Button font weight |
| `--ms-accordion-btn-arrow-size` | `--spacing(3)` | Arrow icon size |
| `--ms-accordion-btn-active-color` | `var(--color-base-text)` | Active button color |
| `--ms-accordion-content-padding-y` | | Content padding Y (inherits from item padding) |
| `--ms-accordion-content-padding-x` | | Content padding X (inherits from item padding) |

### Alert (components/alerts.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-alert-gap` | `--spacing(3)` | Gap |
| `--ms-alert-padding-y` | `--spacing(2.5)` | Padding Y |
| `--ms-alert-padding-x` | `--spacing(3)` | Padding X |
| `--ms-alert-radius` | `var(--radius-lg)` | Radius |
| `--ms-alert-border-width` | `1px` | Border width |
| `--ms-alert-border-color` | `var(--color-base-200)` | Border color |
| `--ms-alert-bg-color` | `var(--color-base-200)` | Background |
| `--ms-alert-color` | `var(--color-base-text)` | Text color |
| `--ms-alert-spacing-y` | `--spacing(2)` | Vertical spacing |
| `--ms-alert-icon-size` | `--spacing(5)` | Icon size |
| `--ms-alert-content-font-size` | `var(--text-sm)` | Content font size |
| `--ms-alert-remove-icon-size` | `--spacing(4)` | Remove icon size |

### Badge (components/badges.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-badge-padding-y` | `--spacing(0.5)` | Padding Y |
| `--ms-badge-padding-x` | `--spacing(2.5)` | Padding X |
| `--ms-badge-radius` | `--spacing(1.5)` | Radius |
| `--ms-badge-bg-color` | `var(--color-base-300)` | Background |
| `--ms-badge-color` | `var(--color-base-text)` | Text color |
| `--ms-badge-font-size` | `var(--text-xs)` | Font size |

### Breadcrumbs (components/breadcrumbs.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-breadcrumbs-gap` | `--spacing(2)` | Gap |
| `--ms-breadcrumbs-font-size` | `var(--text-xs)` | Font size |
| `--ms-breadcrumbs-opacity` | `0.5` | Opacity |

### Carousel (components/carousel.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-carousel-border-width` | `1px` | Border width |
| `--ms-carousel-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-carousel-radius` | `var(--radius-lg)` | Radius |
| `--ms-carousel-aspect-ratio` | | Aspect ratio |
| `--ms-carousel-nav-z-index` | | Nav z-index |
| `--ms-carousel-nav-icon-size` | | Nav icon size |
| `--ms-carousel-nav-size` | | Nav button size |
| `--ms-carousel-nav-border-width` | | Nav border width |
| `--ms-carousel-nav-border-color` | | Nav border color |
| `--ms-carousel-nav-radius` | | Nav border radius |
| `--ms-carousel-nav-bg-color` | `--alpha(var(--ms-btn-bg-color) / 0.75)` | Nav bg |
| `--ms-carousel-nav-color` | `var(--ms-btn-color)` | Nav color |
| `--ms-carousel-nav-font-size` | | Nav font size |
| `--ms-carousel-nav-hover-border-color` | | Nav hover border |
| `--ms-carousel-nav-hover-bg-color` | | Nav hover bg |
| `--ms-carousel-nav-hover-color` | | Nav hover color |
| `--ms-carousel-nav-offset` | | Nav offset |
| `--ms-carousel-count-z-index` | | Counter z-index |
| `--ms-carousel-count-bg-color` | | Counter bg |
| `--ms-carousel-count-color` | | Counter color |
| `--ms-carousel-count-font-size` | | Counter font size |

### Dropzone (components/dropzone.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-dropzone-padding-y` | `--spacing(2)` | Padding Y |
| `--ms-dropzone-padding-x` | `--spacing(2)` | Padding X |
| `--ms-dropzone-border-width` | `2px` | Border width |
| `--ms-dropzone-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-dropzone-radius` | `var(--radius-lg)` | Radius |
| `--ms-dropzone-items-gap` | `--spacing(2)` | Items gap |
| `--ms-dropzone-item-size` | `--spacing(12)` | Item size |
| `--ms-dropzone-file-gap` | `--spacing(2)` | File gap |
| `--ms-dropzone-file-padding-y` | `--spacing(2)` | File padding Y |
| `--ms-dropzone-file-padding-x` | `--spacing(2)` | File padding X |
| `--ms-dropzone-file-radius` | `var(--radius-lg)` | File radius |
| `--ms-dropzone-file-bg-color` | `var(--color-base-100)` | File bg |
| `--ms-dropzone-file-color` | `var(--color-base-text)` | File color |
| `--ms-dropzone-icon-size` | `1.25rem` | Icon size |
| `--ms-dropzone-icon-color` | | Icon color |
| `--ms-dropzone-file-name-size` | `var(--text-sm)` | File name font size |
| `--ms-dropzone-remove-icon-size` | | Remove icon size |
| `--ms-dropzone-remove-offset` | | Remove offset |
| `--ms-dropzone-remove-border-width` | | Remove border width |
| `--ms-dropzone-remove-border-color` | | Remove border color |
| `--ms-dropzone-remove-radius` | | Remove radius |
| `--ms-dropzone-remove-bg-color` | | Remove bg |
| `--ms-dropzone-remove-color` | | Remove color |
| `--ms-dropzone-remove-bg-color-hover` | | Remove hover bg |
| `--ms-dropzone-remove-color-hover` | | Remove hover color |

### Icon (components/icon.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-icon-size` | `--spacing(4.5)` | Icon size |

### Languages (components/languages.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-languages-btn-gap` | `--spacing(1)` | Button gap |
| `--ms-languages-btn-icon-size` | `--spacing(4.5)` | Button icon size |
| `--ms-languages-arrow-icon-size` | `--spacing(3)` | Arrow icon size |

### Notifications (components/notifications.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-notifications-trigger-icon-size` | `--spacing(5)` | Trigger icon size |
| `--ms-notifications-trigger-icon-color` | `var(--color-base-text)` | Trigger icon color |
| `--ms-notifications-trigger-icon-hover-color` | `var(--color-primary)` | Trigger hover color |
| `--ms-notifications-trigger-dot-color` | `var(--color-red-500)` | Dot indicator color |
| `--ms-notifications-item-gap` | `--spacing(2)` | Item gap |
| `--ms-notifications-item-padding` | `--spacing(3)` | Item padding |
| `--ms-notifications-remove-icon-size` | | Remove icon size |
| `--ms-notifications-remove-size` | | Remove button size |
| `--ms-notifications-remove-color` | | Remove color |
| `--ms-notifications-remove-hover-color` | | Remove hover color |
| `--ms-notifications-category-icon-size` | | Category icon size |
| `--ms-notifications-category-size` | | Category size |
| `--ms-notifications-content-gap` | | Content gap |
| `--ms-notifications-text-color` | | Text color |
| `--ms-notifications-text-font-size` | `var(--text-xs)` | Text font size |
| `--ms-notifications-more-font-size` | | More link font size |
| `--ms-notifications-more-font-weight` | | More link font weight |
| `--ms-notifications-time-color` | | Time color |
| `--ms-notifications-time-font-size` | `var(--text-2xs)` | Time font size |
| `--ms-notifications-read-font-size` | | Read font size |
| `--ms-notifications-read-font-weight` | | Read font weight |

### Offcanvas (components/offcanvas.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-offcanvas-max-width` | `400px` | Max width |
| `--ms-offcanvas-bg-color` | `var(--color-base)` | Background |
| `--ms-offcanvas-color` | `var(--color-base-text)` | Text |
| `--ms-offcanvas-border-width` | `1px` | Border width |
| `--ms-offcanvas-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-offcanvas-header-gap` | `--spacing(4)` | Header gap |
| `--ms-offcanvas-header-padding-y` | `--spacing(4)` | Header padding Y |
| `--ms-offcanvas-header-padding-x` | `--spacing(4)` | Header padding X |
| `--ms-offcanvas-header-border-width` | `1px` | Header border width |
| `--ms-offcanvas-header-border-color` | `var(--color-base-stroke)` | Header border color |
| `--ms-offcanvas-title-font-size` | `var(--text-md)` | Title font size |
| `--ms-offcanvas-title-font-weight` | `var(--font-weight-semibold)` | Title font weight |
| `--ms-offcanvas-body-padding-y` | `--spacing(5)` | Body padding Y |
| `--ms-offcanvas-body-padding-x` | `--spacing(4)` | Body padding X |
| `--ms-offcanvas-backdrop-bg-color` | `var(--color-black)` | Backdrop bg (used in `--alpha(… / 0.5)`) |
| `--ms-offcanvas-backdrop-blur` | `4px` | Backdrop blur (used in `blur(…)`) |

### Pagination (components/pagination.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-pagination-margin-top` | `--spacing(6)` | Top margin |
| `--ms-pagination-list-gap` | `--spacing(1)` | List gap |
| `--ms-pagination-item-active-bg-color` | `var(--color-primary)` | Active bg |
| `--ms-pagination-item-active-color` | `var(--color-white)` | Active color |
| `--ms-pagination-element-size` | `--spacing(8)` | Element size |
| `--ms-pagination-element-padding-y` | `--spacing(1)` | Element padding Y |
| `--ms-pagination-element-padding-x` | `--spacing(1)` | Element padding X |
| `--ms-pagination-element-font-size` | `var(--text-xs)` | Element font size |
| `--ms-pagination-element-font-weight` | `var(--font-weight-medium)` | Element font weight |
| `--ms-pagination-element-radius` | `var(--ms-btn-radius)` | Element radius |
| `--ms-pagination-element-border-width` | `1px` | Element border width |
| `--ms-pagination-element-border-color` | `var(--ms-btn-border-color)` | Element border color |
| `--ms-pagination-element-bg-color` | `var(--ms-btn-bg-color)` | Element bg |
| `--ms-pagination-element-color` | `var(--ms-btn-color)` | Element color |
| `--ms-pagination-element-hover-border-color` | `var(--ms-btn-hover-border-color)` | Hover border |
| `--ms-pagination-element-hover-bg-color` | `var(--ms-btn-hover-bg-color)` | Hover bg |
| `--ms-pagination-element-hover-color` | `var(--ms-btn-hover-color)` | Hover color |
| `--ms-pagination-element-active-border-color` | `var(--color-primary)` | Active border |
| `--ms-pagination-element-active-bg-color` | `var(--color-primary)` | Active bg |
| `--ms-pagination-element-active-color` | `var(--color-primary-text)` | Active color |
| `--ms-pagination-element-disabled-opacity` | `var(--ms-btn-disabled-opacity)` | Disabled opacity |
| `--ms-pagination-element-fl-padding-x` | | First/last padding X |
| `--ms-pagination-nav-icon-size` | `--spacing(3.5)` | Nav icon size |
| `--ms-pagination-results-margin-top` | `--spacing(2)` | Results margin top |
| `--ms-pagination-results-color` | `var(--color-base-text)` | Results text color |
| `--ms-pagination-results-font-size` | `var(--text-xs)` | Results font size |
| `--ms-pagination-simple-element-padding-x` | | Simple mode padding X |

### Popover (components/popovers.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-popover-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-popover-bg-color` | `var(--color-base)` | Background |
| `--ms-popover-color` | `var(--color-base-text)` | Text |
| `--ms-popover-radius` | `var(--radius-md)` | Radius |
| `--ms-popover-border-width` | `1px` | Border width |
| `--ms-popover-font-size` | `var(--text-xs)` | Font size |
| `--ms-popover-line-height` | | Line height |
| `--ms-popover-content-padding-y` | `--spacing(1.25)` | Content padding Y |
| `--ms-popover-content-padding-x` | `--spacing(2)` | Content padding X |
| `--ms-popover-trigger-decoration-color` | | Trigger decoration color |
| `--ms-popover-body-gap-y` | | Body gap Y |
| `--ms-popover-body-padding` | | Body padding |
| `--ms-popover-title-font-size` | | Title font size |
| `--ms-popover-title-font-weight` | `var(--font-weight-semibold)` | Title font weight |
| `--ms-popover-title-padding-top` | | Title padding top |
| `--ms-popover-title-border-width` | | Title border width |
| `--ms-popover-title-border-color` | | Title border color |

### Pretty Limit (components/pretty-limit.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-pretty-limit-padding-y` | `--spacing(1.5)` | Padding Y |
| `--ms-pretty-limit-padding-x` | `--spacing(3)` | Padding X |
| `--ms-pretty-limit-radius` | `var(--radius-lg)` | Radius |
| `--ms-pretty-limit-bg-color` | `var(--color-base-200)` | Background |
| `--ms-pretty-limit-color` | `var(--color-base-text)` | Text |
| `--ms-pretty-limit-font-size` | `var(--text-sm)` | Font size |
| `--ms-pretty-limit-border-color` | `currentColor` | Border color |
| `--ms-pretty-limit-bg-color-hover` | `var(--color-base-200)` | Hover bg |
| `--ms-pretty-limit-color-hover` | `var(--color-base-text)` | Hover text |

### Profile (components/profile.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-profile-gap-y` | `--spacing(3)` | Gap Y |
| `--ms-profile-gap-x` | `--spacing(2)` | Gap X |
| `--ms-profile-main-gap` | `--spacing(2.5)` | Main gap |
| `--ms-profile-photo-size` | `--spacing(8)` | Photo size |
| `--ms-profile-photo-radius` | `50%` | Photo radius |
| `--ms-profile-max-width` | `120px` | Max width |
| `--ms-profile-font-size` | `var(--text-xs)` | Font size |
| `--ms-profile-name-font-size` | `var(--text-xs)` | Name font size |
| `--ms-profile-exit-icon-size` | `--spacing(4.5)` | Exit icon size |

### Progress Bar (components/progressbars.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-progress-height` | `--spacing(4)` | Bar height |
| `--ms-progress-radius` | `--spacing(4)` | Bar radius |
| `--ms-progress-bg-color` | `var(--color-base-100)` | Track bg |
| `--ms-progress-bar-radius` | `inherit` | Fill radius |
| `--ms-progress-bar-bg-color` | `var(--color-base-300)` | Fill bg |
| `--ms-progress-bar-color` | `var(--color-base-text)` | Fill text |
| `--ms-progress-bar-font-size` | `var(--text-xs)` | Fill font size |
| `--ms-progress-bar-font-weight` | `var(--font-weight-medium)` | Fill font weight |
| `--ms-radial-progress-size` | `--spacing(12)` | Radial size |
| `--ms-radial-progress-thickness` | `--spacing(1)` | Radial thickness |
| `--ms-radial-progress-track-color` | `var(--color-base-100)` | Radial track |
| `--ms-radial-progress-color` | `var(--color-base-700)` | Radial fill |
| `--ms-radial-progress-label-weight` | `var(--font-weight-bold)` | Radial label weight |

### Search (components/search.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-search-form-height` | `--spacing(10)` | Form height |
| `--ms-search-form-max-width` | | Form max width |
| `--ms-search-field-padding-right` | | Field padding right |
| `--ms-search-field-padding-left` | | Field padding left |
| `--ms-search-field-radius` | `--spacing(12)` | Field radius |
| `--ms-search-field-bg-color` | `var(--ms-form-default-bg-color)` | Field bg |
| `--ms-search-field-color` | `var(--ms-form-default-color)` | Field text |
| `--ms-search-button-icon-size` | `--spacing(4.5)` | Button icon size |
| `--ms-search-button-padding` | | Button padding |
| `--ms-search-button-color` | | Button color |
| `--ms-search-button-hover-color` | `var(--ms-form-default-color)` | Button hover color |
| `--ms-search-button-offset` | | Button offset |
| `--ms-search-button-keys-offset` | | Keys offset |
| `--ms-search-keys-gap` | | Keys gap |
| `--ms-search-key-size` | | Key size |
| `--ms-search-key-radius` | | Key radius |
| `--ms-search-key-bg-color` | `var(--color-base-100)` | Key bg |
| `--ms-search-key-shadow` | | Key shadow |
| `--ms-search-key-font-size` | | Key font size |
| `--ms-search-key-color` | | Key color |
| `--ms-search-key-shadow-pressed` | | Key pressed shadow |

### Select / Tom Select (components/select.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-ts-base-border-color` | `var(--ms-form-default-border-color)` | Base border color |
| `--ms-ts-base-bg-color` | `var(--ms-form-default-bg-color)` | Base bg |
| `--ms-ts-base-color` | `var(--color-base-text)` | Base text |
| `--ms-ts-base-font-size` | `var(--text-xs)` | Base font size |
| `--ms-ts-base-radius` | `var(--ms-form-default-radius)` | Base radius |
| `--ms-ts-clear-button-space-right` | | Clear btn right space |
| `--ms-clear-button-color` | | Clear btn color |
| `--ms-ts-caret-right` | | Caret right offset |
| `--ms-ts-multi-gap` | | Multi gap |
| `--ms-ts-item-padding-x` | | Item padding X |
| `--ms-ts-item-radius` | | Item radius |
| `--ms-ts-item-bg-color` | `var(--color-primary)` | Item bg |
| `--ms-ts-item-color` | `var(--color-primary-text)` | Item text |
| `--ms-ts-item-font-size` | | Item font size |
| `--ms-ts-item-image-padding` | | Item image padding |
| `--ms-ts-item-remove-border-color` | | Item remove border |
| `--ms-ts-multi-padding-right` | | Multi padding right |
| `--ms-ts-control-padding-y` | | Control padding Y |
| `--ms-ts-control-padding-x` | | Control padding X |
| `--ms-ts-control-radius` | `--spacing(2)` | Control radius |
| `--ms-ts-control-border-color` | `var(--ms-form-default-border-color)` | Control border |
| `--ms-ts-control-bg-color` | `var(--ms-form-default-bg-color)` | Control bg |
| `--ms-ts-dropdown-border-width` | `1px` | Dropdown border |
| `--ms-ts-dropdown-border-color` | `var(--ms-form-default-border-color)` | Dropdown border color |
| `--ms-ts-dropdown-radius` | `--spacing(2)` | Dropdown radius |
| `--ms-ts-optgroup-padding-y` | | Optgroup padding Y |
| `--ms-ts-optgroup-border-width` | | Optgroup border |
| `--ms-ts-optgroup-border-color` | | Optgroup border color |
| `--ms-ts-optgroup-opacity` | | Optgroup opacity |
| `--ms-ts-control-input-padding-right` | | Input padding right |
| `--ms-ts-control-input-font-size` | | Input font size |
| `--ms-ts-item-image-gap` | | Item image gap |
| `--ms-ts-dropdown-option-padding-y` | | Option padding Y |
| `--ms-ts-dropdown-option-bg-color` | `var(--ms-form-default-bg-color)` | Option bg |
| `--ms-ts-dropdown-option-active-bg-color` | `--alpha(var(--color-base-text) / 0.125)` | Active option bg |
| `--ms-ts-dropdown-option-active-color` | `var(--color-base-text)` | Active option text |
| `--ms-ts-dropdown-option-hover-bg-color` | `--alpha(var(--color-base-text) / 0.075)` | Hover option bg |
| `--ms-ts-dropdown-option-hover-color` | `var(--color-base-text)` | Hover option text |
| `--ms-ts-dropdown-hightlight-bg-color` | | Highlight bg |
| `--ms-ts-dropdown-hightlight-color` | | Highlight text |
| `--ms-ts-dropdown-spinner-size` | | Spinner size |
| `--ms-ts-dropdown-spinner-border-width` | | Spinner border |
| `--ms-ts-dropdown-spinner-border-color` | | Spinner border color |

### Skeleton (components/skeleton.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-skeleton-default-height` | `--spacing(3)` | Default height |
| `--ms-skeleton-default-radius` | `var(--radius-2xl)` | Default radius |
| `--ms-skeleton-default-color` | `--alpha(var(--color-base-text) / 0.025)` | Default color |
| `--ms-skeleton-default-blink-color` | `--alpha(var(--color-base-text) / 0.15)` | Blink color |
| `--ms-skeleton-default-duration` | `1500ms` | Animation duration |
| `--ms-skeleton-default-spacing` | `--spacing(2)` | Default spacing |
| `--ms-skeleton-circle-width` | `--spacing(5)` | Circle width |
| `--ms-skeleton-circle-height` | `--spacing(5)` | Circle height |
| `--ms-skeleton-title-width` | `75%` | Title width |
| `--ms-skeleton-title-height` | `--spacing(4)` | Title height |

### Snippet (components/snippet.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-snippet-gap` | `--spacing(2)` | Gap |
| `--ms-snippet-padding-y` | `--spacing(1.5)` | Padding Y |
| `--ms-snippet-padding-x` | `--spacing(3)` | Padding X |
| `--ms-snippet-radius` | `var(--radius-lg)` | Radius |
| `--ms-snippet-bg-color` | `var(--color-base-200)` | Background |
| `--ms-snippet-color` | `var(--color-base-text)` | Text |
| `--ms-snippet-font-size` | `var(--text-xs)` | Font size |
| `--ms-snippet-copy-color` | | Copy button color |
| `--ms-snippet-copy-hover-bg` | | Copy hover bg |
| `--ms-snippet-copy-hover-color` | | Copy hover color |

### Social (components/social.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-social-divider-margin` | `--spacing(4)` | Divider margin |
| `--ms-social-divider-gap` | `--spacing(2)` | Divider gap |
| `--ms-social-divider-line-color` | `var(--color-base-stroke)` | Divider line color |
| `--ms-social-list-gap` | `--spacing(2)` | List gap |
| `--ms-social-item-size` | `--spacing(8)` | Item size |
| `--ms-social-item-radius` | `50%` | Item radius |
| `--ms-social-item-bg-color` | `var(--color-base)` | Item bg |
| `--ms-social-item-color` | `var(--color-base-text)` | Item color |
| `--ms-social-item-bg-color-hover` | `var(--color-primary)` | Item hover bg |
| `--ms-social-item-color-hover` | `var(--color-primary-text)` | Item hover color |
| `--ms-social-item-icon-size` | `--spacing(4)` | Item icon size |

### Spinner (components/spinners.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-spinner-size` | `--spacing(6)` | Size |
| `--ms-spinner-border-width` | `2px` | Border width |
| `--ms-spinner-border-color` | `var(--color-base-text)` | Border color |
| `--ms-spinner-animation-duration` | `2000ms` | Animation duration |

### Tabs (components/tabs.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-tabs-border-width` | `1px` | Border width |
| `--ms-tabs-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-tabs-gap` | `--spacing(2)` | Tab gap |
| `--ms-tabs-button-icon-size` | `--spacing(5)` | Button icon size |
| `--ms-tabs-button-gap` | `--spacing(1.5)` | Button gap |
| `--ms-tabs-button-height` | `--spacing(12)` | Button height |
| `--ms-tabs-button-padding-x` | `--spacing(2)` | Button padding X |
| `--ms-tabs-button-border-width` | `1px` | Button border width |
| `--ms-tabs-button-border-color` | `transparent` | Button border color |
| `--ms-tabs-button-color` | `--alpha(var(--color-base-text) / 0.5)` | Button text |
| `--ms-tabs-button-font-size` | `var(--text-sm)` | Button font size |
| `--ms-tabs-button-font-weight` | `var(--font-weight-medium)` | Button font weight |
| `--ms-tabs-button-hover-border-color` | `var(--color-base-stroke)` | Hover border |
| `--ms-tabs-button-hover-color` | `var(--color-base-text)` | Hover text |
| `--ms-tabs-button-active-border-color` | `var(--color-primary)` | Active border |
| `--ms-tabs-button-active-color` | `var(--color-primary)` | Active text |
| `--ms-tabs-content-margin-top` | `--spacing(6)` | Content margin top |
| `--ms-tabs-button-padding-right` | | Vertical tabs padding right |

### Toast (components/toasts.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-toast-container-gap` | `--spacing(2.5)` | Container gap |
| `--ms-toast-container-spacing` | `--spacing(4)` | Container spacing |
| `--ms-toast-gap` | `--spacing(1.5)` | Toast gap |
| `--ms-toast-min-width` | `--spacing(56)` | Min width |
| `--ms-toast-max-width` | `--spacing(148)` | Max width |
| `--ms-toast-padding-y` | `--spacing(2.5)` | Padding Y |
| `--ms-toast-padding-x` | `--spacing(2.5)` | Padding X |
| `--ms-toast-radius` | `var(--radius-sm)` | Radius |
| `--ms-toast-border-color` | `var(--color-base-stroke)` | Border color |
| `--ms-toast-border-width` | `--spacing(0.875)` | Left border width |
| `--ms-toast-bg-color` | `var(--color-base)` | Background |
| `--ms-toast-color` | `var(--color-base-text)` | Text |
| `--ms-toast-font-size` | `var(--text-xs)` | Font size |
| `--ms-toast-before-bg-color` | `var(--color-base)` | Before pseudo bg |

---

## Authentication Page (pages/authentication.css) — inline

| Token | Default | Description |
|-------|---------|-------------|
| `--ms-auth-gap` | `--spacing(6)` | Gap |
| `--ms-auth-padding-y` | `--spacing(8)` | Padding Y |
| `--ms-auth-padding-x` | `--spacing(4)` | Padding X |
| `--ms-auth-bg-color` | `var(--ms-layout-page-bg-color)` | Background |
| `--ms-auth-color` | `var(--color-base-text)` | Text |
| `--ms-auth-content-max-width` | `420px` | Content max width |
| `--ms-auth-content-bg-color` | `var(--ms-box-bg-color, var(--color-base))` | Content bg |
| `--ms-auth-content-border-color` | `var(--ms-box-border-color, var(--color-base-stroke))` | Content border |
| `--ms-auth-content-radius` | `var(--radius-xl)` | Content radius |
| `--ms-auth-content-padding-y` | `--spacing(6)` | Content padding Y |
| `--ms-auth-content-padding-x` | `--spacing(6)` | Content padding X |
| `--ms-auth-glow-width` | | Glow width |
| `--ms-auth-glow-height` | | Glow height |
| `--ms-auth-glow-radius` | | Glow radius |
| `--ms-auth-glow-color` | | Glow color |

---

## Token Statistics

| Category | @theme tokens | Inline tokens | Total |
|----------|--------------|---------------|-------|
| Global (main.css) | 22 | — | 22 |
| Colors | 28 | — | 28 |
| Breakpoints | 7 | — | 7 |
| Base (common.css) | — | 20 | 20 |
| Layouts | 22 | 15 | 37 |
| Buttons | 18 | 21 | 39 |
| Forms | 27 | 59 | 86 |
| Box | 14 | 2 | 16 |
| Cards | — | 38 | 38 |
| Menu | 18 | 27 | 45 |
| Modal | — | 20 | 20 |
| Table | 4 | 23 | 27 |
| Dropdown | — | 33 | 33 |
| Accordion | — | 20 | 20 |
| Alert | — | 12 | 12 |
| Badge | — | 6 | 6 |
| Breadcrumbs | — | 3 | 3 |
| Carousel | — | 20 | 20 |
| Dropzone | — | 24 | 24 |
| Icon | — | 1 | 1 |
| Languages | — | 3 | 3 |
| Notifications | — | 20 | 20 |
| Offcanvas | — | 16 | 16 |
| Pagination | — | 27 | 27 |
| Popover | — | 16 | 16 |
| Pretty Limit | — | 9 | 9 |
| Profile | — | 9 | 9 |
| Progress Bar | — | 13 | 13 |
| Search | — | 21 | 21 |
| Select (Tom Select) | — | 37 | 37 |
| Skeleton | — | 10 | 10 |
| Snippet | — | 10 | 10 |
| Social | — | 11 | 11 |
| Spinner | — | 4 | 4 |
| Tabs | — | 18 | 18 |
| Toast | — | 14 | 14 |
| Authentication | — | 15 | 15 |
| **Total** | **~160** | **~537** | **~697** |
