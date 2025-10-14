# MoonShine Fields AI Guide

This guide covers critical aspects of working with Fields that are commonly misunderstood or missed by developers and AI assistants.

## Table of Contents
- [Field Modes: Default, Preview, Raw](#field-modes)
- [Field Lifecycle](#field-lifecycle)
- [The make() Method](#make-method)
- [Critical: changeFill vs afterFill](#changefill-vs-afterfill)
- [Critical: changePreview](#changepreview)
- [onApply for Forms vs Filters](#onapply-usage)
- [Field Attributes](#field-attributes)
- [Sortable Fields](#sortable-fields)
- [Nullable and Default Values](#nullable-and-defaults)
- [updateOnPreview and withUpdateRow](#update-on-preview)
- [onChange Methods](#onchange-methods)
- [Dynamic Display: showWhen](#show-when)
- [Common Field Mistakes](#common-mistakes)

## Field Modes

**Critical Understanding:** Fields have THREE rendering modes. This is the most important concept.

### Default Mode
The form input element (`<input>`, `<select>`, `<textarea>`, etc.)

```php
Text::make('Title') // In FormBuilder, renders as <input>
```

### Preview Mode
Read-only display of the value (used in tables, detail pages)

```php
Text::make('Title') // In TableBuilder, renders formatted value
Image::make('Photo') // In TableBuilder, renders thumbnail/carousel
```

### Raw Mode
Original unformatted value (used for export)

```php
Date::make('Created') // In export, renders raw timestamp
```

### Force Specific Mode

```php
Text::make('Title')->defaultMode() // Always render as input
Text::make('Title')->previewMode() // Always render as preview
Text::make('Title')->rawMode() // Always render raw value
```

## Field Lifecycle

### In FormBuilder
1. Field declared in resource
2. Field enters FormBuilder
3. **FormBuilder fills field** (automatic)
4. FormBuilder renders field
5. On submit, FormBuilder calls field's `apply()` method

### In TableBuilder
1. Field declared in resource
2. Field enters TableBuilder
3. **TableBuilder sets field to preview mode** (automatic)
4. TableBuilder iterates data and fills each field
5. TableBuilder renders fields

### In Export
1. Field declared in export method
2. Field enters Handler
3. **Handler sets field to raw mode**
4. Handler fills fields and generates export

**Key Point:** You don't manually switch modes - the context (FormBuilder/TableBuilder/Handler) does it automatically.

## The make() Method

```php
Field::make(
    Closure|string|null $label = null,
    ?string $column = null,
    ?Closure $formatted = null
)
```

**Critical Parameters:**

### $label
The display label. Can contain HTML (not escaped).

```php
Text::make('Title') // Label: "Title"
Text::make('User Email') // Label: "User Email", auto-generated column: "user_email"
Text::make(__('form.title')) // Translated label
```

### $column
Database column name or relationship name.

```php
Text::make('Title', 'title') // column explicitly set
Text::make('Title') // column auto-generated from label (English only)
BelongsTo::make('Author', 'author') // relationship name
```

**⚠️ If label is not English, ALWAYS specify $column explicitly!**

### $formatted
Closure for formatting value in preview mode.

```php
Text::make('Name', 'first_name', fn($item) => $item->first_name . ' ' . $item->last_name)
```

**Note:** Not all fields support `$formatted`:
- ❌ Not supported: `Json`, `File`, `Range`, `RangeSlider`, `DateRange`, `Select`, `Enum`, `HasOne`, `HasMany`
- ✅ Supported: `Text`, `Number`, `Date`, `Textarea`, most other fields

## Critical: changeFill vs afterFill

**This is frequently misunderstood!**

### changeFill()
**Completely replaces** the filling logic. You receive the raw data object and must return the value for the field.

```php
Select::make('Images', 'images')
    ->multiple()
    ->changeFill(function(Article $article, Select $ctx) {
        // Receive full model, return array for field
        return $article->images
            ->map(fn($value) => "https://cdn.com" . $value)
            ->toArray();
    });
```

**When to use:** When you need to transform data from the model before filling the field.

### afterFill()
**Modifies field after it's already filled**. You receive the field with its value already set.

```php
Select::make('Links', 'links')
    ->multiple()
    ->afterFill(function(Select $ctx) {
        // Field already has value from model
        if (collect($ctx->toValue())->every(fn($v) => str_contains($v, 'http'))) {
            return $ctx->customWrapperAttributes(['class' => 'external-links']);
        }
        return $ctx;
    });
```

**When to use:** When you need to modify field behavior based on its already-filled value.

## Critical: changePreview

Changes how field displays in preview mode (tables, detail pages, NOT in forms).

```php
use MoonShine\UI\Components\Carousel;

Select::make('Images', 'images')
    ->options([
        '/img/1.jpg' => 'Image 1',
        '/img/2.jpg' => 'Image 2',
    ])
    ->multiple()
    ->changePreview(fn(?array $values, Select $ctx) => Carousel::make($values));
```

**Result:** In table, instead of showing selected option labels, shows image carousel.

**Common use cases:**
- Display images instead of file paths
- Format complex data structures
- Show custom components based on field value

## onApply Usage

**Critical:** `onApply()` works DIFFERENTLY for forms vs filters!

### onApply in Forms (with Model)

```php
use Illuminate\Database\Eloquent\Model;

Text::make('Thumbnail', 'thumbnail')
    ->onApply(function(Model $item, $value, Field $field) {
        if ($value) {
            $item->thumbnail = Storage::put('thumbnails', file_get_contents($value));
        }
        return $item; // ← Must return model
    });
```

**Parameters:** `($model, $value, $field)`
**Must return:** Modified model

### onApply in Filters (with Query)

```php
use Illuminate\Contracts\Database\Eloquent\Builder;

Text::make('Title', 'title')
    ->onApply(function(Builder $query, $value, Field $field) {
        $query->where('title', 'LIKE', "%{$value}%");
        // No return needed - query is modified by reference
    });
```

**Parameters:** `($query, $value, $field)`
**Return:** Nothing (query modified by reference)

### Related Methods

```php
// Execute before apply
Text::make('Title')->onBeforeApply(fn($item, $value, $field) => $field);

// Execute after apply
Text::make('Title')->onAfterApply(fn($item, $value, $field) => $field);

// Conditionally apply
Text::make('Title')->canApply(fn() => auth()->user()->isAdmin());

// Re-render field after apply (useful for File fields)
Image::make('Avatar')->refreshAfterApply();
```

## Field Attributes

### Basic Attributes

```php
Text::make('Title')
    ->required() // HTML5 required
    ->disabled() // Cannot edit
    ->readonly() // Can see but not edit
    ->nullable(); // Allow NULL in database
```

### Custom Attributes

```php
Password::make('Password')
    ->customAttributes([
        'autocomplete' => 'new-password',
        'minlength' => 8,
    ]);
```

### Wrapper Attributes

For the field's wrapper element (for styling/layout):

```php
Text::make('Title')
    ->customWrapperAttributes([
        'class' => 'col-span-2',
        'data-test' => 'title-field',
    ]);
```

### Name Attribute Modification

```php
// Direct name change
Text::make('Name')->setNameAttribute('custom_name');

// Wrap name (for filters)
Text::make('Name')->wrapName('options'); // Results in name="options[name]"

// Virtual name (for conditional fields with same name)
File::make('image')->virtualColumn('image_1');
File::make('image')->virtualColumn('image_2');
```

## Sortable Fields

Fields in `indexFields()` are NOT sortable by default.

```php
// ❌ Not sortable
Text::make('Title')

// ✅ Sortable
Text::make('Title')->sortable()

// ✅ Sortable by different column
BelongsTo::make('Author')->sortable('author_id')

// ✅ Custom sort logic
Text::make('Title')->sortable(function(Builder $query, string $column, string $direction) {
    $query->orderBy($column, $direction);
})
```

## Nullable and Default Values

### nullable()

Allows field to store NULL in database.

```php
Text::make('Optional Field')->nullable()
BelongsTo::make('Category')->nullable() // Allows "no selection"
```

**⚠️ Don't forget:** Database column must also allow NULL!

### default()

Sets default value for field.

```php
Text::make('Status')->default('pending')
Checkbox::make('Active')->default(true)
BelongsTo::make('Category')->default(Category::find(1)) // Must pass model instance
```

## updateOnPreview and withUpdateRow

These methods enable inline editing in tables.

### updateOnPreview()

Edit field directly in table, saves on change.

```php
Text::make('Title')->updateOnPreview()
Switcher::make('Active')->updateOnPreview()
```

**Supported fields:** `Text`, `Number`, `Checkbox`, `Select`, `Date`

**With custom endpoint:**

```php
Text::make('Title')->updateOnPreview(
    url: fn() => '/custom-endpoint',
    events: [AlpineJs::event(JsEvent::TOAST, 'Updated!')]
)
```

### withUpdateRow()

Like `updateOnPreview()` but refreshes entire table row.

```php
Switcher::make('Active')
    ->withUpdateRow('index-table-post-resource');
```

**Use case:** When changing one field affects other fields in the row.

**Get component name from resource:**

```php
Switcher::make('Active')
    ->withUpdateRow($this->getListComponentName());
```

## onChange Methods

Execute logic when field value changes.

### onChangeUrl()

Make HTTP request on change.

```php
Select::make('Category')
    ->onChangeUrl(
        url: fn() => route('get-subcategories'),
        method: HttpMethod::POST,
        selector: '#subcategory-container', // Update this element with response
        events: [AlpineJs::event(JsEvent::TOAST, 'Categories loaded')]
    );
```

### onChangeMethod()

Call resource/page method on change (no need for separate controller).

```php
Select::make('Country')
    ->onChangeMethod(
        method: 'updateCities',
        params: ['country_id' => ':value'], // :value = current field value
        selector: '#cities-container'
    );
```

```php
// In resource or page
public function updateCities(MoonShineRequest $request): string
{
    $countryId = $request->get('country_id');
    $cities = City::where('country_id', $countryId)->get();

    return view('cities-select', compact('cities'))->render();
}
```

## showWhen

Conditionally show/hide fields based on other field values.

### Basic Usage

```php
Checkbox::make('Has discount', 'has_discount'),

Number::make('Discount percentage', 'discount')
    ->showWhen('has_discount', true); // Show when checkbox is checked
```

### Operators

```php
Number::make('Age')
    ->showWhen('country', '=', 'USA')
    ->showWhen('status', '!=', 'archived')
    ->showWhen('price', '>', 100)
    ->showWhen('stock', '<', 10);
```

Supported operators: `=`, `!=`, `>`, `<`, `>=`, `<=`, `in`, `not in`

### Multiple Conditions

```php
Text::make('Special Field')
    ->showWhen('type', '=', 'special')
    ->showWhen('status', '=', 'active'); // AND logic (both must be true)
```

### Nested Fields

Works with relationship fields:

```php
BelongsTo::make('Category'),

Text::make('Subcategory specific field')
    ->showWhen('category_id', '=', 5);
```

## Common Field Mistakes

### ❌ Mistake 1: Not Understanding Modes

```php
// Trying to use changePreview on form
Text::make('Title')
    ->changePreview(fn($value) => strtoupper($value));
// Result: No effect in form because form uses default mode, not preview
```

**✅ Fix:** `changePreview()` only affects TableBuilder and detail pages.

### ❌ Mistake 2: Using changeFill When afterFill Is Needed

```php
Text::make('Title')
    ->changeFill(function($model, $ctx) {
        // You want to add class based on value, but changeFill replaces ENTIRE fill logic
        return $model->title;
    });
```

**✅ Fix:** Use `afterFill()` for modifications after filling:

```php
Text::make('Title')
    ->afterFill(function($ctx) {
        if (strlen($ctx->toValue()) > 100) {
            return $ctx->customWrapperAttributes(['class' => 'long-title']);
        }
        return $ctx;
    });
```

### ❌ Mistake 3: Wrong onApply Parameters

```php
// In filter
Text::make('Title')
    ->onApply(function(Model $item, $value, $field) { // ← Wrong! Filters use Builder
        $item->where('title', $value);
        return $item;
    });
```

**✅ Fix:**

```php
Text::make('Title')
    ->onApply(function(Builder $query, $value, $field) {
        $query->where('title', 'LIKE', "%{$value}%");
    });
```

### ❌ Mistake 4: Forgetting sortable()

```php
// In indexFields
Text::make('Title') // Not sortable in table
```

**✅ Fix:**

```php
Text::make('Title')->sortable()
```

### ❌ Mistake 5: Nullable Without Database Support

```php
BelongsTo::make('Category')->nullable()
// But database column 'category_id' is NOT NULL
// Result: Database error on save
```

**✅ Fix:** Ensure database column allows NULL:

```php
// Migration
$table->foreignId('category_id')->nullable()->constrained();
```

### ❌ Mistake 6: Wrong Default Value Type

```php
BelongsTo::make('Category')->default(1) // ← Wrong! Expects model instance
```

**✅ Fix:**

```php
BelongsTo::make('Category')->default(Category::find(1))
```

### ❌ Mistake 7: Using $formatted Where Not Supported

```php
Json::make('Data', 'data', fn($item) => json_encode($item->data))
// ← Has no effect, Json field doesn't support $formatted
```

**✅ Fix:** Use `changePreview()` instead:

```php
Json::make('Data', 'data')
    ->changePreview(fn($value) => json_encode($value, JSON_PRETTY_PRINT));
```

### ❌ Mistake 8: Not Returning Field in afterFill

```php
Text::make('Title')
    ->afterFill(function($ctx) {
        $ctx->customWrapperAttributes(['class' => 'custom']);
        // ← Forgot to return $ctx
    });
```

**✅ Fix:**

```php
Text::make('Title')
    ->afterFill(function($ctx) {
        return $ctx->customWrapperAttributes(['class' => 'custom']);
    });
```

### ❌ Mistake 9: Using showWhen with Non-Existent Field

```php
Text::make('Special Field')
    ->showWhen('category', '=', 5);
// But 'category' field doesn't exist in formFields()
// Result: Field never shows
```

**✅ Fix:** Ensure the field you're checking exists:

```php
Select::make('Category', 'category'), // ← Must exist
Text::make('Special Field')
    ->showWhen('category', '=', 5);
```

### ❌ Mistake 10: Not Specifying Column for Non-English Labels

```php
Text::make('Название') // Auto-generated column won't work for non-English
```

**✅ Fix:**

```php
Text::make('Название', 'title') // Always specify column explicitly
```

## Quick Reference

**Field modes:**
- Default (form input) - automatic in FormBuilder
- Preview (display) - automatic in TableBuilder
- Raw (export) - automatic in export

**Three lifecycle methods:**
- `changeFill()` - replace fill logic (receive model)
- `afterFill()` - modify after fill (receive field)
- `changePreview()` - change preview display

**Two onApply contexts:**
- Forms: `($model, $value, $field)` → return model
- Filters: `($query, $value, $field)` → modify query

**Make fields sortable:**
```php
->sortable() // or ->sortable('column') or ->sortable(Closure)
```

**Allow NULL:**
```php
->nullable() // Don't forget database column must allow NULL too!
```

**Inline editing:**
```php
->updateOnPreview() // Save on change
->withUpdateRow($componentName) // Refresh row on change
```

**Conditional display:**
```php
->showWhen('field', 'operator', 'value')
```

**Not supported $formatted:**
`Json`, `File`, `Range`, `RangeSlider`, `DateRange`, `Select`, `Enum`, `HasOne`, `HasMany`
