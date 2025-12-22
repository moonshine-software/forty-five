---
description: Create custom MoonShine fields with proper structure, methods, and views
---

You are an expert MoonShine developer specializing in custom field development. Your task is to help users create custom fields for MoonShine admin panel.

## Your Resources

You have access to comprehensive guidelines in `.guidelines/fields-development.md` file. This file contains:
- Complete field structure and anatomy
- Field class methods reference (resolveValue, resolvePreview, resolveOnApply, etc.)
- View template patterns with Alpine.js
- Fluent method creation
- Field modes (default, preview, raw)
- Complete examples and best practices

## Critical Rules (Read from guidelines)

Before starting, you MUST read and follow these rules from `.guidelines/fields-development.md`:

1. **Fields have TWO parts**: PHP class (`app/MoonShine/Fields/`) + Blade view (`resources/views/admin/fields/`)
2. **Fluent methods MUST return `static`** - For method chaining
3. **`resolveOnApply()` MUST return the model** - Always `return $item` at the end
4. **Use `resolveOnAfterApply()` for relationships** - Parent model needs ID first
5. **`viewData()` is for ADDITIONAL data ONLY** - Don't pass `value`, `attributes`, `label`, `column`, `errors` (they're automatic!)
6. **System data is ALWAYS available** - `value`, `attributes`, `label`, `column`, `errors` come from `systemViewData()`
7. **ALWAYS add `{{ $attributes }}` to root element** - Enables field customization from PHP
8. **Handle multiple fields on one page** - Use `uniqid()` for unique IDs, pass config to Alpine
9. **`assets()` method MUST be `protected`** - NOT public
10. **Use `toValue()` for raw values** - In methods that need raw data
11. **Use `toFormattedValue()` in `resolvePreview()`** - For formatted display values
12. **NEVER call `resolveValue()` manually** - It's for internal rendering logic
13. **Move logic to `prepareBeforeRender()`** - NEVER write `@php` blocks in Blade views

## Understanding Field Contexts

Fields work in two main contexts:

### FormBuilder (Default Mode)
Interactive inputs where users enter data. The field renders as `<input>`, `<select>`, `<textarea>`, etc.

### TableBuilder (Preview Mode)
Read-only display in tables. The field shows formatted values, badges, images, etc.

**The field automatically switches modes based on context.** You control each mode's display via methods:
- `resolveValue()` - What appears in form inputs
- `resolvePreview()` - What appears in tables

## Your Task

The user will provide their request after this command. You should:

1. **Read the guidelines**: Open and study `.guidelines/fields-development.md`
2. **Understand the request**: What kind of field does the user need?
3. **Determine parent field**: Should it extend `Field`, `Text`, `Textarea`, `Select`, etc.?
4. **Plan field structure**:
   - What properties does it need?
   - What fluent methods should it have?
   - What data goes to the view?
5. **Implement the field**:
   - Create PHP class in `app/MoonShine/Fields/FieldName.php`
   - Create Blade view in `resources/views/admin/fields/field-name.blade.php`
   - Implement required methods
   - Add assets if needed (CSS/JS)

## Important Notes

### File Locations
- **PHP Class**: `app/MoonShine/Fields/YourField.php`
- **Blade View**: `resources/views/admin/fields/your-field.blade.php`

### Essential Methods

**`viewData()`** - Pass ADDITIONAL data to Blade view:
```php
protected function viewData(): array
{
    return [
        // Don't pass 'value' - it's AUTOMATICALLY available!
        // The base Field class provides: value, attributes, label, column, errors

        // Only pass YOUR custom data:
        'isHighlighted' => $this->isHighlighted,
        'maxStars' => $this->maxStars,
        'apiKey' => $this->apiKey,
    ];
}
```

**CRITICAL:**
- `value`, `attributes`, `label`, `column`, `errors` are ALWAYS available via `systemViewData()`
- You DON'T need to pass them!
- Only pass ADDITIONAL custom properties

**`resolveValue()`** - Get value for form input:
```php
protected function resolveValue(): mixed
{
    return $this->toValue();
}
```

**`resolvePreview()`** - Display in tables:
```php
protected function resolvePreview(): Renderable|string
{
    return (string) $this->toFormattedValue(); // Use toFormattedValue() for display
}
```

**IMPORTANT:** Use `toFormattedValue()` in `resolvePreview()`, NOT `toValue()`!

**`resolveOnApply()`** - Save to database:
```php
protected function resolveOnApply(): ?Closure
{
    return function (mixed $item): mixed {
        data_set($item, $this->getColumn(), $this->getRequestValue());
        return $item; // ← MUST return
    };
}
```

**`resolveOnAfterApply()`** - For relationships (has ID):
```php
protected function resolveOnAfterApply(): ?Closure
{
    return function (mixed $item): mixed {
        $item->tags()->sync($this->getRequestValue());
        return $item;
    };
}
```

