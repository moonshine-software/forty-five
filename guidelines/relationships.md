# MoonShine Relationship Fields AI Guide

This guide covers critical aspects of working with relationship fields (BelongsTo, BelongsToMany, HasMany, HasOne, etc.) that are commonly misunderstood.

## Table of Contents
- [Critical: Resource Registration](#resource-registration)
- [BelongsTo Field](#belongsto-field)
- [BelongsToMany Field](#belongstomany-field)
- [HasMany Field](#hasmany-field)
- [HasOne Field](#hasone-field)
- [Async Search](#async-search)
- [Associated Fields](#associated-fields)
- [Creatable Mode](#creatable-mode)
- [Common Relationship Mistakes](#common-mistakes)

## Critical: Resource Registration

**⚠️ THE MOST IMPORTANT RULE FOR RELATIONSHIP FIELDS**

**ALL relationship fields REQUIRE the related ModelResource to be registered in `MoonShineServiceProvider`.**

```php
// app/Providers/MoonShineServiceProvider.php
public function boot(CoreContract $core, ConfiguratorContract $config): void
{
    $core->resources([
        PostResource::class,
        CategoryResource::class, // ← MUST be registered if used in relationships
        UserResource::class,     // ← MUST be registered if used in relationships
    ]);
}
```

**If not registered:**
- 500 error when using the relationship field
- Error message is not always clear

**This applies to:**
- `BelongsTo`
- `BelongsToMany`
- `HasMany`
- `HasOne`
- `HasOneThrough`
- `HasManyThrough`
- `MorphOne`
- `MorphMany`
- `MorphTo`
- `MorphToMany`

## BelongsTo Field

### Basic Usage

```php
use App\MoonShine\Resources\CategoryResource;
use MoonShine\Laravel\Fields\Relationships\BelongsTo;

BelongsTo::make(
    'Category',              // Label
    'category',             // Relationship name
    resource: CategoryResource::class
)
```

### Automatic Resource Detection

```php
// If resource class matches relationship name, can omit resource parameter
BelongsTo::make('Category', 'category') // Looks for CategoryResource

// If relationship name matches label (camelCase), can omit it too
BelongsTo::make('Category') // Looks for 'category' relationship and CategoryResource
```

### Display Field ($formatted)

By default, uses `$column` property from the related Resource.

```php
// CategoryResource has: protected string $column = 'id';
BelongsTo::make('Category') // Will display: "1", "2", "3"

// CategoryResource has: protected string $column = 'name';
BelongsTo::make('Category') // Will display: "Electronics", "Books", etc.
```

**Override display field:**

```php
// Simple field
BelongsTo::make('Category', 'category', formatted: 'title')

// Complex format
BelongsTo::make('Category', 'category',
    fn($item) => "$item->id. $item->title"
)
```

### Important Methods

#### nullable()

Allow "no selection" option:

```php
BelongsTo::make('Category')->nullable()
```

**Don't forget:** Database column must also be nullable!

#### searchable()

Enable search in dropdown:

```php
BelongsTo::make('Category')->searchable()
```

#### creatable()

Create new related record via modal:

```php
BelongsTo::make('Category')->creatable()
```

#### valuesQuery()

Filter available options:

```php
BelongsTo::make('Category')
    ->valuesQuery(fn(Builder $query, Field $field) =>
        $query->where('active', true)
    )
```

#### asyncSearch()

For large datasets, load options asynchronously:

```php
BelongsTo::make('Category')->asyncSearch()

// With custom search logic
BelongsTo::make('Category')
    ->asyncSearch(
        'title', // Search by this column
        searchQuery: fn(Builder $query, Request $request, string $term, Field $field) =>
            $query->where('title', 'LIKE', "%{$term}%")
                  ->where('active', true),
        limit: 10
    )
```

### Changing Column After Fill

If you need to change which column the field uses:

```php
BelongsTo::make('Category', resource: CategoryResource::class)
    ->afterFill(fn($field) => $field->setColumn('alternative_category_id'))
```

## BelongsToMany Field

### Basic Usage

```php
use App\MoonShine\Resources\CategoryResource;
use MoonShine\Laravel\Fields\Relationships\BelongsToMany;

BelongsToMany::make(
    'Categories',
    'categories',
    resource: CategoryResource::class
)
```

### Display Modes

#### Default: Table with Checkboxes

```php
BelongsToMany::make('Categories', resource: CategoryResource::class)
```

#### Select Mode: Multi-select Dropdown

```php
BelongsToMany::make('Categories', resource: CategoryResource::class)
    ->selectMode()
```

### Pivot Fields

**Critical:** Must specify pivot fields in Laravel relationship!

```php
// Model
public function contacts()
{
    return $this->belongsToMany(Contact::class)
        ->withPivot('text', 'optional'); // ← Required!
}

// Resource
BelongsToMany::make('Contacts', resource: ContactResource::class)
    ->fields([
        Text::make('Contact Info', 'text'),
        Checkbox::make('Optional', 'optional'),
    ])
```

### Important Methods

#### selectMode()

Display as multi-select dropdown instead of table:

```php
BelongsToMany::make('Categories')->selectMode()
```

#### creatable()

Create new related records:

```php
BelongsToMany::make('Categories')->creatable()
```

#### asyncSearch()

For large datasets:

```php
BelongsToMany::make('Categories')
    ->selectMode()
    ->asyncSearch()
```

#### tree()

Display as tree structure (for hierarchical data):

```php
BelongsToMany::make('Categories')
    ->selectMode()
    ->tree('parent_id') // Parent column name
```

#### relatedLink()

Display as link with count instead of full interface:

```php
BelongsToMany::make('Categories')
    ->relatedLink()
```

**Don't forget:** Add relationship to `$with` property of resource!

```php
protected array $with = ['categories'];
```

## HasMany Field

### Basic Usage

```php
use App\MoonShine\Resources\CommentResource;
use MoonShine\Laravel\Fields\Relationships\HasMany;

HasMany::make(
    'Comments',
    'comments',
    resource: CommentResource::class
)
```

### Critical Requirement

**⚠️ The related resource MUST have a BelongsTo field pointing back to parent!**

```php
// CommentResource (child)
protected function formFields(): iterable
{
    return [
        BelongsTo::make('Post', 'post', resource: PostResource::class), // ← Required!
        Text::make('Text'),
    ];
}
```

### Display Location

By default, displays **outside** the main form.

```php
// Display inside main form
HasMany::make('Comments')->disableOutside()
```

### Important Methods

#### fields()

Specify which fields to show in preview:

```php
HasMany::make('Comments', resource: CommentResource::class)
    ->fields([
        BelongsTo::make('User'),
        Text::make('Text'),
        Date::make('Created'),
    ])
```

#### creatable()

Allow creating new related records:

```php
HasMany::make('Comments', resource: CommentResource::class)
    ->creatable()
```

#### limit()

Limit displayed records in preview:

```php
HasMany::make('Comments', resource: CommentResource::class)
    ->limit(5)
```

#### relatedLink()

Display as link with count:

```php
HasMany::make('Comments', resource: CommentResource::class)
    ->relatedLink()
```

**Remember:** Add to `$with`:

```php
protected array $with = ['comments'];
```

#### resourceMode() vs relationMode()

**resourceMode() (default):**
- Full CRUD for related records
- Uses related resource's pages

**relationMode():**
- Simplified inline interface
- No navigation to related resource

```php
HasMany::make('Comments')
    ->relationMode() // Simplified mode
```

### Modify Related Query

```php
HasMany::make('Comments', resource: CommentResource::class)
    ->modifyQuery(fn(Builder $query) =>
        $query->where('approved', true)
              ->orderBy('created_at', 'desc')
    )
```

## HasOne Field

Similar to HasMany but for one-to-one relationships.

```php
use App\MoonShine\Resources\ProfileResource;
use MoonShine\Laravel\Fields\Relationships\HasOne;

HasOne::make(
    'Profile',
    'profile',
    resource: ProfileResource::class
)
```

**Same requirements as HasMany:**
- Related resource must have BelongsTo field back to parent
- Must be registered in MoonShineServiceProvider

## Async Search

For relationships with many records, use async search.

### Basic Async Search

```php
BelongsTo::make('Category')
    ->asyncSearch()
```

Searches by the `$column` property of related resource.

### Advanced Async Search

```php
BelongsTo::make('City', resource: CityResource::class)
    ->asyncSearch(
        column: 'name',
        searchQuery: function(Builder $query, Request $request, string $term, Field $field) {
            return $query
                ->where('name', 'LIKE', "%{$term}%")
                ->where('active', true)
                ->where('country_id', $request->get('country_id')); // Access form values!
        },
        formatted: fn($city) => "{$city->name} ({$city->country->name})",
        limit: 15
    )
```

**Key feature:** Access current form values via `$request` in `searchQuery`!

## Associated Fields

Make one relationship field depend on another.

### Basic Association

```php
Select::make('Country', 'country_id')
    ->options([...]),

BelongsTo::make('City', resource: CityResource::class)
    ->associatedWith('country_id') // Filter cities by selected country
```

### With Async Loading

```php
Select::make('Country', 'country_id'),

BelongsTo::make('City', resource: CityResource::class)
    ->associatedWith('country_id')
    ->asyncOnInit(whenOpen: false) // Load immediately on page load
```

**Options:**
- `asyncOnInit()` or `asyncOnInit(whenOpen: true)` - Load when dropdown opens
- `asyncOnInit(whenOpen: false)` - Load immediately on page load

### Complex Association

For more control, use `asyncSearch()`:

```php
Select::make('Country', 'country_id'),

BelongsTo::make('City', resource: CityResource::class)
    ->asyncSearch(
        searchQuery: function(Builder $query, Request $request, string $term, Field $field) {
            $countryId = $request->get('country_id');

            if ($countryId) {
                $query->where('country_id', $countryId);
            }

            return $query->where('name', 'LIKE', "%{$term}%");
        }
    )
```

## Creatable Mode

Allow creating related records via modal window.

### Basic Creatable

```php
BelongsTo::make('Category')->creatable()
BelongsToMany::make('Tags')->creatable()
HasMany::make('Comments')->creatable()
```

### Custom Create Button

```php
use MoonShine\UI\Components\ActionButton;

BelongsTo::make('Category')
    ->creatable(
        button: ActionButton::make('Add New Category', '')
            ->icon('plus')
            ->primary()
    )
```

### Conditional Creatable

```php
BelongsTo::make('Category')
    ->creatable(
        condition: fn() => auth()->user()->can('create-categories')
    )
```

## Common Relationship Mistakes

### ❌ Mistake 1: Not Registering Related Resource

```php
// PostResource.php
BelongsTo::make('Category', resource: CategoryResource::class)

// But CategoryResource NOT registered in MoonShineServiceProvider
// Result: 500 error
```

**✅ Fix:** Register in `MoonShineServiceProvider`:

```php
$core->resources([
    PostResource::class,
    CategoryResource::class, // ← Add this
]);
```

### ❌ Mistake 2: Wrong $column in Related Resource

```php
// CategoryResource.php
protected string $column = 'id'; // Shows "1", "2", "3"

// PostResource.php
BelongsTo::make('Category') // Displays: "1", "2", "3" - not helpful!
```

**✅ Fix:** Set meaningful column in CategoryResource:

```php
protected string $column = 'name'; // Now shows: "Electronics", "Books", etc.
```

### ❌ Mistake 3: Missing BelongsTo in HasMany Child

```php
// PostResource (parent)
HasMany::make('Comments', resource: CommentResource::class)

// CommentResource (child) - missing BelongsTo!
protected function formFields(): iterable
{
    return [
        Text::make('Text'),
        // ❌ No BelongsTo field pointing to Post
    ];
}
// Result: Cannot create/edit comments
```

**✅ Fix:** Add BelongsTo field:

```php
protected function formFields(): iterable
{
    return [
        BelongsTo::make('Post', resource: PostResource::class), // ← Required
        Text::make('Text'),
    ];
}
```

### ❌ Mistake 4: Not Using withPivot() for Pivot Fields

```php
// Model
public function categories()
{
    return $this->belongsToMany(Category::class);
    // ❌ No withPivot()
}

// Resource
BelongsToMany::make('Categories')
    ->fields([
        Text::make('Sort Order', 'sort_order'), // Won't save!
    ])
```

**✅ Fix:** Add withPivot() in model:

```php
public function categories()
{
    return $this->belongsToMany(Category::class)
        ->withPivot('sort_order'); // ← Required
}
```

### ❌ Mistake 5: Nullable Without Database Support

```php
BelongsTo::make('Category')->nullable()
// But database: $table->foreignId('category_id')->constrained();
// Result: Database error on NULL
```

**✅ Fix:** Make database column nullable:

```php
$table->foreignId('category_id')->nullable()->constrained();
```

### ❌ Mistake 6: Using relatedLink() Without $with

```php
// Resource
protected array $with = []; // ← Empty!

HasMany::make('Comments')->relatedLink()
// Result: N+1 query problem, slow performance
```

**✅ Fix:** Add relationship to $with:

```php
protected array $with = ['comments'];
```

### ❌ Mistake 7: Wrong asyncSearch Column

```php
// CategoryResource has $column = 'id'

BelongsTo::make('Category')
    ->asyncSearch() // Searches by 'id', not helpful!
```

**✅ Fix:** Specify search column:

```php
BelongsTo::make('Category')
    ->asyncSearch('name') // Search by name instead
```

### ❌ Mistake 8: Not Understanding resourceMode vs relationMode

```php
// Using default resourceMode but wanted simple interface
HasMany::make('Comments')
// Result: Full CRUD interface, navigation to CommentResource pages
```

**✅ Fix:** Use relationMode for simpler interface:

```php
HasMany::make('Comments')->relationMode()
```

### ❌ Mistake 9: associatedWith on Non-Async Field

```php
BelongsTo::make('City')
    ->associatedWith('country_id')
// But no asyncSearch() - won't work properly!
```

**✅ Fix:** associatedWith() automatically enables async, but be explicit:

```php
BelongsTo::make('City')
    ->associatedWith('country_id')
    ->asyncOnInit(whenOpen: false) // Explicit async configuration
```

### ❌ Mistake 10: Trying to Use $formatted on Unsupported Fields

```php
HasMany::make('Comments', 'comments',
    fn($item) => $item->text // ← Has no effect! HasMany doesn't support $formatted
)
```

**✅ Fix:** Use fields() instead:

```php
HasMany::make('Comments', resource: CommentResource::class)
    ->fields([
        Text::make('Text'),
        Date::make('Created'),
    ])
```

## Quick Reference

**Required for all relationship fields:**
- Related resource MUST be registered in `MoonShineServiceProvider`

**BelongsTo:**
```php
->nullable() // Allow no selection
->searchable() // Enable search
->asyncSearch() // For large datasets
->creatable() // Create new records
->valuesQuery(Closure) // Filter options
```

**BelongsToMany:**
```php
->selectMode() // Multi-select dropdown
->fields([...]) // Pivot fields (need ->withPivot() in model)
->tree('parent_id') // Tree structure
->relatedLink() // Show as link (add to $with!)
```

**HasMany/HasOne:**
```php
->fields([...]) // Preview fields
->creatable() // Create new records
->limit(10) // Limit preview records
->relatedLink() // Show as link (add to $with!)
->resourceMode() // Full CRUD (default)
->relationMode() // Simple inline
->disableOutside() // Show inside form
```

**Critical requirements:**
- HasMany/HasOne child MUST have BelongsTo back to parent
- Pivot fields MUST use ->withPivot() in model
- relatedLink() MUST add relationship to $with
- Nullable fields MUST have nullable database column
- Set meaningful $column in related resources (not 'id')
