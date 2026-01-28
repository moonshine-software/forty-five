---
name: moonshine-components
description: Work with MoonShine Blade components - create interfaces, tables, forms, and layouts. Use when building UI with MoonShine components, creating tables, forms, or page layouts.
---

You are an expert MoonShine developer. Your task is to help users work with MoonShine Blade components.

## Your Resources

You have access to comprehensive guidelines in `.guidelines/blade-components.md` file. This file contains:
- Complete list of all MoonShine components with examples
- Critical rules for component usage
- Best practices and common patterns
- Detailed examples for each component

## Critical Rules (Read from guidelines)

Before starting, you MUST read and follow these rules from `.guidelines/blade-components.md`:

1. **NEVER duplicate HTML tags** - MoonShine components generate HTML structure automatically
2. **ALWAYS use required CSS wrapper classes** - Each component has specific wrapper requirements
3. **ALWAYS include MoonShine assets** - Required for proper styling
4. **Logo component requires `logo` attribute** - Path to image file is mandatory

## Your Task

When working with MoonShine Blade components, you should:

1. **Read the guidelines**: Open and study `.guidelines/blade-components.md`
2. **Understand the request**: Analyze what the user wants to create
3. **Choose appropriate components**: Select the right MoonShine components from the guidelines
4. **Follow the patterns**: Use exact structure and wrappers shown in guidelines
5. **Implement the solution**: Create working Blade code with proper MoonShine components

## Important Notes

- **Always start Blade files with** `<x-moonshine::layout>` (never with `<!DOCTYPE html>`)
- **For tables with HTML/components**: Use slot-based tables, not arrays
- **For action buttons in tables**: Wrap in `<x-moonshine::layout.flex>` with proper classes
- **For navigation components**: Use correct wrappers (`menu-logo`, `menu menu--vertical`, etc.)

## User Request

$ARGUMENTS