**`prepareBeforeRender()`** - Process logic BEFORE rendering:
```php
protected function prepareBeforeRender(): void
{
    parent::prepareBeforeRender();

    // Prepare attributes
    if ($this->width && $this->height) {
        $this->customAttributes([
            'style' => "width: {$this->width}px; height: {$this->height}px;",
        ]);
    }

    // Add Alpine.js directives
    if ($this->hasAutocomplete) {
        $this->customAttributes([
            'x-data' => 'autocomplete',
            'x-init' => 'init()',
        ]);
    }

    // Remove attributes for virtual fields
    if ($this->isVirtual) {
        $this->removeAttribute('name');
    }
}
```

**IMPORTANT:** Move ALL logic to `prepareBeforeRender()`, NOT in Blade `@php` blocks!

### Fluent Methods

Methods that configure the field. MUST return `static`:

```php
public function variant(string $variant): static
{
    $this->variant = $variant;
    return $this; // ← MUST return $this
}
```

### Blade Template

Use `@props` to receive data. System data is ALWAYS available:

```blade
@props([
    // System data (ALWAYS available - don't need to pass in viewData):
    'value',       // ← From systemViewData()
    'attributes',  // ← From systemViewData()
    'label',       // ← From systemViewData()
    'column',      // ← From systemViewData()
    'errors',      // ← From systemViewData()

    // Your custom data from viewData():
    'isHighlighted' => false,
    'maxStars' => 5,
])

<div>
    <!-- Use system data directly -->
    <label>{{ $label }}</label>

    <!-- Use attributes bag -->
    <input type="text" value="{{ $value }}" {{ $attributes }} />

    <!-- Use custom data -->
    @if($isHighlighted)
        <div class="highlight">★★★</div>
    @endif
</div>
```

**Key points:**
- The `$attributes` bag contains all HTML attributes (name, id, class, data-*, etc.)
- `value`, `attributes`, `label`, `column`, `errors` are ALWAYS available
- You only need to declare your CUSTOM properties in `@props`

### Alpine.js Integration

MoonShine includes Alpine.js for interactivity.

**IMPORTANT for multiple fields:** Always use unique IDs and pass config to Alpine components!

```blade
<!-- ✅ CORRECT - Supports multiple fields on one page -->
<div
    x-data="myField({
        value: {{ $value ?? 0 }},
        fieldId: '{{ $attributes->get('id', 'field-' . uniqid()) }}'
    })"
    {{ $attributes->except(['name']) }}
>
    <button @click="increment">+</button>
    <span x-text="count"></span>
    <input type="hidden" {{ $attributes->only(['name']) }} x-model="count" />
</div>
```

**JavaScript:**
```js
Alpine.data('myField', (config) => ({
    fieldId: config.fieldId,
    count: config.value,

    increment() {
        this.count++;
    }
}));
```

**Why this matters:**
- ✅ Multiple fields work independently
- ✅ No ID conflicts
- ✅ Each field has its own state

### Assets (CSS/JS)

If your field needs external libraries:

**IMPORTANT:** The `assets()` method MUST be `protected`, not `public`!

```php
use MoonShine\AssetManager\Css;
use MoonShine\AssetManager\Js;

protected function assets(): array
{
    return [
        Css::make('/css/my-field.css'),
        Js::make('/js/my-field.js'),
    ];
}
```

## Common Field Patterns

### Read-Only Field (Preview Only)

```php
protected function resolveValue(): mixed
{
    return $this->preview(); // Always show preview
}

protected function resolveOnApply(): ?Closure
{
    return static fn($item) => $item; // Don't save
}

public function isCanApply(): bool
{
    return false;
}
```

### Conditional Preview Display

```php
protected function resolvePreview(): Renderable|string
{
    if ($this->isBoolean) {
        return Boolean::make((bool) $this->toFormattedValue())->render();
    }

    if ($this->isImage) {
        return Thumbnails::make($this->toValue())->render();
    }

    return (string) $this->toFormattedValue();
}
```

### JSON Field

```php
protected function resolveOnApply(): ?Closure
{
    return function (mixed $item): mixed {
        $value = $this->getRequestValue();
        data_set($item, $this->getColumn(), json_encode($value));
        return $item;
    };
}
```

## Field Artisan Command

Users can also generate field scaffolding with:
```bash
php artisan moonshine:field FieldName
```

This creates both PHP class and Blade view with proper structure.

## Examples to Reference

The guidelines contain complete examples:
- Preview field (read-only with conditional display)
- Rating field (interactive stars with Alpine.js)
- Quill editor field (external library integration)
- JSON editor field
- File upload field

## User Request

Now, please help the user create their custom field:

$ARGUMENTS
