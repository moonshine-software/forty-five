
# MoonShine AI Guidelines

Comprehensive guide for AI assistants working with MoonShine admin panel framework.

## Quick Navigation

### 🎯 Start Here
- **New to MoonShine?** → Start with [Model Resources](model-resources.md)
- **Building UI?** → Check [Blade Components](blade-components.md)
- **Working with data?** → See [Fields Guide](fields-guide.md)

### 📚 Complete Documentation

1. **[Model Resources Guide](model-resources.md)**
   Resource structure, registration, validation, buttons, lifecycle methods
   - Critical: Resource registration
   - Field methods (index/form/detail)
   - Validation rules
   - Buttons and their locations
   - Query modification
   - Common mistakes

2. **[Fields Guide](fields-guide.md)**
   Field modes, lifecycle, attributes, and advanced usage
   - Field modes (default/preview/raw)
   - changeFill vs afterFill
   - changePreview
   - onApply for forms vs filters
   - Sortable fields
   - updateOnPreview
   - showWhen conditional display

3. **[Relationships Guide](relationships.md)**
   BelongsTo, HasMany, BelongsToMany, HasOne
   - Critical: Resource registration for relationships
   - BelongsTo field
   - BelongsToMany field
   - HasMany field
   - Async search
   - Associated fields
   - Creatable mode

4. **[Blade Components Guide](blade-components.md)**
   Complete reference for all MoonShine Blade components
   - Layout components (Grid, Flex, Sidebar, Header)
   - Interface components (Box, Card, Alert, Modal, Table)
   - Form components
   - Navigation components
   - Icons (Heroicons)
   - Assets configuration

5. **[Common Patterns Guide](common-patterns.md)**
   Frequently used patterns and scenarios
   - Query modification
   - Search configuration
   - Import/Export
   - Filters with custom logic
   - Conditional field display
   - JSON fields
   - File uploads
   - Validation patterns

## 🔍 Quick Search by Topic

