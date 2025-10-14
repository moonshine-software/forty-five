# MoonShine Common Patterns AI Guide

This guide covers frequently used patterns and scenarios that developers commonly encounter when working with MoonShine.

## Table of Contents
- [Query Modification](#query-modification)
- [Search Configuration](#search-configuration)
- [Import / Export](#import-export)
- [Filters with Custom Logic](#filters-with-custom-logic)
- [Conditional Field Display](#conditional-field-display)
- [Working with JSON Fields](#json-fields)
- [File Uploads](#file-uploads)
- [Validation Patterns](#validation-patterns)
- [Common Patterns](#common-patterns)

## Query Modification

### Basic Query Modification

Modify all queries for the resource:

```php
protected function modifyQueryBuilder(Builder $builder): Builder
{
    return $builder->where('active', true)
                   ->where('published_at', '<=', now())
                   ->orderBy('views', 'desc');
}
```

**Use case:** Global filters that apply to all resource views (index, form, detail).

### Query for Single Record

Modify query when fetching a single record (edit/detail page):

```php
protected function modifyItemQueryBuilder(Builder $builder): Builder
{
    return $builder->withTrashed() // Include soft-deleted
                   ->with(['media', 'translations']); // Extra eager loading
}
```

**Use case:** Including soft-deleted records, extra relationships.

### Complete Query Override

For full control, override `newQuery()`:

```php
protected function newQuery(): Builder
{
    return parent::newQuery()
        ->where('tenant_id', auth()->user()->tenant_id);
}
```

**Use case:** Multi-tenancy, complex scopes.

## Search Configuration

### Basic Search

Specify searchable fields:

```php
protected function search(): array
{
    return ['id', 'title', 'content', 'slug'];
}
```

**Empty array = no search bar displayed.**

### Relation Search

Search by related model fields:

```php
protected function search(): array
{
    return [
        'title',
        'category.name',        // BelongsTo relation
        'tags.name',           // BelongsToMany relation
        'author.email',        // BelongsTo relation
    ];
}
```

**Don't forget:** Add relationships to `$with`:

```php
protected array $with = ['category', 'tags', 'author'];
```

### JSON Field Search

Search in JSON columns:

```php
// Key-value JSON
protected function search(): array
{
    return ['data->title', 'data->description'];
}

// Array of objects JSON
protected function search(): array
{
    return ['data->[*]->title', 'data->[*]->name'];
}
```

### Full-Text Search

For large text fields with full-text index:

```php
use MoonShine\Support\Attributes\SearchUsingFullText;

#[SearchUsingFullText(['title', 'content'])]
protected function search(): array
{
    return ['id']; // Other searchable fields
}
```

**Required:** Add full-text index to database:

```php
// Migration
$table->fullText(['title', 'content']);
```

### Custom Search Logic

Override search query completely:

```php
protected function searchQuery(string $terms): void
{
    parent::searchQuery($terms); // Keep default behavior

    $this->newQuery()->where(function (Builder $builder) use ($terms) {
        $builder->where('custom_field', 'LIKE', "%{$terms}%")
                ->orWhereHas('customRelation', function($q) use ($terms) {
                    $q->where('name', 'LIKE', "%{$terms}%");
                });
    });
}
```

## Import / Export

### Installation

```bash
composer require moonshine/import-export
```

### Setup Resource

```php
use MoonShine\ImportExport\Contracts\HasImportExportContract;
use MoonShine\ImportExport\Traits\ImportExportConcern;

class PostResource extends ModelResource implements HasImportExportContract
{
    use ImportExportConcern;

    protected function importFields(): iterable
    {
        return [
            ID::make(),              // ← Required for updates!
            Text::make('Title'),
            Text::make('Content'),
        ];
    }

    protected function exportFields(): iterable
    {
        return [
            ID::make(),
            Text::make('Title'),
            Text::make('Content'),
            Date::make('Created At'),
        ];
    }
}
```

**⚠️ Critical:** Always include `ID::make()` in `importFields()` for updates, not just inserts!

### Import with Value Transformation

```php
protected function importFields(): iterable
{
    return [
        ID::make(),
        Enum::make('Status')
            ->attach(StatusEnum::class)
            ->fromRaw(fn(string $raw, Enum $ctx) => StatusEnum::tryFrom($raw)),
    ];
}
```

### Export with Value Transformation

```php
protected function exportFields(): iterable
{
    return [
        ID::make(),
        Enum::make('Status')
            ->attach(StatusEnum::class)
            ->modifyRawValue(fn(StatusEnum $raw, $data, Enum $ctx) => $raw->value),
    ];
}
```

### Import Configuration

```php
protected function import(): ?Handler
{
    return ImportHandler::make('Import')
        ->disk('public')
        ->dir('/imports')
        ->deleteAfter() // Delete file after import
        ->delimiter(',')
        ->notifyUsers(fn() => [auth()->id()]);
}
```

### Export Configuration

```php
protected function export(): ?Handler
{
    return ExportHandler::make('Export')
        ->disk('public')
        ->dir('/exports')
        ->filename('export_' . date('Ymd_His'))
        ->csv() // Export as CSV instead of XLSX
        ->delimiter(',')
        ->withConfirm()
        ->notifyUsers(fn() => [auth()->id()]);
}
```

## Filters with Custom Logic

### Basic Filter with onApply

```php
protected function filters(): iterable
{
    return [
        Text::make('Title', 'title')
            ->onApply(fn(Builder $query, $value, Field $field) =>
                $query->where('title', 'LIKE', "%{$value}%")
            ),
    ];
}
```

### Date Range Filter

```php
use MoonShine\UI\Fields\DateRange;

protected function filters(): iterable
{
    return [
        DateRange::make('Created', 'created_at'),
    ];
}
```

### Select Filter with Relation

```php
protected function filters(): iterable
{
    return [
        BelongsTo::make('Category', 'category', resource: CategoryResource::class),
    ];
}
```

### Custom Enum Filter

```php
protected function filters(): iterable
{
    return [
        Select::make('Status', 'status')
            ->options([
                'draft' => 'Draft',
                'published' => 'Published',
                'archived' => 'Archived',
            ])
            ->onApply(fn(Builder $query, $value, Field $field) =>
                $value ? $query->where('status', $value) : $query
            ),
    ];
}
```

### Multiple Relation Filter

```php
protected function filters(): iterable
{
    return [
        BelongsToMany::make('Tags', 'tags', resource: TagResource::class)
            ->selectMode()
            ->onApply(fn(Builder $query, $value, Field $field) =>
                $value ? $query->whereHas('tags', fn($q) => $q->whereIn('tags.id', $value)) : $query
            ),
    ];
}
```

## Conditional Field Display

### showWhen with Checkbox

```php
Checkbox::make('Has discount', 'has_discount'),

Number::make('Discount %', 'discount_percent')
    ->showWhen('has_discount', true)
    ->min(0)
    ->max(100),
```

### showWhen with Select

```php
Select::make('Product Type', 'type')
    ->options([
        'physical' => 'Physical Product',
        'digital' => 'Digital Product',
    ]),

Number::make('Weight (kg)', 'weight')
    ->showWhen('type', '=', 'physical'),

Text::make('Download URL', 'download_url')
    ->showWhen('type', '=', 'digital'),
```

### Multiple Conditions

```php
// Field shows only when BOTH conditions are true (AND)
Text::make('Special Field')
    ->showWhen('type', '=', 'premium')
    ->showWhen('status', '=', 'active'),
```

### Complex Conditional Logic

For complex conditions, use `canSee()`:

```php
Text::make('Admin Only Field')
    ->canSee(function($field) {
        return auth()->user()->isAdmin()
            && $field->getData()?->status === 'special';
    }),
```

## JSON Fields

### Key-Value JSON

```php
use MoonShine\UI\Fields\Json;

Json::make('Settings', 'settings')
    ->keyValue('Key', 'Value')
    ->fields([
        Text::make('Key'),
        Text::make('Value'),
    ]),
```

### Structured JSON

```php
Json::make('Contacts', 'contacts')
    ->fields([
        Text::make('Type', 'type'),
        Text::make('Value', 'value'),
        Checkbox::make('Primary', 'is_primary'),
    ])
    ->removable() // Allow removing items
    ->creatable() // Allow adding items
    ->vertical(), // Vertical layout
```

### Nested JSON

```php
Json::make('Addresses', 'addresses')
    ->fields([
        Text::make('Street', 'street'),
        Text::make('City', 'city'),
        Text::make('Zip', 'zip'),
        Json::make('Contacts', 'contacts')
            ->fields([
                Text::make('Phone', 'phone'),
                Text::make('Email', 'email'),
            ]),
    ]),
```

## File Uploads

### Single Image

```php
use MoonShine\UI\Fields\Image;

Image::make('Avatar', 'avatar')
    ->disk('public')
    ->dir('avatars')
    ->allowedExtensions(['jpg', 'png', 'gif'])
    ->removable(),
```

### Multiple Images

```php
Image::make('Gallery', 'gallery')
    ->disk('public')
    ->dir('gallery')
    ->multiple()
    ->removable(),
```

### File Upload

```php
use MoonShine\UI\Fields\File;

File::make('Document', 'document')
    ->disk('public')
    ->dir('documents')
    ->allowedExtensions(['pdf', 'doc', 'docx'])
    ->removable(),
```

### Custom File Names

```php
Image::make('Photo', 'photo')
    ->customName(fn($file, $ctx) =>
        str($ctx->getData()?->id)->append('_photo.')->append($file->extension())
    ),
```

## Validation Patterns

### Basic Validation

```php
protected function rules($item): array
{
    return [
        'title' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email', 'unique:users,email'],
        'status' => ['required', 'in:draft,published'],
    ];
}
```

### Conditional Validation

```php
protected function rules($item): array
{
    return [
        'title' => ['required', 'string', 'max:255'],
        'password' => !$item->exists
            ? ['required', 'min:8', 'confirmed']
            : ['nullable', 'min:8', 'confirmed'],
    ];
}
```

### Unique with Ignore

```php
use Illuminate\Validation\Rule;

protected function rules($item): array
{
    return [
        'email' => [
            'required',
            'email',
            Rule::unique('users', 'email')->ignore($item->id),
        ],
        'slug' => [
            'required',
            Rule::unique('posts', 'slug')->ignore($item->id),
        ],
    ];
}
```

### Custom Messages

```php
public function validationMessages(): array
{
    return [
        'title.required' => 'The title field is required',
        'email.unique' => 'This email is already registered',
        'password.min' => 'Password must be at least 8 characters',
    ];
}
```

### Prepare Data Before Validation

```php
public function prepareForValidation(): void
{
    request()?->merge([
        'slug' => str(request()->input('title'))->slug(),
        'email' => str(request()->input('email'))->lower()->trim(),
    ]);
}
```

## Common Patterns

### Multi-Tenancy

```php
// In Resource
protected function newQuery(): Builder
{
    return parent::newQuery()
        ->where('tenant_id', auth()->user()->tenant_id);
}

// Auto-fill tenant_id on save
protected function rules($item): array
{
    if (!$item->exists) {
        request()->merge(['tenant_id' => auth()->user()->tenant_id]);
    }

    return [
        'title' => 'required',
    ];
}
```

### Soft Deletes Handling

```php
// Show soft-deleted in forms
protected function modifyItemQueryBuilder(Builder $builder): Builder
{
    return $builder->withTrashed();
}

// Don't show soft-deleted in listing
protected function modifyQueryBuilder(Builder $builder): Builder
{
    return $builder->whereNull('deleted_at');
}

// Include restore button
protected function indexButtons(): ListOf
{
    return parent::indexButtons()->add(
        ActionButton::make('Restore', route('restore'))
            ->canSee(fn($item) => $item->trashed())
    );
}
```

### Auto-fill User ID

```php
protected function rules($item): array
{
    if (!$item->exists && !request()->has('user_id')) {
        request()->merge(['user_id' => auth()->id()]);
    }

    return [
        'title' => 'required',
        'user_id' => 'required|exists:users,id',
    ];
}
```

### Slug Auto-generation

```php
use MoonShine\UI\Fields\Slug;

protected function formFields(): iterable
{
    return [
        Text::make('Title', 'title'),

        Slug::make('Slug', 'slug')
            ->from('title')
            ->unique()
            ->separator('-'),
    ];
}
```

### Status Color Coding

```php
use MoonShine\Support\Enums\Color;

protected function indexFields(): iterable
{
    return [
        Text::make('Status', 'status')
            ->badge(fn($status) => match($status) {
                'active' => Color::SUCCESS,
                'pending' => Color::WARNING,
                'inactive' => Color::SECONDARY,
                'error' => Color::ERROR,
                default => Color::INFO,
            }),
    ];
}
```

### Calculated Fields

```php
protected function detailFields(): iterable
{
    return [
        Text::make('Total Orders')
            ->fillUsing(fn($item) => $item->orders()->count()),

        Text::make('Total Revenue')
            ->fillUsing(fn($item) => '$' . number_format($item->orders()->sum('total'), 2)),
    ];
}
```

### Custom Actions with Events

```php
protected function indexButtons(): ListOf
{
    return parent::indexButtons()->add(
        ActionButton::make('Publish', route('publish', ['id' => '{id}']))
            ->onClick(fn() => 'alert("Publishing...")', 'prevent')
            ->dispatchEvent(AlpineJs::event(JsEvent::TABLE_ROW_UPDATED, '{row-id}'))
            ->canSee(fn($item) => $item->status === 'draft')
    );
}
```

### Bulk Actions

```php
protected function indexButtons(): ListOf
{
    return parent::indexButtons()->add(
        ActionButton::make('Archive Selected', route('archive.bulk'))
            ->bulk() // Enable bulk action
            ->warning()
            ->showInDropdown()
    );
}
```

## Quick Reference

**Query Modification:**
- `modifyQueryBuilder()` - all queries
- `modifyItemQueryBuilder()` - single record
- `newQuery()` - complete override

**Search:**
- Return array of searchable fields
- Use `relation.field` for relationships
- Use `data->key` for JSON
- Use `#[SearchUsingFullText]` for full-text

**Import/Export:**
- Install `moonshine/import-export`
- Implement `HasImportExportContract`
- Use `ImportExportConcern` trait
- Always include `ID::make()` in imports

**Filters:**
- Use `onApply()` for custom logic
- Filters receive `Builder $query`
- Return `$query` from onApply

**Validation:**
- Use `$item->exists` for create/update logic
- Use `Rule::unique()->ignore($item->id)`
- Override `validationMessages()` for custom messages
- Use `prepareForValidation()` for data prep
