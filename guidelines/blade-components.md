# MoonShine Components AI Generation Guide

This document is designed for AI assistants that generate interfaces based on MoonShine components. All components use the `x-moonshine::` prefix in Blade templates.

## Table of Contents

### Layout Components
- [Sidebar](#sidebar-side-panel) - `<x-moonshine::layout.sidebar>`
- [Header](#header-top-header) - `<x-moonshine::layout.header>`
- [Wrapper](#wrapper-layout-wrapper) - `<x-moonshine::layout.wrapper>`
- [Content](#content-main-content) - `<x-moonshine::layout.content>`
- [Grid](#grid-grid-layout) - `<x-moonshine::layout.grid>`
- [Flex](#flex-flex-container) - `<x-moonshine::layout.flex>`
- [TopBar](#topbar-top-navigation) - `<x-moonshine::layout.top-bar>`
- [Footer](#footer-page-footer) - `<x-moonshine::layout.footer>`
- [Div](#div-layout-div) - `<x-moonshine::layout.div>`
- [Body](#body-layout-body) - `<x-moonshine::layout.body>`
- [Head](#head-html-head) - `<x-moonshine::layout.head>`
- [Html](#html-html-document) - `<x-moonshine::layout.html>`
- [Layout](#layout-root-layout) - `<x-moonshine::layout>`

### Interface Components
- [Box](#box-container-block) - `<x-moonshine::layout.box>`
- [Card](#card-content-card) - `<x-moonshine::card>`
- [Alert](#alert-notification) - `<x-moonshine::alert>`
- [Modal](#modal-modal-window) - `<x-moonshine::modal>`
- [Table](#table-data-table) - `<x-moonshine::table>`
- [Form](#form-form) - `<x-moonshine::form>`
- [Dropdown](#dropdown-dropdown-menu) - `<x-moonshine::dropdown>`
- [Collapse](#collapse-collapsible-content) - `<x-moonshine::collapse>`
- [Breadcrumbs](#breadcrumbs-navigation-breadcrumbs) - `<x-moonshine::breadcrumbs>`
- [Badge](#badge-labelbadge) - `<x-moonshine::badge>`
- [Divider](#divider-content-divider) - `<x-moonshine::layout.divider>`
- [Progress Bar](#progress-bar-progress-indicator) - `<x-moonshine::progress-bar>`
- [Tabs](#tabs-tab-navigation) - `<x-moonshine::tabs>`
- [Spinner](#spinner-loading-indicator) - `<x-moonshine::spinner>`
- [Carousel](#carousel-image-carousel) - `<x-moonshine::carousel>`
- [Popover](#popover-hover-tooltip) - `<x-moonshine::popover>`
- [Rating](#rating-star-rating) - `<x-moonshine::rating>`
- [OffCanvas](#offcanvas-side-panel) - `<x-moonshine::off-canvas>`

### Action Components
- [Link](#link-styled-links) - `<x-moonshine::link-button>` / `<x-moonshine::link-native>`

### Content & Display
- [Icon](#icon-standalone-icon) - `<x-moonshine::icon>`
- [Logo](#logo-brand-logo) - `<x-moonshine::layout.logo>`
- [Heading](#heading-text-headings) - `<x-moonshine::heading>`
- [Boolean](#boolean-boolean-display) - `<x-moonshine::boolean>`
- [Color](#color-color-displaypicker) - `<x-moonshine::color>`
- [Thumbnails](#thumbnails-image-gallery) - `<x-moonshine::thumbnails>`
- [Files](#files-file-uploaddisplay) - `<x-moonshine::files>`
- [Metrics](#metrics-metrics-display) - `<x-moonshine::metric>`
- [Flash](#flash-flash-messages) - `<x-moonshine::flash>`

### Navigation & User
- [Menu](#menu-navigation-menu) - `<x-moonshine::layout.menu>`
- [ThemeSwitcher](#themeswitcher-theme-toggle) - `<x-moonshine::layout.theme-switcher>`
- [Burger](#burger-mobile-menu-button) - `<x-moonshine::layout.burger>`
- [Mobilebar](#mobilebar-mobile-navigation) - `<x-moonshine::layout.mobilebar>`

### Form & Field Components
- [FieldsGroup](#fieldsgroup-field-grouping) - `<x-moonshine::fields-group>`

### Utility & Special
- [When](#when-conditional-rendering) - `<x-moonshine::when>`
- [Title](#title-page-title) - `<x-moonshine::layout.title>`
- [Loader](#loader-loading-indicator) - `<x-moonshine::loader>`
- [FlexibleRender](#flexiblerender-dynamic-content) - `<x-moonshine::flexible-render>`
- [LineBreak](#linebreak-line-break) - `<x-moonshine::line-break>`
- [Components](#components-component-container) - `<x-moonshine::components>`

### HTML & Meta
- [Meta](#meta-meta-tags) - `<x-moonshine::layout.meta>`
- [Assets](#assets-asset-management) - `<x-moonshine::layout.assets>`
- [Attributes](#attributes-dynamic-attributes) - `<x-moonshine::attributes>`
- [Favicon](#favicon-favicon-management) - `<x-moonshine::layout.favicon>`

## Icons in MoonShine

MoonShine uses **Heroicons** for all icon displays. All icons are available at: https://heroicons.com/

**Icon naming conventions:**
- **Default (Outline)**: Use icon name as-is, e.g., `icon="users"`
- **Solid**: Add `s.` prefix, e.g., `icon="s.users"`
- **Mini**: Add `m.` prefix, e.g., `icon="m.users"`
- **Micro**: Add `c.` prefix, e.g., `icon="c.users"`

**Examples:**
- `icon="home"` - outline home icon
- `icon="s.home"` - solid home icon
- `icon="m.home"` - mini home icon
- `icon="c.home"` - micro home icon

## Basic Template Structure

```blade
<x-moonshine::layout>
    <x-moonshine::layout.html :with-alpine-js="true" :with-themes="true">
        <x-moonshine::layout.head>
            <x-moonshine::layout.meta name="csrf-token" :content="csrf_token()"/>
            <x-moonshine::layout.favicon />
            <x-moonshine::layout.assets>
                @vite(['resources/css/main.css', 'resources/js/app.js'], 'vendor/moonshine')
            </x-moonshine::layout.assets>
        </x-moonshine::layout.head>

        <x-moonshine::layout.body>
            <x-moonshine::layout.wrapper>
                <x-moonshine::layout.content>
                    <!-- All main page content here (recommended) -->
                </x-moonshine::layout.content>
            </x-moonshine::layout.wrapper>
        </x-moonshine::layout.body>
    </x-moonshine::layout.html>
</x-moonshine::layout>
```

## ⚠️ Critical: MoonShine Assets Configuration

### Understanding MoonShine Assets
**Important:** MoonShine has pre-compiled assets that are **already built** and ready to use. These assets include:
- MoonShine CSS framework (`main.css`) with Tailwind configuration
- Alpine.js integration
- Core JavaScript functionality
- Default themes and styling system

### MoonShine Default Assets (Always Required)
**These assets are mandatory and pre-compiled:**

```blade
<x-moonshine::layout.assets>
    @vite(['resources/css/main.css', 'resources/js/app.js'], 'vendor/moonshine')
</x-moonshine::layout.assets>
```

**Critical Notes:**
- **Pre-compiled and ready** - MoonShine assets are already built, no compilation needed
- **Must use `'vendor/moonshine'` namespace** - tells Vite to use MoonShine's configuration
- **Never remove these assets** - required for proper component styling and functionality

### Adding Your Own Assets (Optional - Only When Needed)
You can add your own application assets for additional functionality:

```blade
<x-moonshine::layout.assets>
    @vite(['resources/css/main.css', 'resources/js/app.js'], 'vendor/moonshine')
    @vite(['resources/css/custom.css', 'resources/js/custom.js'])
</x-moonshine::layout.assets>
```

**Use cases for custom assets:**
- Override specific MoonShine styles
- Add custom JavaScript functionality
- Include additional CSS frameworks
- Add custom fonts or icons

### Troubleshooting: Missing Tailwind Classes

**Problem:** User complains that some Tailwind classes are not applying or working.

**Cause:** MoonShine's pre-compiled CSS includes only the Tailwind classes that are actually used by MoonShine components. Not all Tailwind classes are included in the build.

**Solution:** When you need additional Tailwind classes, use MoonShine's custom build feature.

### Custom Build Setup

When you need additional TailwindCSS classes beyond what MoonShine provides, you can create a custom build that includes both MoonShine and your custom styles.

#### Automatic Publishing (Recommended)

**Requirements:** TailwindCSS 4+ and Laravel 12+

1. **Run the publish command:**
   ```shell
   php artisan moonshine:publish
   ```

2. **Select `Assets Template`**

3. **Files that will be published/replaced:**
   - `vite.config.js`
   - `postcss.config.js`
   - `resources/css/app.css`

4. **Or add assets via Blade:**
   ```blade
   <x-moonshine::layout.head>
       <x-moonshine::layout.assets>
           @vite(['resources/js/app.js'], 'vendor/moonshine')
           @vite(['resources/css/app.css', 'resources/js/app.js'])
       </x-moonshine::layout.assets>
   </x-moonshine::layout.head>
   ```

#### Manual Custom Build Setup

If you can't use automatic publishing, configure manually:

1. **Update vite.config.js:**
   ```js
   import { defineConfig } from 'vite';
   import laravel from 'laravel-vite-plugin';

   export default defineConfig({
       plugins: [
           laravel({
               input: ['resources/css/app.css', 'resources/js/app.js'],
               refresh: true,
           }),
       ],
       resolve: {
           alias: {
               '@moonshine-resources': '/vendor/moonshine/moonshine/src/UI/resources',
           }
       },
   });
   ```

   **Note:** Remove the `tailwindcss()` plugin if it exists.

2. **Install and configure PostCSS:**
   ```shell
   npm install @tailwindcss/postcss
   ```

   Create `postcss.config.js`:
   ```js
   export default {
     plugins: {
       '@tailwindcss/postcss': {},
     },
   };
   ```

3. **Create resources/css/app.css:**
   ```css
   @import '../../vendor/moonshine/moonshine/src/UI/resources/css/main.css';

   @source '../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php';
   @source '../../storage/framework/views/*.php';
   @source '../**/*.blade.php';
   @source '../**/*.js';
   ```

**Result:** After setting up the custom build, any Tailwind classes you use in your templates will be available.

**Example workflow:**
- User wants to use `bg-gradient-to-r` class
- Class doesn't work because it's not in MoonShine's pre-compiled CSS
- Run `php artisan moonshine:publish` and select `Assets Template`
- Configure your layout to use the custom build
- Use the class in your templates: `<div class="bg-gradient-to-r from-blue-500 to-purple-600">`
- Run `npm run build` and your custom classes will be included

### Key Points:
- **MoonShine assets are pre-compiled** - ready to use without build process
- **Always include MoonShine defaults** - `@vite(['resources/css/main.css', 'resources/js/app.js'], 'vendor/moonshine')`
- **Custom assets are optional** - add only when extending functionality
- **Missing Tailwind classes?** - Add your own Tailwind compilation with MoonShine's config
- **Respect MoonShine's Tailwind system** - avoid conflicts with component styling
- **Never modify vendor files** - they'll be overwritten on updates
- **Theme consistency matters** - align custom styles with MoonShine's design system

## Layout Components

### Sidebar (Side Panel)
**Purpose:** Creating side navigation panel
```blade
<!-- Full sidebar structure -->
<x-moonshine::layout.sidebar :collapsed="true">
    <x-moonshine::layout.div class="menu-heading">
        <x-moonshine::layout.logo href="/" :logo="'/logo.png'" :minimized="true"/>
        <x-moonshine::layout.div class="menu-heading-actions">
            <x-moonshine::layout.div class="menu-heading-mode">
                <x-moonshine::layout.theme-switcher/>
            </x-moonshine::layout.div>
            <x-moonshine::layout.div class="menu-heading-burger">
                <x-moonshine::layout.burger/>
            </x-moonshine::layout.div>
        </x-moonshine::layout.div>
    </x-moonshine::layout.div>

    <x-moonshine::layout.div class="menu" ::class="asideMenuOpen && '_is-opened'">
        <x-moonshine::layout.menu :elements="[
            ['label' => 'Панель управления', 'url' => '/dashboard', 'icon' => 'home'],
            ['label' => 'Заказы', 'url' => '/orders', 'icon' => 's.shopping-bag'],
            ['label' => 'Товары', 'url' => '/products', 'icon' => 'cube'],
            ['label' => 'Клиенты', 'url' => '/customers', 'icon' => 'users'],
            ['label' => 'Аналитика', 'url' => '/analytics', 'icon' => 'chart-bar'],
            ['label' => 'Отчеты', 'url' => '/reports', 'icon' => 'document-text'],
            ['label' => 'Настройки', 'url' => '/settings', 'icon' => 'cog-6-tooth']
        ]"/>
    </x-moonshine::layout.div>
</x-moonshine::layout.sidebar>

<!-- Minimal sidebar structure (burger only) -->
<x-moonshine::layout.sidebar>
    <x-moonshine::layout.div class="menu-heading">
        <x-moonshine::layout.div class="menu-heading-actions">
            <x-moonshine::layout.div class="menu-heading-burger">
                <x-moonshine::layout.burger />
            </x-moonshine::layout.div>
        </x-moonshine::layout.div>
    </x-moonshine::layout.div>

    <x-moonshine::layout.div class="menu" ::class="asideMenuOpen && '_is-opened'">
        <x-moonshine::layout.menu :elements="[
            ['label' => 'Dashboard', 'url' => '/dashboard', 'icon' => 'home'],
            ['label' => 'Products', 'url' => '/products', 'icon' => 'cube']
        ]"/>
    </x-moonshine::layout.div>
</x-moonshine::layout.sidebar>
```
**Parameters:**
- `collapsed` (bool) - collapse sidebar by default

**⚠️ Important Sidebar Structure:**

**Menu Wrapper:**
When using collapsible sidebar functionality, the menu must be wrapped in `<x-moonshine::layout.div class="menu" ::class="asideMenuOpen && '_is-opened'">`. This wrapper:
- Enables proper collapse/expand animations
- Manages visibility states with Alpine.js reactive classes
- Required for responsive behavior on mobile devices

**Header Actions Structure:**
Theme switcher and burger button in the sidebar header require specific wrapper structure:
```blade
<x-moonshine::layout.div class="menu-heading-actions">
    <x-moonshine::layout.div class="menu-heading-mode">
        <x-moonshine::layout.theme-switcher/>
    </x-moonshine::layout.div>
    <x-moonshine::layout.div class="menu-heading-burger">
        <x-moonshine::layout.burger/>
    </x-moonshine::layout.div>
</x-moonshine::layout.div>
```
This structure:
- `menu-heading-actions` - container for all header action buttons
- `menu-heading-mode` - specific wrapper for theme switcher
- `menu-heading-burger` - specific wrapper for burger menu button
- Required for proper alignment, spacing, and responsive behavior

### Header (Top Header)
**Purpose:** Creating top page header with navigation
```blade
<x-moonshine::layout.header>
    <x-moonshine::breadcrumbs :items="['#' => 'Home', '/section' => 'Section']"/>
</x-moonshine::layout.header>
```

### Wrapper (Layout Wrapper)
**Purpose:** Wrapper component to ensure proper display of layout elements
```blade
<x-moonshine::layout.wrapper>
    <x-moonshine::layout.sidebar>
        <!-- Sidebar content -->
    </x-moonshine::layout.sidebar>
    <x-moonshine::layout.content>
        <!-- Main content -->
    </x-moonshine::layout.content>
</x-moonshine::layout.wrapper>
```

**Important Notes:**
- **Layout wrapper** - used immediately after `Body` component
- **Ensures proper display** - provides correct layout structure for sidebar and content
- **Flexible content** - can contain various layout elements

**Common patterns:**

```blade
<!-- Basic wrapper with content -->
<x-moonshine::layout.body>
    <x-moonshine::layout.wrapper>
        <x-moonshine::layout.content>
            <!-- Page content -->
        </x-moonshine::layout.content>
    </x-moonshine::layout.wrapper>
</x-moonshine::layout.body>

<!-- With sidebar and content -->
<x-moonshine::layout.body>
    <x-moonshine::layout.wrapper>
        <x-moonshine::layout.sidebar>
            <!-- Sidebar -->
        </x-moonshine::layout.sidebar>
        <x-moonshine::layout.content>
            <!-- Main content -->
        </x-moonshine::layout.content>
    </x-moonshine::layout.wrapper>
</x-moonshine::layout.body>
```

### Content (Main Content)
**Purpose:** Container for main page content
```blade
<x-moonshine::layout.content>
    <!-- Page content -->
</x-moonshine::layout.content>
```

**Best Practices:**
- **Recommended:** Use one `content` component for main page content area
- **Flexible:** Multiple `content` components are allowed if needed for layout structure
- **Semantic:** Think of `content` as semantic sections of your page

**Single content (recommended):**
```blade
<x-moonshine::layout.body>
    <x-moonshine::layout.header>...</x-moonshine::layout.header>
    <x-moonshine::layout.wrapper>
        <x-moonshine::layout.content>
            <!-- All main page content here -->
            <section id="hero">...</section>
            <section id="features">...</section>
            <section id="footer">...</section>
        </x-moonshine::layout.content>
    </x-moonshine::layout.wrapper>
</x-moonshine::layout.body>
```

**Multiple content (when needed for specific layout):**
```blade
<x-moonshine::layout.body>
    <x-moonshine::layout.header>...</x-moonshine::layout.header>
    <x-moonshine::layout.wrapper>
        <x-moonshine::layout.content id="hero">
            <!-- Hero section -->
        </x-moonshine::layout.content>
        <x-moonshine::layout.content id="main">
            <!-- Main content -->
        </x-moonshine::layout.content>
    </x-moonshine::layout.wrapper>
    <x-moonshine::layout.footer>
        <!-- Footer content -->
    </x-moonshine::layout.footer>
</x-moonshine::layout.body>
```

### Grid (Grid Layout)
**Purpose:** Creating grid layout (12 columns)
```blade
<x-moonshine::layout.grid :gap="6">
    <x-moonshine::layout.column :colSpan="8" :adaptiveColSpan="12">
        <!-- Main content -->
    </x-moonshine::layout.column>
    <x-moonshine::layout.column :colSpan="4" :adaptiveColSpan="12">
        <!-- Side content -->
    </x-moonshine::layout.column>
</x-moonshine::layout.grid>
```
**Grid Parameters:**
- `gap` (int) - spacing between elements (default 6)

**Column Parameters:**
- `colSpan` (int) - number of columns for screens ≥1280px (1-12)
- `adaptiveColSpan` (int) - number of columns for screens <1280px (1-12)

### Flex (Flex Container)
**Purpose:** Creating flexible layout
```blade
<x-moonshine::layout.flex
    :itemsAlign="'center'"
    :justifyAlign="'between'"
    :colSpan="12"
    :adaptiveColSpan="12"
    :withoutSpace="false"
>
    <div>Element 1</div>
    <div>Element 2</div>
</x-moonshine::layout.flex>
```
**Parameters:**
- `itemsAlign` (string) - vertical alignment: 'start', 'center', 'end', 'stretch'
- `justifyAlign` (string) - horizontal alignment: 'start', 'center', 'end', 'between', 'around'
- `colSpan` (int) - columns for large screens
- `adaptiveColSpan` (int) - columns for small screens
- `withoutSpace` (bool) - remove spacing

## Interface Components

### Box (Container Block)
**Purpose:** Highlighting content in separate block
```blade
<x-moonshine::layout.box title="Users Management" :dark="false">
    <x-moonshine::icon icon="users"></x-moonshine::icon>
    Block content
</x-moonshine::layout.box>

<!-- With solid icon -->
<x-moonshine::layout.box title="Statistics" :dark="true">
    <x-moonshine::icon icon="s.chart-bar"></x-moonshine::icon>
    Dashboard stats
</x-moonshine::layout.box>
```
**Parameters:**
- `title` (string) - block title
- `dark` (bool) - dark theme for block

**Icon Usage in Box:**
- Use `<x-moonshine::icon icon="icon-name">` inside the box
- All Heroicons available: outline (default), solid (s.), mini (m.), micro (c.)

### Card (Content Card)
**Purpose:** Creating content cards
```blade
<x-moonshine::card
    :title="'Card Title'"
    :thumbnail="'/path/to/image.jpg'"
    :url="'https://example.com'"
    :subtitle="'Subtitle'"
    :values="['ID' => 1, 'Author' => 'Name']"
>
    Card content
</x-moonshine::card>
```
**Parameters:**
- `title` (string) - card title
- `thumbnail` (string|array) - image or array of images
- `url` (string) - link
- `subtitle` (string) - subtitle
- `values` (array) - list of values in key-value format

### Alert (Notification)
**Purpose:** Displaying notifications and messages
```blade
<x-moonshine::alert
    type="success"
    icon="check-circle"
    :removable="true"
>
    Success message
</x-moonshine::alert>

<!-- With solid icon -->
<x-moonshine::alert
    type="warning"
    icon="s.exclamation-triangle"
    :removable="true"
>
    Warning message
</x-moonshine::alert>

<!-- Simple alert without custom icon (uses default type icon) -->
<x-moonshine::alert type="info">
    Information message
</x-moonshine::alert>
```
**Parameters:**
- `type` (string) - type: 'primary', 'secondary', 'success', 'warning', 'error', 'info'
- `icon` (string) - Heroicons name (outline by default, add s./m./c. prefixes for other styles)
- `removable` (bool) - closeable

**Important Alert Behavior:**
- **Built-in icon**: Alert component already includes an icon based on the `type` parameter
- **Don't add extra icons**: No need to add `<x-moonshine::icon>` inside alert content
- **Content centering**: Text content inside alert is automatically centered with the icon
- **Icon override**: Use `icon` parameter only when you want a different icon than the default

**❌ Don't do this:**
```blade
<x-moonshine::alert type="success">
    <x-moonshine::icon icon="check"></x-moonshine::icon> <!-- Unnecessary -->
    Success message
</x-moonshine::alert>
```

**✅ Do this:**
```blade
<x-moonshine::alert type="success">
    Success message
</x-moonshine::alert>

<!-- Or with custom icon -->
<x-moonshine::alert type="success" icon="s.heart">
    Success message
</x-moonshine::alert>
```

### Modal (Modal Window)
**Purpose:** Creating modal windows
```blade
<x-moonshine::modal
    title="Title"
    :wide="false"
    :auto="false"
    :closeOutside="true"
    :async="false"
    :asyncUrl="null"
>
    <div>Modal content</div>

    <x-slot name="outerHtml">
        <x-moonshine::link-button @click.prevent="toggleModal">
            Open Modal
        </x-moonshine::link-button>
    </x-slot>
</x-moonshine::modal>
```
**Parameters:**
- `title` (string) - modal title
- `wide` (bool) - wide modal window
- `auto` (bool) - automatic width based on content
- `closeOutside` (bool) - close on outside click
- `async` (bool) - asynchronous content loading
- `asyncUrl` (string) - URL for async loading

### Table (Data Table)
**Purpose:** Displaying tabular data
```blade
<x-moonshine::table
    :columns="['#', 'Name', 'Email', 'Actions']"
    :values="[
        [1, 'John Doe', 'john@example.com', 'Edit'],
        [2, 'Jane Smith', 'jane@example.com', 'Edit']
    ]"
    :simple="false"
    :notfound="true"
>
</x-moonshine::table>
```
**Parameters:**
- `columns` (array) - column headers
- `values` (array) - table data
- `simple` (bool) - simplified view
- `notfound` (bool) - enable "no data found" alert when values array is empty

**NotFound Parameter Behavior:**
```blade
<!-- When notfound="true" and values is empty, shows alert -->
<x-moonshine::table
    :columns="['Name', 'Email']"
    :values="[]"
    :notfound="true"
>
</x-moonshine::table>
<!-- Result: Shows "No data found" alert instead of empty table -->

<!-- When notfound="false" and values is empty, shows empty table -->
<x-moonshine::table
    :columns="['Name', 'Email']"
    :values="[]"
    :notfound="false"
>
</x-moonshine::table>
<!-- Result: Shows table headers with no rows -->
```

**⚠️ Best Practices for Table Data:**

**Backend Data Formation:**
It's recommended to prepare `values` array on the backend side rather than in Blade templates for better performance and maintainability:

```php
// Controller
public function index()
{
    $users = User::all()->map(function ($user) {
        return [
            $user->id,
            $user->name,
            $user->email,
            $user->created_at->format('d.m.Y')
        ];
    })->toArray();

    return view('users.index', compact('users'));
}
```

**Action Buttons in Tables:**
For tables with action buttons, use class-based component representations with ActionButton components:

```php
// Single button
[
    $user->id,
    $user->name,
    $user->email,
    ActionButton::make('Edit', route('users.edit', $user))
        ->icon('pencil')
        ->primary()
]

// Multiple buttons - wrap in Preview or Fieldset
[
    $user->id,
    $user->name,
    $user->email,
    Preview::make()->fields([
        ActionButton::make('Edit', route('users.edit', $user))->icon('pencil'),
        ActionButton::make('Delete', route('users.destroy', $user))->icon('trash')->warning()
    ])
]

// Alternative with Fieldset
[
    $user->id,
    $user->name,
    $user->email,
    Fieldset::make()->fields([
        ActionButton::make('View', route('users.show', $user))->icon('eye'),
        ActionButton::make('Edit', route('users.edit', $user))->icon('pencil'),
        ActionButton::make('Delete', route('users.destroy', $user))->icon('trash')
    ])
]
```

This approach provides:
- Better type safety and IDE support
- Proper action handling and routing
- Consistent styling and behavior
- Easier maintenance and testing

### Form (Form)
**Purpose:** Creating forms
```blade
<x-moonshine::form
    name="contact-form"
    :errors="$errors"
    :precognitive="false"
    action="/submit"
    method="POST"
>
    <x-moonshine::form.input
        name="name"
        placeholder="Your name"
        value=""
        required
    />

    <x-moonshine::form.input
        name="email"
        type="email"
        placeholder="Email"
        value=""
        required
    />

    <x-moonshine::form.textarea
        name="message"
        placeholder="Message"
        rows="5"
    ></x-moonshine::form.textarea>

    <x-slot:buttons>
        <x-moonshine::form.button type="reset">Cancel</x-moonshine::form.button>
        <x-moonshine::form.button class="btn-primary">Submit</x-moonshine::form.button>
    </x-slot:buttons>
</x-moonshine::form>
```
**Form Parameters:**
- `name` (string) - form name
- `errors` (object) - validation errors object
- `precognitive` (bool) - pre-validation
- `action` (string) - form processing URL
- `method` (string) - HTTP method

**Input Parameters:**
- `name` (string) - field name
- `type` (string) - field type: 'text', 'email', 'password', 'number'
- `placeholder` (string) - placeholder text
- `value` (string) - field value
- `required` (bool) - required field

### Dropdown (Dropdown Menu)
**Purpose:** Creating dropdown menus
```blade
<x-moonshine::dropdown
    title="Dropdown title"
    placement="bottom-start"
    :searchable="false"
    searchPlaceholder="Search..."
>
    <div class="m-4">Dropdown content</div>

    <x-slot:toggler>Click me</x-slot:toggler>
    <x-slot:footer>Footer content</x-slot:footer>
</x-moonshine::dropdown>
```
**Parameters:**
- `title` (string) - dropdown title
- `placement` (string) - position: 'top', 'bottom', 'left', 'right', 'bottom-start', etc.
- `searchable` (bool) - enable search
- `searchPlaceholder` (string) - search placeholder

### Collapse (Collapsible Content)
**Purpose:** Creating collapsible content blocks
```blade
<x-moonshine::collapse
    :label="'Collapsible Section'"
    :open="false"
    :persist="true"
>
    <div>Collapsible content here</div>
</x-moonshine::collapse>
```
**Parameters:**
- `label` (string) - collapse title
- `open` (bool) - expanded by default
- `persist` (bool) - save state

### Breadcrumbs (Navigation Breadcrumbs)
**Purpose:** Creating navigation breadcrumbs
```blade
<x-moonshine::breadcrumbs
    :items="[
        '/' => 'Home',
        '/articles' => 'Articles',
        '#' => 'Current Page'
    ]"
/>
```
**Parameters:**
- `items` (array) - breadcrumb items (URL => Label)

### Badge (Label/Badge)
**Purpose:** Creating labels and badges
```blade
<x-moonshine::badge color="success" size="sm">Active</x-moonshine::badge>
```
**Parameters:**
- `color` (string) - color: 'primary', 'secondary', 'success', 'warning', 'error', 'info'
- `size` (string) - size: 'sm', 'md', 'lg'

### Divider (Content Divider)
**Purpose:** Dividing content
```blade
<x-moonshine::layout.divider>Divider text</x-moonshine::layout.divider>
```

### Progress Bar (Progress Indicator)
**Purpose:** Displaying progress
```blade
<x-moonshine::progress-bar
    :value="75"
    :max="100"
    color="success"
    :radial="false"
    size="sm"
>
    75%
</x-moonshine::progress-bar>
```
**Parameters:**
- `value` (int) - current value
- `max` (int) - maximum value
- `color` (string) - color: 'primary', 'secondary', 'success', 'warning', 'error'
- `radial` (bool) - circular progress bar
- `size` (string) - size: 'sm', 'md', 'lg'

**⚠️ Important Slot Usage:**
- **Plain text only**: Add simple text content to the slot without any wrappers or HTML tags
- **No extra classes**: Text is automatically centered and styled by the component
- **Content examples**: Percentage values like "75%", status text like "Loading...", or completion info like "3 of 10"

**Examples:**
```blade
<!-- With percentage text -->
<x-moonshine::progress-bar :value="75" :max="100" color="success">
    75%
</x-moonshine::progress-bar>

<!-- With status text -->
<x-moonshine::progress-bar :value="50" :max="100" color="primary">
    Processing...
</x-moonshine::progress-bar>

<!-- With completion info -->
<x-moonshine::progress-bar :value="3" :max="10" color="warning">
    3 of 10 completed
</x-moonshine::progress-bar>

<!-- Empty slot is also valid -->
<x-moonshine::progress-bar :value="80" :max="100" color="success">
</x-moonshine::progress-bar>
```

**❌ Don't do this:**
```blade
<!-- Don't wrap text in divs or spans -->
<x-moonshine::progress-bar :value="75" :max="100">
    <div class="text-center">75%</div> <!-- Unnecessary wrapper -->
</x-moonshine::progress-bar>

<!-- Don't add extra styling classes -->
<x-moonshine::progress-bar :value="75" :max="100">
    <span class="font-bold">75%</span> <!-- Unnecessary styling -->
</x-moonshine::progress-bar>
```

### Tabs (Tab Navigation)
**Purpose:** Creating tabbed interfaces
```blade
<x-moonshine::tabs
    :tabs="[
        ['id' => 'tab1', 'label' => 'Tab 1'],
        ['id' => 'tab2', 'label' => 'Tab 2']
    ]"
>
    <x-slot name="tab1">First tab content</x-slot>
    <x-slot name="tab2">Second tab content</x-slot>
</x-moonshine::tabs>
```
**Parameters:**
- `tabs` (array) - array of tabs with id and label

### Spinner (Loading Indicator)
**Purpose:** Loading indicator
```blade
<x-moonshine::spinner
    size="md"
    color="primary"
    :absolute="false"
>
</x-moonshine::spinner>
```
**Parameters:**
- `size` (string) - size: 'sm', 'md', 'lg', 'xl'
- `color` (string) - color: 'primary', 'secondary', 'success', 'warning', 'error'
- `absolute` (bool) - absolute positioning

### Carousel (Image Carousel)
**Purpose:** Creating image carousels
```blade
<x-moonshine::carousel
    :items="['/images/image1.jpg', '/images/image2.jpg']"
    :portrait="false"
    alt="Image description"
/>
```
**Parameters:**
- `items` (array) - array of image URLs
- `portrait` (bool) - portrait orientation
- `alt` (string) - alternative text

### Popover (Hover Tooltip)
**Purpose:** Creating hover tooltips
```blade
<x-moonshine::popover title="Popover title" placement="right">
    <x-slot:trigger>
        <button class="btn">Hover me</button>
    </x-slot:trigger>
    <p>Popover content here</p>
</x-moonshine::popover>
```
**Parameters:**
- `title` (string) - popover title
- `placement` (string) - position relative to trigger

### Rating (Star Rating)
**Purpose:** Displaying star ratings
```blade
<x-moonshine::rating value="4" min="1" max="5" />
```
**Parameters:**
- `value` (int) - current rating value
- `min` (int) - minimum value
- `max` (int) - maximum value

### Icon (Standalone Icon)
**Purpose:** Displaying individual icons
```blade
<!-- Outline icons (default) -->
<x-moonshine::icon icon="home" />
<x-moonshine::icon icon="users" />
<x-moonshine::icon icon="cog-6-tooth" />

<!-- Solid icons -->
<x-moonshine::icon icon="s.home" />
<x-moonshine::icon icon="s.users" />
<x-moonshine::icon icon="s.heart" />

<!-- Mini icons -->
<x-moonshine::icon icon="m.star" />
<x-moonshine::icon icon="m.bell" />

<!-- Micro icons -->
<x-moonshine::icon icon="c.check" />
<x-moonshine::icon icon="c.x-mark" />

<!-- With custom size and color -->
<x-moonshine::icon icon="academic-cap" size="8" color="primary" />
```
**Parameters:**
- `icon` (string) - Heroicons name with optional prefix (s./m./c.)
- `size` (int) - icon size (default 5)
- `color` (string) - icon color: 'primary', 'secondary', 'success', 'warning', 'error'

**Icon Reference:**
- Full icon list: https://heroicons.com/
- **Outline (default)**: `icon="icon-name"`
- **Solid**: `icon="s.icon-name"`
- **Mini**: `icon="m.icon-name"`
- **Micro**: `icon="c.icon-name"`

**Common Icons:**
- Navigation: `home`, `users`, `cog-6-tooth`, `chart-bar`, `document-text`
- Actions: `plus`, `pencil`, `trash`, `eye`, `arrow-right`
- Status: `check-circle`, `x-circle`, `exclamation-triangle`, `information-circle`
- UI: `bars-3`, `x-mark`, `magnifying-glass`, `bell`, `heart`

### Logo (Brand Logo)
**Purpose:** Displaying brand logo with automatic responsive behavior
```blade
<!-- Basic logo -->
<x-moonshine::layout.logo
    href="/"
    :logo="'/images/logo.svg'"
/>

<!-- Logo with small version for mobile/minimized sidebar -->
<x-moonshine::layout.logo
    href="/"
    :logo="'/images/logo.svg'"
    :logoSmall="'/images/logo-small.svg'"
    :minimized="false"
/>

<!-- Logo with title tooltip -->
<x-moonshine::layout.logo
    href="/"
    :logo="'/images/logo.svg'"
    :logoSmall="'/images/logo-small.svg'"
    title="Company Name"
/>

<!-- Logo that adapts to sidebar state -->
<x-moonshine::layout.logo
    href="/dashboard"
    :logo="'/images/logo-full.svg'"
    :logoSmall="'/images/logo-icon.svg'"
    :minimized="true"
/>
```
**Parameters:**
- `href` (string) - URL where logo links when clicked
- `logo` (string) - path to main logo image
- `logoSmall` (string, optional) - path to small/icon version of logo
- `title` (string, optional) - tooltip text on hover
- `minimized` (bool) - whether to show small logo (interacts with Sidebar state)

**Logo Behavior:**
- **Responsive**: Automatically switches between full and small logo based on available space
- **Sidebar integration**: When sidebar is collapsed, shows small logo if provided
- **Minimized mode**: When `minimized="true"`, shows small logo by default
- **Fallback**: If no small logo provided, scales down the main logo

**Best Practices:**
- **Provide both versions**: Always include both full and small logo for best UX
- **SVG format recommended**: Vector graphics scale better across all screen sizes
- **Consistent branding**: Ensure small logo maintains brand recognition
- **Appropriate sizing**: Small logo should work well at ~32px dimensions

**Common Use Cases:**
```blade
<!-- In sidebar header -->
<x-moonshine::layout.sidebar>
    <x-moonshine::layout.div class="menu-heading">
        <x-moonshine::layout.logo
            href="/"
            :logo="'/images/company-logo.svg'"
            :logoSmall="'/images/company-icon.svg'"
            title="Company Dashboard"
        />
    </x-moonshine::layout.div>
</x-moonshine::layout.sidebar>

<!-- In top navigation -->
<x-moonshine::layout.header>
    <x-moonshine::layout.logo
        href="/"
        :logo="'/images/horizontal-logo.svg'"
    />
</x-moonshine::layout.header>
```

### Link (Styled Links)
**Purpose:** Creating styled links with various appearances
```blade
<!-- Basic link button -->
<x-moonshine::link-button href="/dashboard">
    Go to Dashboard
</x-moonshine::link-button>

<!-- Native link style -->
<x-moonshine::link-native href="/profile">
    View Profile
</x-moonshine::link-native>

<!-- Filled link button -->
<x-moonshine::link-button href="/settings" :filled="true">
    Settings
</x-moonshine::link-button>

<!-- Link with icon -->
<x-moonshine::link-button href="https://external-site.com">
    External Link
    <x-moonshine::icon icon="arrow-top-right-on-square" />
</x-moonshine::link-button>
```
**Parameters:**
- `href` (string) - link URL
- `filled` (bool) - filled button style
- Standard link attributes: `target`, `title`, etc.

**Link Types:**
- **link-button**: Styled as button
- **link-native**: Natural link appearance

### OffCanvas (Side Panel)
**Purpose:** Creating slide-out side panels
```blade
<x-moonshine::off-canvas
    title="Settings Panel"
    :left="false"
    :wide="false"
    :full="false"
    :open="false"
>
    <x-slot:toggler>
        Open Settings
    </x-slot:toggler>

    <div>
        <p>Panel content here</p>
        <button class="btn btn-primary">Save</button>
    </div>
</x-moonshine::off-canvas>

<!-- Left-positioned panel -->
<x-moonshine::off-canvas title="Navigation" :left="true">
    <x-slot:toggler>
        <x-moonshine::icon icon="bars-3" />
        Menu
    </x-slot:toggler>

    <nav>
        <a href="/home">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>
</x-moonshine::off-canvas>

<!-- Wide panel -->
<x-moonshine::off-canvas title="Form Panel" :wide="true">
    <x-slot:toggler>Edit Form</x-slot:toggler>

    <x-moonshine::form name="edit-form">
        <!-- Form content -->
    </x-moonshine::form>
</x-moonshine::off-canvas>
```
**Parameters:**
- `title` (string) - panel title
- `left` (bool) - position on left side (default: right)
- `wide` (bool) - wider panel
- `full` (bool) - full width panel
- `open` (bool) - open by default

**Important Toggler Slot Note:**
⚠️ The `toggler` slot content is automatically wrapped in a `<button>` element by MoonShine. **Do not add an additional button element inside the toggler slot** - just provide the text or icon content directly.

```blade
<!-- ✅ Correct - text/icon only in toggler slot -->
<x-slot:toggler>
    <x-moonshine::icon icon="bars-3" />
    Menu
</x-slot:toggler>

<!-- ❌ Incorrect - don't wrap in button -->
<x-slot:toggler>
    <button>Menu</button> <!-- This creates nested buttons -->
</x-slot:toggler>
```

**OffCanvas Features:**
- **Positioning**: Left or right side of screen
- **Width options**: Normal, wide, or full width
- **Async loading**: Load content dynamically
- **Event system**: Toggle via JavaScript events
- **Auto-close**: Configurable closing behavior

**Event Integration:**
```blade
<!-- Trigger via ActionButton -->
ActionButton::make('Open Panel')->toggleOffCanvas('my-panel')

<!-- Manual event triggering -->
<button @click="$dispatch('off_canvas_toggled:my-panel')">
    Toggle Panel
</button>
```


### Heading (Text Headings)
**Purpose:** Creating styled headings with customizable levels
```blade
<!-- Basic heading -->
<x-moonshine::heading h="1">
    Main Page Title
</x-moonshine::heading>

<!-- Different heading levels -->
<x-moonshine::heading h="2">Section Title</x-moonshine::heading>
<x-moonshine::heading h="3">Subsection Title</x-moonshine::heading>
<x-moonshine::heading h="4">Small Heading</x-moonshine::heading>

<!-- Heading with semantic HTML tag -->
<x-moonshine::heading h="1" :asClass="false">
    Real H1 Tag
</x-moonshine::heading>

<!-- Custom tag with heading class -->
<x-moonshine::heading h="2" tag="p">
    Paragraph with H2 Style
</x-moonshine::heading>
```
**Parameters:**
- `h` (int) - heading level (1-6)
- `asClass` (bool) - use CSS class instead of HTML heading tag (default: true)
- `tag` (string) - custom HTML tag to use

**Heading Behavior:**
- **Default**: Uses `<div>` with heading classes (e.g., `class="h1"`)
- **Semantic**: Set `asClass="false"` to use actual `<h1>`, `<h2>`, etc. tags
- **Custom tag**: Override HTML tag while keeping heading styles
- **Responsive**: Heading styles adapt to screen size

### Burger (Mobile Menu Button)
**Purpose:** Mobile menu toggle button (hamburger icon)
```blade
<x-moonshine::layout.burger />
```

**Burger Usage:**
- **Mobile navigation**: Typically used in mobile layouts
- **Sidebar toggle**: Controls sidebar visibility on small screens
- **Auto-generated**: Usually part of default MoonShine layout
- **No parameters**: Simple component with built-in functionality

**Common Integration:**
```blade
<x-moonshine::layout.sidebar>
    <x-moonshine::layout.div class="menu-heading">
        <x-moonshine::layout.logo href="/" :logo="'/logo.png'"/>
        <x-moonshine::layout.div class="menu-heading-actions">
            <x-moonshine::layout.div class="menu-heading-burger">
                <x-moonshine::layout.burger />
            </x-moonshine::layout.div>
        </x-moonshine::layout.div>
    </x-moonshine::layout.div>
</x-moonshine::layout.sidebar>
```




### TopBar (Top Navigation)
**Purpose:** Creating top navigation panels
```blade
<!-- Standalone TopBar (without sidebar) -->
<x-moonshine::layout.top-bar>
    <x-moonshine::layout.menu
        :elements="[
            ['label' => 'Dashboard', 'url' => '/'],
            ['label' => 'Users', 'url' => '/users'],
            ['label' => 'Settings', 'url' => '/settings']
        ]"
    />

    <!-- Additional TopBar components can be added here -->
</x-moonshine::layout.top-bar>

<!-- TopBar with Sidebar (must be inside wrapper) -->
<x-moonshine::layout.wrapper>
    <x-moonshine::layout.top-bar>
        <x-moonshine::layout.menu
            :elements="[
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'About', 'url' => '/about']
            ]"
        />
    </x-moonshine::layout.top-bar>

    <x-moonshine::layout.sidebar>
        <!-- Sidebar content -->
    </x-moonshine::layout.sidebar>

    <x-moonshine::layout.div class="layout-page">
        <x-moonshine::layout.content>
            <!-- Main content -->
        </x-moonshine::layout.content>
    </x-moonshine::layout.div>
</x-moonshine::layout.wrapper>
```

**⚠️ Important TopBar + Sidebar Layout:**
When using TopBar together with Sidebar, the TopBar must be placed **inside the wrapper** as the **first child element**, positioned above the sidebar in the wrapper structure.

**TopBar Features:**
- **Menu integration**: Support for navigation menus
- **Flexible layout**: Can contain various navigation components
- **Responsive design**: Adapts to different screen sizes
- **Sidebar compatibility**: Works with sidebar layouts when properly structured


### Thumbnails (Image Gallery)
**Purpose:** Displaying image thumbnails and galleries
```blade
<!-- Basic thumbnails -->
<x-moonshine::thumbnails
    :items="[
        '/images/thumb1.jpg',
        '/images/thumb2.jpg',
        '/images/thumb3.jpg'
    ]"
/>

<!-- Thumbnails with click action -->
<x-moonshine::thumbnails
    :items="[
        ['src' => '/images/thumb1.jpg', 'alt' => 'Image 1'],
        ['src' => '/images/thumb2.jpg', 'alt' => 'Image 2']
    ]"
    :clickable="true"
    :gallery="true"
/>
```
**Parameters:**
- `items` (array) - array of image URLs or objects with src/alt
- `clickable` (bool) - enable click to enlarge
- `gallery` (bool) - enable gallery mode for navigation between images

### When (Conditional Rendering)
**Purpose:** Conditionally rendering content based on conditions
```blade
<!-- Simple condition -->
<x-moonshine::when :condition="$user->isAdmin()">
    <x-moonshine::alert type="info">
        Admin panel content
    </x-moonshine::alert>
</x-moonshine::when>

<!-- With fallback content -->
<x-moonshine::when :condition="$user->hasPermission('edit')">
    <x-slot:then>
        <x-moonshine::action-button>Edit</x-moonshine::action-button>
    </x-slot:then>
    <x-slot:else>
        <span class="text-gray-500">No permission to edit</span>
    </x-slot:else>
</x-moonshine::when>
```
**Parameters:**
- `condition` (bool) - condition to evaluate for rendering

### ThemeSwitcher (Theme Toggle)
**Purpose:** Allowing users to switch between light and dark themes
```blade
<!-- Basic theme switcher -->
<x-moonshine::layout.theme-switcher />

<!-- Theme switcher with custom styling -->
<x-moonshine::layout.theme-switcher class="custom-theme-switcher" />
```

**ThemeSwitcher Features:**
- **Automatic detection**: Detects system theme preference
- **Persistent**: Remembers user's theme choice
- **Smooth transition**: Animated theme switching
- **Icon display**: Shows appropriate sun/moon icons



### Mobilebar (Mobile Navigation)
**Purpose:** Mobile-specific navigation bar
```blade
<x-moonshine::layout.mobilebar>
    <x-moonshine::layout.burger />
    <x-moonshine::layout.logo
        href="/"
        :logo="'/images/logo-mobile.svg'"
    />
    <!-- Additional mobile components can be added here -->
</x-moonshine::layout.mobilebar>
```

### Metrics (Metrics Display)
**Purpose:** Displaying metrics and statistics
```blade
<!-- Basic metric -->
<x-moonshine::metric
    label="Total Users"
    :value="1250"
    :change="+12%"
    color="success"
/>

<!-- Metric with icon -->
<x-moonshine::metric
    label="Revenue"
    :value="'$45,230'"
    :change="-3%"
    color="error"
    icon="currency-dollar"
/>

<!-- Metric grid -->
<x-moonshine::layout.grid>
    <x-moonshine::layout.column :colSpan="3">
        <x-moonshine::metric label="Orders" :value="156" />
    </x-moonshine::layout.column>
    <x-moonshine::layout.column :colSpan="3">
        <x-moonshine::metric label="Revenue" :value="'$12,450'" />
    </x-moonshine::layout.column>
</x-moonshine::layout.grid>
```
**Parameters:**
- `label` (string) - metric label
- `value` (string|int) - metric value
- `change` (string) - change percentage (optional)
- `color` (string) - color theme: 'success', 'error', 'warning', 'info'
- `icon` (string) - Heroicons icon name

### Flash (Flash Messages)
**Purpose:** Displaying flash messages and temporary notifications
```blade
<!-- Success flash message -->
<x-moonshine::flash type="success">
    Your changes have been saved successfully!
</x-moonshine::flash>

<!-- Error flash message -->
<x-moonshine::flash type="error">
    An error occurred while processing your request.
</x-moonshine::flash>

<!-- Flash with automatic dismiss -->
<x-moonshine::flash
    type="info"
    :removable="true"
    :timeout="5000"
>
    This message will disappear in 5 seconds.
</x-moonshine::flash>
```
**Parameters:**
- `type` (string) - message type: 'success', 'error', 'warning', 'info'
- `removable` (bool) - show close button
- `timeout` (int) - auto-dismiss timeout in milliseconds

### Files (File Upload/Display)
**Purpose:** File upload and file display components
```blade
<!-- File upload -->
<x-moonshine::files
    name="documents"
    :multiple="true"
    :accept="['pdf', 'doc', 'docx']"
    :max-size="10"
/>

<!-- File display -->
<x-moonshine::files
    :files="[
        ['name' => 'document.pdf', 'url' => '/files/document.pdf', 'size' => '2.5 MB'],
        ['name' => 'image.jpg', 'url' => '/files/image.jpg', 'size' => '1.2 MB']
    ]"
    :download="true"
    :preview="true"
/>
```
**Parameters:**
- `name` (string) - input name for uploads
- `multiple` (bool) - allow multiple file selection
- `accept` (array) - accepted file types
- `max-size` (int) - maximum file size in MB
- `files` (array) - array of file objects for display
- `download` (bool) - enable download links
- `preview` (bool) - enable file preview

### FieldsGroup (Field Grouping)
**Purpose:** Grouping form fields together
```blade
<x-moonshine::fields-group
    :label="'Personal Information'"
    :collapsible="true"
    :collapsed="false"
>
    <x-moonshine::form.input name="first_name" placeholder="First Name" />
    <x-moonshine::form.input name="last_name" placeholder="Last Name" />
    <x-moonshine::form.input name="email" type="email" placeholder="Email" />
</x-moonshine::fields-group>

<x-moonshine::fields-group
    :label="'Address Information'"
    :collapsible="true"
>
    <x-moonshine::form.input name="address" placeholder="Address" />
    <x-moonshine::form.input name="city" placeholder="City" />
    <x-moonshine::form.input name="postal_code" placeholder="Postal Code" />
</x-moonshine::fields-group>
```
**Parameters:**
- `label` (string) - group label
- `collapsible` (bool) - enable expand/collapse functionality
- `collapsed` (bool) - start in collapsed state

### Title (Page Title)
**Purpose:** Setting page titles and metadata
```blade
<!-- Basic title -->
<x-moonshine::layout.title>
    Dashboard Overview
</x-moonshine::layout.title>

<!-- Title with subtitle -->
<x-moonshine::layout.title
    subtitle="Manage your application data"
>
    Admin Panel
</x-moonshine::layout.title>

<!-- Title with breadcrumbs -->
<x-moonshine::layout.title>
    User Management
    <x-slot:breadcrumbs>
        <x-moonshine::breadcrumbs :items="[
            '/' => 'Home',
            '/admin' => 'Admin',
            '#' => 'Users'
        ]" />
    </x-slot:breadcrumbs>
</x-moonshine::layout.title>
```
**Parameters:**
- `subtitle` (string) - optional subtitle

### Loader (Loading Indicator)
**Purpose:** Displaying loading states
```blade
<!-- Basic loader -->
<x-moonshine::loader />

<!-- Loader with custom text -->
<x-moonshine::loader text="Loading data..." />

<!-- Loader with overlay -->
<x-moonshine::loader
    :overlay="true"
    text="Processing..."
/>

<!-- Inline loader -->
<x-moonshine::loader
    size="sm"
    :inline="true"
/>
```
**Parameters:**
- `text` (string) - loading text message
- `overlay` (bool) - show overlay background
- `inline` (bool) - display inline instead of block
- `size` (string) - size: 'sm', 'md', 'lg'


### Menu (Navigation Menu)
**Purpose:** Creating navigation menus
```blade
<!-- Sidebar menu (with collapsible wrapper) -->
<x-moonshine::layout.div class="menu" ::class="asideMenuOpen && '_is-opened'">
    <x-moonshine::layout.menu
        :elements="[
            ['label' => 'Dashboard', 'url' => '/', 'icon' => 'home'],
            ['label' => 'Users', 'url' => '/users', 'icon' => 'users'],
            ['label' => 'Settings', 'url' => '/settings', 'icon' => 'cog-6-tooth']
        ]"
    />
</x-moonshine::layout.div>

<!-- Top menu (no wrapper needed) -->
<x-moonshine::layout.menu
    :elements="[
        ['label' => 'Home', 'url' => '/'],
        ['label' => 'About', 'url' => '/about'],
        ['label' => 'Contact', 'url' => '/contact']
    ]"
    :horizontal="true"
/>
```
**Parameters:**
- `elements` (array) - menu items with label, url, and optional icon
- `horizontal` (bool) - horizontal layout for top menus

**⚠️ Important Sidebar Menu Wrapper:**
When menu is used inside a collapsible sidebar, it must be wrapped in `<x-moonshine::layout.div class="menu" ::class="asideMenuOpen && '_is-opened'">` for proper collapse functionality. Top menus don't require this wrapper.

### FlexibleRender (Dynamic Content)
**Purpose:** Rendering dynamic content based on data
```blade
<x-moonshine::flexible-render
    :data="$dynamicData"
    :template="$templateName"
    :fallback="'No content available'"
/>
```
**Parameters:**
- `data` (mixed) - dynamic data to render
- `template` (string) - template name to use
- `fallback` (string) - fallback content when no data


### LineBreak (Line Break)
**Purpose:** Adding line breaks and spacing
```blade
<!-- Simple line break -->
<x-moonshine::line-break />

<!-- Line break with custom spacing -->
<x-moonshine::line-break :height="20" />

<!-- Multiple line breaks -->
<x-moonshine::line-break :count="3" />
```
**Parameters:**
- `height` (int) - custom height in pixels
- `count` (int) - number of line breaks

### Meta (Meta Tags)
**Purpose:** Adding HTML meta tags
```blade
<x-moonshine::layout.meta
    name="description"
    content="Dashboard for managing your application"
/>

<x-moonshine::layout.meta
    property="og:title"
    content="Admin Dashboard"
/>

<x-moonshine::layout.meta
    name="viewport"
    content="width=device-width, initial-scale=1"
/>
```
**Parameters:**
- `name` (string) - meta name attribute
- `property` (string) - meta property attribute
- `content` (string) - meta content value

### Boolean (Boolean Display)
**Purpose:** Displaying boolean values with visual indicators
```blade
<!-- Basic boolean display -->
<x-moonshine::boolean :value="true" />
<x-moonshine::boolean :value="false" />

<!-- Boolean with custom labels -->
<x-moonshine::boolean
    :value="$user->is_active"
    true-label="Active"
    false-label="Inactive"
/>

<!-- Boolean with custom colors -->
<x-moonshine::boolean
    :value="$status"
    true-color="success"
    false-color="error"
/>
```
**Parameters:**
- `value` (bool) - boolean value to display
- `true-label` (string) - label for true state
- `false-label` (string) - label for false state
- `true-color` (string) - color for true state
- `false-color` (string) - color for false state

### Color (Color Display/Picker)
**Purpose:** Displaying colors and color picking
```blade
<!-- Color display -->
<x-moonshine::color :value="'#3B82F6'" />

<!-- Color picker -->
<x-moonshine::color
    name="theme_color"
    :value="'#3B82F6'"
    :picker="true"
/>

<!-- Color with label -->
<x-moonshine::color
    :value="'#10B981'"
    label="Primary Color"
/>
```
**Parameters:**
- `value` (string) - color hex value
- `name` (string) - input name for picker mode
- `picker` (bool) - enable color picker functionality
- `label` (string) - color label

### Div (Layout Div)
**Purpose:** Creating layout containers with MoonShine styling
```blade
<!-- Basic div container -->
<x-moonshine::layout.div>
    Content here
</x-moonshine::layout.div>

<!-- Div with custom classes -->
<x-moonshine::layout.div class="custom-container">
    <p>Custom styled content</p>
</x-moonshine::layout.div>

<!-- Div with flex layout -->
<x-moonshine::layout.div class="flex items-center justify-between">
    <span>Left content</span>
    <span>Right content</span>
</x-moonshine::layout.div>
```

### Assets (Asset Management)
**Purpose:** Managing CSS and JavaScript assets
```blade
<!-- MoonShine default assets -->
<x-moonshine::layout.assets>
    @vite(['resources/css/main.css', 'resources/js/app.js'], 'vendor/moonshine')
</x-moonshine::layout.assets>

<!-- Custom assets -->
<x-moonshine::layout.assets>
    @vite(['resources/css/main.css', 'resources/js/app.js'], 'vendor/moonshine')
    @vite(['resources/css/custom.css', 'resources/js/custom.js'])
</x-moonshine::layout.assets>
```

### Attributes (Dynamic Attributes)
**Purpose:** Adding dynamic HTML attributes to components
```blade
<x-moonshine::attributes
    :attributes="[
        'data-turbo' => 'false',
        'class' => 'custom-class',
        'id' => 'unique-id'
    ]"
/>
```
**Parameters:**
- `attributes` (array) - key-value pairs of HTML attributes

### Body (Layout Body)
**Purpose:** Main body container for layouts
```blade
<x-moonshine::layout.body>
    <x-moonshine::layout.content>
        <!-- Page content -->
    </x-moonshine::layout.content>
</x-moonshine::layout.body>

<!-- Body with attributes -->
<x-moonshine::layout.body class="custom-body">
    <!-- Layout content -->
</x-moonshine::layout.body>
```

### Components (Component Container)
**Purpose:** Container for grouping multiple components
```blade
<x-moonshine::components>
    <x-moonshine::alert type="info">Information message</x-moonshine::alert>
    <x-moonshine::button>Action Button</x-moonshine::button>
    <x-moonshine::badge color="success">Status</x-moonshine::badge>
</x-moonshine::components>
```

### Favicon (Favicon Management)
**Purpose:** Setting page favicon
```blade
<!-- Default favicon -->
<x-moonshine::layout.favicon />

<!-- Custom favicon -->
<x-moonshine::layout.favicon href="/custom-favicon.ico" />

<!-- Multiple favicon sizes -->
<x-moonshine::layout.favicon
    href="/favicon.ico"
    :sizes="['16x16', '32x32', '48x48']"
/>
```
**Parameters:**
- `href` (string) - favicon file path
- `sizes` (array) - array of icon sizes

### Footer (Page Footer)
**Purpose:** Creating page footers
```blade
<!-- Basic footer -->
<x-moonshine::layout.footer>
    <p>&copy; 2024 Your Company. All rights reserved.</p>
</x-moonshine::layout.footer>

<!-- Footer with links -->
<x-moonshine::layout.footer>
    <x-moonshine::layout.flex :justifyAlign="'between'">
        <div>
            <p>&copy; 2024 Your Company</p>
        </div>
        <div>
            <x-moonshine::link-native href="/privacy">Privacy</x-moonshine::link-native>
            <x-moonshine::link-native href="/terms">Terms</x-moonshine::link-native>
        </div>
    </x-moonshine::layout.flex>
</x-moonshine::layout.footer>
```

### Head (HTML Head)
**Purpose:** Managing HTML head section
```blade
<x-moonshine::layout.head>
    <x-moonshine::layout.meta name="csrf-token" :content="csrf_token()" />
    <x-moonshine::layout.meta name="description" content="Page description" />
    <x-moonshine::layout.favicon />
    <x-moonshine::layout.assets>
        @vite(['resources/css/main.css', 'resources/js/app.js'], 'vendor/moonshine')
    </x-moonshine::layout.assets>
</x-moonshine::layout.head>
```

### Html (HTML Document)
**Purpose:** HTML document wrapper with MoonShine features
```blade
<x-moonshine::layout.html
    :with-alpine-js="true"
    :with-themes="true"
    lang="en"
>
    <x-moonshine::layout.head>
        <!-- Head content -->
    </x-moonshine::layout.head>
    <x-moonshine::layout.body>
        <!-- Body content -->
    </x-moonshine::layout.body>
</x-moonshine::layout.html>
```
**Parameters:**
- `with-alpine-js` (bool) - include Alpine.js integration
- `with-themes` (bool) - enable theme system
- `lang` (string) - document language

### Layout (Root Layout)
**Purpose:** Root layout component for MoonShine applications
```blade
<x-moonshine::layout>
    <x-moonshine::layout.html :with-alpine-js="true" :with-themes="true">
        <x-moonshine::layout.head>
            <!-- Head content -->
        </x-moonshine::layout.head>
        <x-moonshine::layout.body>
            <!-- Body content -->
        </x-moonshine::layout.body>
    </x-moonshine::layout.html>
</x-moonshine::layout>
```

## Common Layout Examples

### Dashboard with Sidebar and Grid
```blade
<x-moonshine::layout>
    <x-moonshine::layout.html :with-alpine-js="true" :with-themes="true">
        <x-moonshine::layout.head>
            <x-moonshine::layout.meta name="csrf-token" :content="csrf_token()"/>
            <x-moonshine::layout.favicon />
        </x-moonshine::layout.head>

        <x-moonshine::layout.body>
            <x-moonshine::layout.wrapper>
                <x-moonshine::layout.sidebar>
                    <x-moonshine::layout.div class="menu" ::class="asideMenuOpen && '_is-opened'">
                        <x-moonshine::layout.menu :elements="[
                            ['label' => 'Dashboard', 'url' => '/'],
                            ['label' => 'Users', 'url' => '/users'],
                            ['label' => 'Orders', 'url' => '/orders']
                        ]"/>
                    </x-moonshine::layout.div>
                </x-moonshine::layout.sidebar>

                <x-moonshine::layout.div class="layout-page">
                    <x-moonshine::layout.header>
                        <x-moonshine::breadcrumbs :items="['#' => 'Home']"/>
                    </x-moonshine::layout.header>

                    <x-moonshine::layout.content>
                        <x-moonshine::layout.grid>
                            <x-moonshine::layout.column :colSpan="8">
                                <!-- Main area -->
                                <x-moonshine::layout.box title="Statistics">
                                    <x-moonshine::table
                                        :columns="['Date', 'Sales', 'Profit']"
                                        :values="[
                                            ['01.01.2024', '$1000', '$200'],
                                            ['02.01.2024', '$1200', '$240']
                                        ]"
                                    />
                                </x-moonshine::layout.box>
                            </x-moonshine::layout.column>

                            <x-moonshine::layout.column :colSpan="4">
                                <!-- Sidebar -->
                                <x-moonshine::layout.box title="Quick Actions">
                                    <x-moonshine::alert type="info">
                                        You have 5 new orders
                                    </x-moonshine::alert>
                                </x-moonshine::layout.box>
                            </x-moonshine::layout.column>
                        </x-moonshine::layout.grid>
                    </x-moonshine::layout.content>
                </x-moonshine::layout.div>
            </x-moonshine::layout.wrapper>
        </x-moonshine::layout.body>
    </x-moonshine::layout.html>
</x-moonshine::layout>
```

### Card List Page
```blade
<x-moonshine::layout.wrapper>
    <x-moonshine::layout.content>
        <x-moonshine::layout.grid>
            @foreach($items as $item)
            <x-moonshine::layout.column :colSpan="4" :adaptiveColSpan="12">
                <x-moonshine::card
                    :title="$item['title']"
                    :thumbnail="$item['image']"
                    :url="$item['url']"
                    :values="['Price' => $item['price'], 'Category' => $item['category']]"
                >
                    {{ $item['description'] }}
                </x-moonshine::card>
            </x-moonshine::layout.column>
            @endforeach
        </x-moonshine::layout.grid>
    </x-moonshine::layout.content>
</x-moonshine::layout.wrapper>
```

### Form with Modal
```blade
<x-moonshine::modal title="Contact Form">
    <x-moonshine::form name="contact-form" action="/contact" method="POST">
        <x-moonshine::form.input name="name" placeholder="Your Name" required />
        <x-moonshine::form.input name="email" type="email" placeholder="Email" required />
        <x-moonshine::form.textarea name="message" placeholder="Message" rows="4"></x-moonshine::form.textarea>

        <x-slot:buttons>
            <x-moonshine::form.button type="reset">Cancel</x-moonshine::form.button>
            <x-moonshine::form.button class="btn-primary">Send</x-moonshine::form.button>
        </x-slot:buttons>
    </x-moonshine::form>

    <x-slot name="outerHtml">
        <button class="btn btn-primary" @click.prevent="toggleModal">Contact Us</button>
    </x-slot>
</x-moonshine::modal>
```

## Generation Guidelines

1. **Always use the basic structure** with `layout`, `html`, `head`, `body`, `wrapper`
2. **For responsiveness** use `Grid` and `Column` with different `colSpan` and `adaptiveColSpan`
3. **For notifications** use `Alert` with appropriate type
4. **For forms** always add CSRF token and error handling
5. **For interactivity** use modal windows and Alpine.js events
6. **Parameters with colon** (`:parameter`) accept PHP expressions
7. **Parameters without colon** accept string values
8. **Boolean parameters** can be passed as `:parameter="true"` or just `parameter`

## ⚠️ Important: Component Styling and Spacing

### Pre-configured Component Styling
**Most MoonShine components come with built-in styling and spacing:**

- **Box, Card, Modal, Alert, etc.** - Already have proper padding, margins, and styling
- **Grid and Flex components** - Have built-in spacing systems
- **Form components** - Pre-styled with appropriate spacing
- **Layout components** - Designed with proper spacing relationships

### When NOT to Add Extra Classes
**Avoid adding these classes to MoonShine components:**
```blade
<!-- ❌ DON'T DO THIS - Box already has padding -->
<x-moonshine::layout.box class="p-4 m-4" title="Title">
    Content
</x-moonshine::layout.box>

<!-- ✅ DO THIS - Use component as-is -->
<x-moonshine::layout.box title="Title">
    Content
</x-moonshine::layout.box>
```

### When TO Add Spacing
**Add spacing between elements INSIDE components based on user requirements:**

```blade
<!-- ✅ Good - Spacing between internal elements -->
<x-moonshine::layout.box title="User Profile">
    <div class="space-y-4">
        <p>User information paragraph</p>
        <button class="btn btn-primary">Edit Profile</button>
        <button class="btn btn-secondary">Delete Account</button>
    </div>
</x-moonshine::layout.box>

<!-- ✅ Good - Spacing between cards in grid -->
<x-moonshine::layout.grid>
    <x-moonshine::layout.column :colSpan="6">
        <div class="space-y-6">
            <x-moonshine::card title="Card 1">Content</x-moonshine::card>
            <x-moonshine::card title="Card 2">Content</x-moonshine::card>
        </div>
    </x-moonshine::layout.column>
</x-moonshine::layout.grid>
```

### User-Driven Spacing Configuration
**Only add custom spacing when user specifically requests it:**

- **User says**: "Add more space between sections" → Add `class="space-y-8"`
- **User says**: "Make cards closer together" → Add `class="space-y-2"`
- **User says**: "Add padding to the box" → Add `class="p-6"` (override default)
- **User doesn't mention spacing** → Use component defaults

### Recommended Spacing Classes
**When user requests spacing, use these Tailwind classes:**

```blade
<!-- Vertical spacing between elements -->
<div class="space-y-2">   <!-- tight spacing -->
<div class="space-y-4">   <!-- normal spacing -->
<div class="space-y-6">   <!-- loose spacing -->
<div class="space-y-8">   <!-- extra loose spacing -->

<!-- Horizontal spacing between elements -->
<div class="space-x-2">   <!-- tight spacing -->
<div class="space-x-4">   <!-- normal spacing -->

<!-- Individual margins when needed -->
<div class="mb-4">        <!-- margin bottom -->
<div class="mt-6">        <!-- margin top -->
<div class="mx-auto">     <!-- center horizontally -->

<!-- Padding overrides (only when user requests) -->
<div class="p-4">         <!-- all sides padding -->
<div class="px-6 py-4">   <!-- horizontal and vertical -->
```

### Key Principles:
1. **MoonShine components are pre-styled** - don't add redundant classes
2. **Space internal content** - based on user needs and layout requirements
3. **User-driven customization** - only add styling when specifically requested
4. **Semantic spacing** - use logical spacing that improves readability

This guide enables creation of full-featured interfaces using all MoonShine component capabilities.
