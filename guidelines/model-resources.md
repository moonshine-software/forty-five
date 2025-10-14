# MoonShine ModelResource AI Guide

This guide covers critical aspects of working with ModelResource that developers and AI assistants commonly miss or misunderstand.

## Table of Contents
- [Resource Structure](#resource-structure)
- [Field Methods: indexFields, formFields, detailFields](#field-methods)
- [Critical: Resource Registration](#resource-registration)
- [Validation Rules](#validation-rules)
- [Active Actions](#active-actions)
- [Buttons and Their Locations](#buttons-and-locations)
- [Async Mode](#async-mode)
- [Pagination Options](#pagination-options)
- [Query Modification](#query-modification)
- [Lifecycle Methods](#lifecycle-methods)
- [Modifiers](#modifiers)
- [Common Mistakes](#common-mistakes)

## Resource Structure

### Basic Properties That Matter

```php
class PostResource extends ModelResource
{
    protected string $model = Post::class; // Required
    protected string $title = 'Posts'; // Section title
    protected string $column = 'title'; // Field for display in relationships and breadcrumbs (default: 'id')
    protected array $with = ['category']; // Eager loading
    protected ?string $alias = 'posts'; // URL alias (default: auto-generated kebab-case)

    // Sorting
    protected string $sortColumn = 'created_at';
    protected SortDirection $sortDirection = SortDirection::DESC;

    // Pagination
    protected int $itemsPerPage = 25;
    protected bool $usePagination = true;
    protected bool $simplePaginate = false;
    protected bool $cursorPaginate = false;

    // Async behavior
    protected bool $isAsync = true; // Both for forms and tables

    // Modal windows
    protected bool $createInModal = false;
    protected bool $editInModal = false;
    protected bool $detailInModal = false;

    // Table behavior
    protected bool $columnSelection = false; // Allow users to select visible columns
    protected bool $stickyTable = false; // Fixed header on scroll
    protected bool $stickyButtons = false; // Fixed action buttons column
    protected ?ClickAction $clickAction = null; // ClickAction::SELECT, ClickAction::DETAIL, ClickAction::EDIT

    // Filters
    protected bool $saveQueryState = false; // Cache filter state

    // Buttons display
    protected bool $indexButtonsInDropdown = false; // Show buttons in dropdown instead of inline

    // Redirects
    protected ?PageType $redirectAfterSave = PageType::FORM; // or PageType::INDEX, PageType::DETAIL

    // Validation
    protected bool $errorsAbove = true; // Show validation errors at top (only when isAsync = false)
    protected bool $isPrecognitive = false; // Enable precognitive validation

    // Lazy loading
    protected bool $isLazy = false; // Load table data after page render
}
```

## Field Methods: indexFields, formFields, detailFields

**Critical Understanding:** These three methods define fields for different contexts.

```php
// Fields for the listing page (table)
protected function indexFields(): iterable
{
    return [
        ID::make()->sortable(),
        Text::make('Title')->sortable(),
        Text::make('Status'),
    ];
}

// Fields for create/edit forms
protected function formFields(): iterable
{
    return [
        Box::make([
            ID::make(),
            Text::make('Title'),
            Textarea::make('Content'),
        ]),
    ];
}

// Fields for detail view page
protected function detailFields(): iterable
{
    return [
        ID::make(),
        Text::make('Title'),
        Textarea::make('Content'),
    ];
}
```

**Important:** If you want the same fields everywhere, you still need to define them in each method.

## Critical: Resource Registration

**⚠️ This is the #1 mistake - forgetting to register resources!**

After creating a resource, it MUST be registered in `MoonShineServiceProvider`:

```php
// app/Providers/MoonShineServiceProvider.php
public function boot(CoreContract $core, ConfiguratorContract $config): void
{
    $core
        ->resources([
            MoonShineUserResource::class,
            MoonShineUserRoleResource::class,
            PostResource::class, // ← YOUR RESOURCE HERE
        ])
        ->pages([
            ...$config->getPages(),
        ]);
}
```

**Without registration:**
- The resource won't appear in the menu
- Relationship fields referring to this resource will cause 500 errors
- Routes won't work

### Autoloading Alternative

Instead of manual registration, use autoloading:

```php
public function boot(CoreContract $core, ConfiguratorContract $config): void
{
    $core->autoload();
}
```

Then optimize:
- Laravel 11+: `php artisan optimize`
- Laravel 10: `php artisan moonshine:optimize`

Clear cache: `php artisan moonshine:optimize-clear`

## Validation Rules

```php
protected function rules(mixed $item): array
{
    return [
        'title' => ['required', 'string', 'min:5'],
        'email' => [
            'sometimes',
            'bail',
            'required',
            'email',
            Rule::unique('users', 'email')->ignore($item->id),
        ],
        'password' => !$item->exists
            ? 'required|min:6|required_with:password_repeat|same:password_repeat'
            : 'sometimes|nullable|min:6|required_with:password_repeat|same:password_repeat',
    ];
}

public function validationMessages(): array
{
    return [
        'email.required' => 'Email is required',
        'title.min' => 'Title must be at least 5 characters',
    ];
}

public function prepareForValidation(): void
{
    request()?->merge([
        'email' => request()?->string('email')->lower()->value()
    ]);
}
```

**Note:** The `$item` parameter gives you access to the current model instance, useful for conditional validation.

## Active Actions

Globally disable specific CRUD actions:

```php
use MoonShine\Laravel\Enums\Action;
use MoonShine\Support\ListOf;

protected function activeActions(): ListOf
{
    return parent::activeActions()
        ->except(Action::VIEW, Action::MASS_DELETE);
        // ->only(Action::VIEW, Action::UPDATE);
}
```

Available actions:
- `Action::VIEW` - detail page
- `Action::CREATE` - create page
- `Action::UPDATE` - edit page
- `Action::DELETE` - delete action
- `Action::MASS_DELETE` - mass delete action

## Buttons and Their Locations

### Top Buttons (Above Table)

```php
use MoonShine\Support\ListOf;
use MoonShine\UI\Components\ActionButton;

protected function topButtons(): ListOf
{
    return parent::topButtons()->add(
        ActionButton::make('Refresh', '#')
            ->dispatchEvent(AlpineJs::event(JsEvent::TABLE_UPDATED, $this->getListComponentName()))
    );
}
```

### Index Buttons (In Table Rows)

```php
protected function indexButtons(): ListOf
{
    return parent::indexButtons()
        ->prepend(ActionButton::make('Custom', '/endpoint'))
        ->add(ActionButton::make('Another', '/endpoint'));
}

// Remove specific button
protected function indexButtons(): ListOf
{
    return parent::indexButtons()
        ->except(fn(ActionButton $btn) => $btn->getName() === 'resource-delete-button');
}
```

Standard button names:
- `resource-detail-button`
- `resource-edit-button`
- `resource-delete-button`
- `mass-delete-button`

### Form Buttons

```php
protected function formButtons(): ListOf
{
    return parent::formButtons()
        ->add(ActionButton::make('Custom Action', '/endpoint'));
}
```

### Detail Buttons

```php
protected function detailButtons(): ListOf
{
    return parent::detailButtons()
        ->add(ActionButton::make('Custom Detail Action', '/endpoint'));
}
```

### Bulk Actions

Add `.bulk()` to make button work with selected rows:

```php
protected function indexButtons(): ListOf
{
    return parent::indexButtons()
        ->add(
            ActionButton::make('Export Selected', '/export')
                ->bulk()
        );
}
```

## Async Mode

**Default: Async is ENABLED (`$isAsync = true`)**

Async mode enables:
- Pagination without page reload
- Filtering without page reload
- Sorting without page reload
- Form submission without page reload

To disable:

```php
protected bool $isAsync = false;
```

**Note:** When async is disabled, you lose all these benefits and page will reload on every action.

## Pagination Options

### Standard Pagination

```php
protected int $itemsPerPage = 25; // Items per page
```

### Simple Pagination

No total page count, avoids COUNT query:

```php
protected bool $simplePaginate = true;
```

### Cursor Pagination

For large datasets:

```php
protected bool $cursorPaginate = true;
```

### Disable Pagination

```php
protected bool $usePagination = false;
```

## Query Modification

### Basic Query Modification

```php
protected function query(): Builder
{
    return parent::query()
        ->where('is_published', true)
        ->orderBy('views', 'desc');
}
```

### Scopes in Resource

```php
protected function modifyListComponent(ComponentContract $component): ComponentContract
{
    return parent::modifyListComponent($component)
        ->customAttributes(['data-attr' => 'value']);
}
```

## Lifecycle Methods

### onLoad() - Active Resource

Called when resource is loaded and active:

```php
protected function onLoad(): void
{
    // Add assets
    $this->getAssetManager()
        ->add(Css::make('/css/custom.css'))
        ->append(Js::make('/js/custom.js'));

    // Modify pages
    $this->getPages()
        ->findByUri(PageType::FORM->value)
        ->pushToLayer(Layer::BOTTOM, $component);
}
```

### onBoot() - Instance Creation

Called when MoonShine creates resource instance:

```php
protected function onBoot(): void
{
    // Early initialization logic
}
```

### Using Traits for Lifecycle

```php
// Resource
use WithPermissions;

// Trait
trait WithPermissions
{
    protected function loadWithPermissions(): void
    {
        // Method naming: load{TraitName}
        // Called during onLoad()
    }

    protected function bootWithPermissions(): void
    {
        // Method naming: boot{TraitName}
        // Called during onBoot()
    }
}
```

## Modifiers

### Modify List Component (Table)

```php
use MoonShine\Contracts\UI\ComponentContract;

public function modifyListComponent(ComponentContract $component): ComponentContract
{
    return parent::modifyListComponent($component)
        ->customAttributes(['data-my-attr' => 'value'])
        ->sticky(); // or other TableBuilder methods
}
```

### Modify Form Component

```php
use MoonShine\Contracts\UI\ComponentContract;
use MoonShine\UI\Components\FlexibleRender;

public function modifyFormComponent(ComponentContract $component): ComponentContract
{
    return parent::modifyFormComponent($component)
        ->fields([
            FlexibleRender::make('Top Content'),
            ...parent::modifyFormComponent($component)->getFields()->toArray(),
            FlexibleRender::make('Bottom Content'),
        ])
        ->submit('Save Changes');
}
```

### Modify Detail Component

```php
public function modifyDetailComponent(ComponentContract $component): ComponentContract
{
    return parent::modifyDetailComponent($component)
        ->customAttributes(['class' => 'custom-detail-class']);
}
```

## Common Mistakes

### ❌ Mistake 1: Not Registering Resource

```php
// Created resource but forgot to add to MoonShineServiceProvider
// Result: 500 error when using in relationships
```

**✅ Fix:** Always register in `$core->resources([YourResource::class])`

### ❌ Mistake 2: Wrong $column Property

```php
protected string $column = 'id'; // Default, shows "1", "2", "3" in relationships
```

**✅ Fix:** Set meaningful column:

```php
protected string $column = 'title'; // or 'name', 'email', etc.
```

### ❌ Mistake 3: Not Adding ID to Import Fields

```php
protected function importFields(): iterable
{
    return [
        Text::make('Title'), // Without ID, only creates, never updates
    ];
}
```

**✅ Fix:**

```php
protected function importFields(): iterable
{
    return [
        ID::make(), // ← Required for updates
        Text::make('Title'),
    ];
}
```

### ❌ Mistake 4: Forgetting Eager Loading

```php
// No $with property, causes N+1 queries
protected function indexFields(): iterable
{
    return [
        BelongsTo::make('Category'), // N+1 problem
    ];
}
```

**✅ Fix:**

```php
protected array $with = ['category'];
```

### ❌ Mistake 5: Wrong Redirect Configuration

```php
// Trying to redirect in a method that doesn't exist
public function redirectAfterSave(): string
{
    return '/custom'; // Wrong method name
}
```

**✅ Fix:**

```php
protected ?PageType $redirectAfterSave = PageType::INDEX; // Use property

// OR

public function getRedirectAfterSave(): string // Correct method name
{
    return $this->getIndexPageUrl();
}
```

### ❌ Mistake 6: Mixing Up Button Methods

```php
protected function topButtons(): ListOf
{
    return parent::indexButtons(); // ← Wrong, mixed up methods
}
```

**✅ Fix:** Use correct parent method:

```php
protected function topButtons(): ListOf
{
    return parent::topButtons()->add(...);
}

protected function indexButtons(): ListOf
{
    return parent::indexButtons()->add(...);
}
```

### ❌ Mistake 7: Not Using sortable() for Sortable Columns

```php
protected function indexFields(): iterable
{
    return [
        Text::make('Title'), // Not sortable in table
    ];
}
```

**✅ Fix:**

```php
protected function indexFields(): iterable
{
    return [
        Text::make('Title')->sortable(), // Now sortable
    ];
}
```

## Quick Reference

**Resource creation:**
```bash
php artisan moonshine:resource ModelName
```

**Register resource:**
Add to `MoonShineServiceProvider::boot()` → `$core->resources([...])`

**Three field methods:**
- `indexFields()` - listing table
- `formFields()` - create/edit form
- `detailFields()` - detail view

**Common properties to set:**
- `$column` - display field (not 'id')
- `$with` - eager loading
- `$sortColumn` + `$sortDirection` - default sorting
- `$itemsPerPage` - pagination

**Don't forget:**
- Add `->sortable()` to fields you want sortable
- Add `ID::make()` to import fields
- Register resource after creation
