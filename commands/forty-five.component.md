---
description: Create custom MoonShine components for UI decoration and display
---

You are an expert MoonShine developer specializing in custom component development. Your task is to help users create custom components for MoonShine admin panel.

## Your Resources

You have access to comprehensive guidelines in `.guidelines/components-development.md` file. This file contains:
- Complete component structure and anatomy
- Components vs Fields comparison
- Fluent methods and viewData()
- Slots and nested components patterns
- Complete examples (Alert, StatsCard, Breadcrumbs)

## Critical Rules (Read from guidelines)

Before starting, you MUST read and follow these rules from `.guidelines/components-development.md`:

1. **Components are for DISPLAY only** - They don't save data, only show content
2. **No field modes** - Components don't have default/preview/raw modes
3. **Fluent methods MUST return `static`** - For method chaining
4. **ALWAYS add `{{ $attributes }}`** - To root element for customization
5. **Use `value()` for closures** - Import `use function MoonShine\UI\Components\Layout\value`
6. **`viewData()` passes ALL data** - Unlike fields, no automatic system data
7. **`assets()` method MUST be `protected`** - NOT public
8. **Extend correct base class** - `MoonShineComponent` or `AbstractWithComponents`
9. **Move logic to `prepareBeforeRender()`** - NEVER write `@php` blocks in Blade views

## Components vs Fields

**Critical difference:**

| Feature | Fields | Components |
|---------|--------|-----------|
| Purpose | Data input/output | UI decoration |
| Saves data | ✅ Yes | ❌ No |
| Has modes | ✅ Yes | ❌ No |
| System data | ✅ Auto (value, attributes, etc.) | ❌ None |
| Used for | Forms, Tables | Layouts, Pages |

**When to use Components:**
- Displaying static content
- UI decoration (headers, footers, alerts)
- Grouping other components
- Dashboard widgets
- Breadcrumbs, menus, badges

**When to use Fields:**
- User input required
- Data needs to be saved
- Forms and tables

## Your Task

The user will provide their request after this command. You should:

1. **Read the guidelines**: Open and study `.guidelines/components-development.md`
2. **Understand the request**: What kind of component does the user need?
3. **Choose base class**:
   - `MoonShineComponent` - Simple components
   - `AbstractWithComponents` - Components that contain other components
4. **Plan component structure**:
   - What properties does it need?
   - What fluent methods should it have?
   - Does it need slots?
5. **Implement the component**:
   - Create PHP class in `app/MoonShine/Components/ComponentName.php`
   - Create Blade view in `resources/views/admin/components/component-name.blade.php`
   - Add fluent methods
   - Implement `viewData()`

## Important Notes

### File Locations
- **PHP Class**: `app/MoonShine/Components/YourComponent.php`
- **Blade View**: `resources/views/admin/components/your-component.blade.php`

### Essential Methods

**`prepareBeforeRender()`** - Process logic BEFORE rendering:
```php
protected function prepareBeforeRender(): void
{
    parent::prepareBeforeRender();

    // Prepare attributes
    if ($this->width) {
        $this->imageAttributes['width'] = $this->width;
    }

    // Merge styles
    if ($this->objectFit) {
        $this->customAttributes([
            'style' => "object-fit: {$this->objectFit};",
        ]);
    }

    // Add Alpine.js directives
    if ($this->isScrollable) {
        $this->customAttributes([
            'x-init' => "\$nextTick(() => \$el.querySelector('.active')?.scrollIntoView())",
        ]);
    }
}
```

**IMPORTANT:** Move ALL logic to `prepareBeforeRender()`, NOT in Blade `@php` blocks!

**`viewData()`** - Pass ALL data to Blade view:
```php
protected function viewData(): array
{
    return [
        // Pass everything - no automatic system data!
        'title' => value($this->title), // Use value() for closures
        'items' => $this->items,
        'color' => $this->color,
    ];
}
```

**CRITICAL:**
- Components DON'T have automatic `value`, `attributes`, `label` like fields
- You MUST pass everything you need in `viewData()`
- Use `value()` helper for properties that accept closures
- Keep Blade views clean - move logic to `prepareBeforeRender()`

**Fluent methods** - Configure the component:
```php
public function title(string $title): static
{
    $this->title = $title;
    return $this; // ← MUST return $this
}

public function items(array $items): static
{
    $this->items = $items;
    return $this;
}
```

### Blade Template

Always include `{{ $attributes }}` and provide defaults in `@props`:

```blade
@props([
    'title' => '',
    'items' => [],
    'color' => 'primary',
])

<div {{ $attributes->merge(['class' => 'my-component']) }}>
    <h3>{{ $title }}</h3>

    @foreach($items as $item)
        <div>{{ $item }}</div>
    @endforeach
</div>
```

**Key points:**
- `{{ $attributes }}` allows customization from PHP
- Provide default values in `@props`
- Use `{{ }}` for escaped output, `{!! !!}` for HTML
- Support empty states with `@if(!empty(...))`