### Components & UI
- **Layout Structure** → [Blade Components: Basic Template Structure](blade-components.md#basic-template-structure)
- **Tables** → [Blade Components: Table](blade-components.md#table-data-table)
- **Forms** → [Blade Components: Form](blade-components.md#form-form)
- **Modals** → [Blade Components: Modal](blade-components.md#modal-modal-window)
- **Icons** → [Blade Components: Icons in MoonShine](blade-components.md#icons-in-moonshine)

### Resources & Data
- **Creating Resources** → [Model Resources: Resource Structure](model-resources.md#resource-structure)
- **Resource Registration** → [Model Resources: Critical: Resource Registration](model-resources.md#critical-resource-registration)
- **Validation** → [Model Resources: Validation Rules](model-resources.md#validation-rules)
- **Query Modification** → [Common Patterns: Query Modification](common-patterns.md#query-modification)

### Fields
- **Field Types** → [Fields Guide: Field Modes](fields-guide.md#field-modes)
- **Relationships** → [Relationships Guide](relationships.md)
- **Conditional Display** → [Fields Guide: showWhen](fields-guide.md#show-when)
- **Custom Logic** → [Fields Guide: changeFill vs afterFill](fields-guide.md#critical-changefill-vs-afterfill)

### Common Tasks
- **Search** → [Common Patterns: Search Configuration](common-patterns.md#search-configuration)
- **Import/Export** → [Common Patterns: Import/Export](common-patterns.md#import-export)
- **File Uploads** → [Common Patterns: File Uploads](common-patterns.md#file-uploads)
- **Filters** → [Common Patterns: Filters with Custom Logic](common-patterns.md#filters-with-custom-logic)

## ⚠️ Critical Warnings

### Must-Know Before Starting

1. **Resource Registration** (Most Common Error!)
   - ALL resources MUST be registered in `MoonShineServiceProvider`
   - See: [Model Resources: Critical: Resource Registration](model-resources.md#critical-resource-registration)
   - See: [Relationships: Critical: Resource Registration](relationships.md#resource-registration)

2. **Field Modes**
   - Fields have 3 modes: default (form), preview (table), raw (export)
   - Understanding modes is critical for proper field usage
   - See: [Fields Guide: Field Modes](fields-guide.md#field-modes)

3. **Relationship Requirements**
   - Related resources MUST be registered
   - HasMany/HasOne child MUST have BelongsTo back to parent
   - Pivot fields MUST use `->withPivot()` in model
   - See: [Relationships Guide](relationships.md)

4. **Assets Configuration**
   - MoonShine assets are pre-compiled and ready to use
   - Custom Tailwind classes require custom build setup
   - See: [Blade Components: Critical: MoonShine Assets Configuration](blade-components.md#critical-moonshine-assets-configuration)

## 🎓 Learning Path

### Beginner Path
1. Read [Model Resources: Resource Structure](model-resources.md#resource-structure)
2. Understand [Model Resources: Critical: Resource Registration](model-resources.md#critical-resource-registration)
3. Learn [Fields Guide: Field Modes](fields-guide.md#field-modes)
4. Check [Blade Components: Basic Template Structure](blade-components.md#basic-template-structure)

### Intermediate Path
1. Master [Relationships Guide](relationships.md)
2. Learn [Fields Guide: changeFill vs afterFill](fields-guide.md#critical-changefill-vs-afterfill)
3. Study [Common Patterns: Query Modification](common-patterns.md#query-modification)
4. Explore [Common Patterns: Search Configuration](common-patterns.md#search-configuration)

### Advanced Path
1. Understand [Model Resources: Lifecycle Methods](model-resources.md#lifecycle-methods)
2. Master [Fields Guide: onApply for Forms vs Filters](fields-guide.md#onapply-usage)
3. Learn [Common Patterns: Import/Export](common-patterns.md#import-export)
4. Study [Blade Components: Assets Configuration](blade-components.md#critical-moonshine-assets-configuration)

## 📝 Common Mistakes to Avoid

Each guide has a "Common Mistakes" section with fixes:
- [Model Resources: Common Mistakes](model-resources.md#common-mistakes)
- [Fields Guide: Common Field Mistakes](fields-guide.md#common-mistakes)
- [Relationships: Common Relationship Mistakes](relationships.md#common-mistakes)

## 🔧 Quick Reference

### Resource Creation
```bash
php artisan moonshine:resource ModelName
```

### Field Methods
- `indexFields()` - listing table
- `formFields()` - create/edit form
- `detailFields()` - detail view

### Registration
```php
// app/Providers/MoonShineServiceProvider.php
$core->resources([
    YourResource::class,
]);
```

### Common Field Modifiers
```php
->sortable()        // Make sortable
->nullable()        // Allow NULL
->searchable()      // Enable search
->required()        // Make required
->default($value)   // Set default
->showWhen()        // Conditional display
```

## 💡 Tips for AI Assistants

1. **Always check resource registration** before creating relationship fields
2. **Understand the context** - form vs table vs filter affects field behavior
3. **Read the Common Mistakes** sections to avoid known issues
4. **Check Quick Reference** sections at the end of each guide
5. **Use Table of Contents** to quickly navigate to specific topics

## 📖 Document Structure

Each guide follows this structure:
- **Table of Contents** - Quick navigation
- **Main Content** - Detailed explanations with examples
- **Common Mistakes** - What not to do and how to fix
- **Quick Reference** - TL;DR summary

## 🌟 Best Practices

1. Start with understanding the resource structure
2. Always register resources before using them
3. Set meaningful `$column` property (not 'id')
4. Add relationships to `$with` array
5. Use appropriate field modes
6. Leverage MoonShine's pre-built components
7. Follow validation patterns

## Version Information

These guidelines are based on MoonShine 3.x

---

**Need help?** Check the specific guide for your topic, or start with the [Model Resources Guide](model-resources.md) if you're new to MoonShine.