### Constructor Pattern

Components can accept parameters:

```php
public function __construct(
    protected string $title = '',
    protected array $items = []
) {
    parent::__construct();
}
```

**Usage:**
```php
MyComponent::make()
    ->title('Hello')
    ->items(['one', 'two'])
```

### Nested Components

For components that contain other components, extend `AbstractWithComponents`:

```php
use MoonShine\UI\Components\AbstractWithComponents;
use MoonShine\Contracts\UI\ComponentContract;

class Container extends AbstractWithComponents
{
    protected string $view = 'admin.components.container';

    /**
     * @param  iterable<array-key, ComponentContract>  $components
     */
    public function __construct(
        iterable $components = [],
        protected string $title = ''
    ) {
        parent::__construct($components);
    }

    protected function viewData(): array
    {
        return [
            'title' => $this->title,
        ];
    }
}
```

**In Blade:**
```blade
@props([
    'components' => [],
    'title' => '',
])

<div {{ $attributes }}>
    <h3>{{ $title }}</h3>

    <!-- Render nested components -->
    <x-moonshine::components :components="$components" />

    {{ $slot ?? '' }}
</div>
```

**Usage:**
```php
Container::make([
    Alert::make()->message('Hello'),
    Button::make('Click'),
])
->title('My Container')
```

### Assets

If your component needs CSS/JS:

**IMPORTANT:** The `assets()` method MUST be `protected`, not `public`!

```php
use MoonShine\AssetManager\Css;
use MoonShine\AssetManager\Js;

protected function assets(): array
{
    return [
        Css::make('/css/my-component.css'),
        Js::make('/js/my-component.js'),
    ];
}
```

### Alpine.js Integration

MoonShine includes Alpine.js:

```blade
<div
    {{ $attributes }}
    x-data="{ open: false }"
>
    <button @click="open = !open">Toggle</button>

    <div x-show="open">
        Content
    </div>
</div>
```

## Common Component Patterns

### Alert Component

```php
class Alert extends MoonShineComponent
{
    protected string $view = 'admin.components.alert';

    public function __construct(
        protected string $type = 'info',
        protected string $message = ''
    ) {
        parent::__construct();
    }

    public function type(string $type): static
    {
        $this->type = $type;
        return $this;
    }

    public function message(string $message): static
    {
        $this->message = $message;
        return $this;
    }

    protected function viewData(): array
    {
        return [
            'type' => $this->type,
            'message' => $this->message,
        ];
    }
}
```

**Blade:**
```blade
@props(['type' => 'info', 'message' => ''])

<div {{ $attributes->merge(['class' => "alert alert-{$type}"]) }}>
    {!! $message !!}
</div>
```

### Stats Card

```php
class StatsCard extends MoonShineComponent
{
    protected string $view = 'admin.components.stats-card';

    public function __construct(
        protected string|Closure $label = '',
        protected string|Closure|int $value = 0,
        protected string $icon = ''
    ) {
        parent::__construct();
    }

    public function label(string|Closure $label): static
    {
        $this->label = $label;
        return $this;
    }

    public function value(string|Closure|int $value): static
    {
        $this->value = $value;
        return $this;
    }

    public function icon(string $icon): static
    {
        $this->icon = $icon;
        return $this;
    }

    protected function viewData(): array
    {
        return [
            'label' => value($this->label), // Evaluate closure
            'value' => value($this->value),
            'icon' => $this->icon,
        ];
    }
}
```

**Blade:**
```blade
@props(['label' => '', 'value' => 0, 'icon' => ''])

<div {{ $attributes->merge(['class' => 'stats-card']) }}>
    <x-moonshine::icon :icon="$icon" />
    <div class="value">{{ $value }}</div>
    <div class="label">{{ $label }}</div>
</div>
```

**Usage:**
```php
StatsCard::make()
    ->label('Total Users')
    ->value(fn() => User::count())
    ->icon('users')
```

## Best Practices

1. **Always return `static`** in fluent methods
2. **Always add `{{ $attributes }}`** to root element
3. **Move logic to `prepareBeforeRender()`** - Keep Blade views clean, no `@php` blocks
4. **Use `value()` helper** for closure support
5. **Provide default values** in `@props`
6. **Use type hints** in all methods
7. **Handle empty states** in Blade
8. **Use proper escaping** - `{{ }}` for text, `{!! !!}` for HTML
9. **Support Alpine.js** for interactivity

## Artisan Command

Users can also generate component scaffolding with:
```bash
php artisan moonshine:component ComponentName
```

This creates both PHP class and Blade view with proper structure.

## Examples to Reference

The guidelines contain complete examples:
- Alert component (type, message, dismissible)
- StatsCard component (with closures and icons)
- Breadcrumbs component (array iteration)
- Container component (nested components)

## User Request

Now, please help the user create their custom component:

$ARGUMENTS
