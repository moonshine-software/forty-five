# 🌙 Forty-Five

> AI-powered development toolkit for MoonShine - Inspired by GitHub Speckit

Forty-Five is a CLI tool that brings AI-powered development assistance to your MoonShine projects. Install guidelines and slash commands that help AI agents (like Claude) understand MoonShine components and generate production-ready code.

## ✨ Features

- 🤖 **AI Agent Integration** - Works with Claude Code (more agents coming soon)
- 📚 **Comprehensive Guidelines** - Complete MoonShine component documentation
- ⚡ **Slash Commands** - Easy-to-use commands for common tasks
- 🎯 **Production Ready** - Generates code following best practices
- 🔄 **Auto-sync** - Keep guidelines and commands up-to-date

## 🚀 Quick Start

### Installation

Install globally via npm:

```bash
npm install -g @moonshine-software/forty-five
```

### Initialize in Your Project

Navigate to your MoonShine project and run:

```bash
cd your-moonshine-project
forty-five init
```

Follow the prompts to:
1. Select your AI agent (Claude, Cursor, etc.)
2. Download commands and guidelines
3. Set up configuration

### Project Structure After Init

```
your-moonshine-project/
├── .claude/                    # Claude-specific files
│   └── commands/
│       ├── forty-five.components.md
│       ├── forty-five.layout.md
│       ├── forty-five.palettes.md
│       ├── forty-five.field.md
│       └── forty-five.component.md
└── .guidelines/                # Shared guidelines
    ├── blade-components.md
    ├── palettes.md
    ├── fields-development.md
    └── components-development.md
```

## 📖 Usage

### Available Commands

After initialization, you can use these slash commands in Claude:

#### `/forty-five.components` - Work with Components

Create any MoonShine component with proper structure:

```
/forty-five.components create a user table with name, email, status badges, and action buttons
```

```
/forty-five.components create a modal form for adding new products
```

#### `/forty-five.layout` - Create Layouts

Generate complete layouts with navigation:

```
/forty-five.layout create a sidebar layout with logo, menu, and theme switcher
```

```
/forty-five.layout create a top navigation bar with horizontal menu
```

#### `/forty-five.palettes` - Create Color Palettes

Create and modify custom color palettes using OKLCH color space:

```
/forty-five.palettes create a blue ocean theme with hue 240
```

```
/forty-five.palettes create a purple palette for dark and light themes
```

#### `/forty-five.field` - Create Custom Fields

Create custom MoonShine fields with proper structure and methods:

```
/forty-five.field create a rating field with stars from 1 to 5
```

```
/forty-five.field create a color picker field with preview
```

#### `/forty-five.component` - Create Custom Components

Create custom MoonShine components for UI decoration:

```
/forty-five.component create an alert component with different types
```

```
/forty-five.component create a stats card with icon and value
```

## 🎯 What Gets Generated

Forty-Five ensures AI agents generate code that follows MoonShine best practices:

✅ **Correct HTML Structure** - No duplicate HTML tags, proper component nesting
✅ **Required Wrappers** - All CSS classes and wrappers in place
✅ **Assets Included** - Vite assets properly configured
✅ **Responsive Design** - Mobile-friendly with proper burger menus
✅ **Production Ready** - Following all MoonShine conventions

## 📚 Guidelines

The guidelines provide comprehensive documentation for:

### `blade-components.md`
- Complete component library
- Critical usage rules
- Required wrappers and attributes
- Slot-based vs array-based patterns
- Best practices and examples

### `palettes.md`
- OKLCH color space format
- Complete palette structure
- Light and dark theme implementation
- Contrast requirements and best practices

### `fields-development.md`
- Custom field creation guide
- Field class anatomy and methods
- View templates with Alpine.js
- Fluent methods and field modes
- Relationship fields handling
- Complete examples (Rating, JSON, File Upload)

### `components-development.md`
- Custom component creation guide
- Components vs Fields comparison
- Fluent methods and viewData()
- Slots and nested components
- Complete examples (Alert, StatsCard, Breadcrumbs)

## 🔧 CLI Commands

### `forty-five init`

Initialize Forty-Five in your project.

**Options:**
- Interactive agent selection
- Automatic directory creation
- Downloads latest commands and guidelines

### `forty-five update` (Coming Soon)

Update commands and guidelines to the latest version.

### `forty-five status` (Coming Soon)

Check initialization status and versions.

## 🤝 Supported AI Agents

- ✅ **Claude Code** - Full support
- 🚧 **Cursor** - Coming soon
- 🚧 **GitHub Copilot** - Coming soon

## 📝 Examples

### Creating a User Management Interface

```
/forty-five.components create a users table with:
- Avatars and name columns
- Status badges (active/inactive)
- Role badges with different colors
- Action buttons (view, edit, delete)
```

The AI will generate a complete, working table with:
- Proper slot-based structure
- MoonShine badge components
- Icon buttons with proper wrappers
- All required CSS classes

### Building a Custom Color Palette

```
/forty-five.palettes create a professional teal palette with:
- Hue angle 180 (teal/cyan)
- Both light and dark themes
- Proper contrast ratios
- All semantic colors (success, warning, error, info)
```

### Creating a Custom Field

```
/forty-five.field create a JSON editor field that:
- Displays formatted JSON in a textarea
- Has syntax highlighting
- Validates JSON on input
- Saves as JSON string to database
```

The AI will generate:
- PHP class in `app/MoonShine/Fields/JsonEditor.php`
- Blade view in `resources/views/admin/fields/json-editor.blade.php`
- Proper `viewData()` method
- Correct `resolveValue()` and `resolveOnApply()` methods
- Alpine.js integration for interactivity

### Creating a Custom Component

```
/forty-five.component create a stats card component that:
- Shows an icon, value, and label
- Supports different colors
- Value can be dynamic (closure)
- Used for dashboard widgets
```

The AI will generate:
- PHP class in `app/MoonShine/Components/StatsCard.php`
- Blade view in `resources/views/admin/components/stats-card.blade.php`
- Fluent methods for configuration
- Support for closures in values
- Proper attribute handling

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         User's MoonShine Project        │
├─────────────────────────────────────────┤
│  .claude/commands/                      │
│  ├── forty-five.components.md          │
│  │   → Reads .guidelines/              │
│  ├── forty-five.layout.md              │
│  │   → Reads .guidelines/              │
│  ├── forty-five.palettes.md            │
│  │   → Reads .guidelines/              │
│  ├── forty-five.field.md               │
│  │   → Reads .guidelines/              │
│  └── forty-five.component.md           │
│      → Reads .guidelines/              │
│                                         │
│  .guidelines/                           │
│  ├── blade-components.md               │
│  ├── palettes.md                       │
│  ├── fields-development.md             │
│  └── components-development.md         │
└─────────────────────────────────────────┘
```

## 🔄 Update Process

Guidelines and commands are downloaded from the official repository:
```
https://github.com/moonshine-software/forty-five
```

When you run `forty-five init`, it fetches:
- Latest command files for your selected agent
- Latest guideline files
- Ensures you have the most up-to-date documentation

## 🐛 Troubleshooting

### "composer.json not found"
Make sure you're in your Laravel/MoonShine project root directory.

### Commands not appearing in Claude
1. Restart Claude Code
2. Check that files were created in `.claude/commands/`
3. Verify slash commands with `/` in Claude

### Guidelines not being followed
Make sure the AI agent can access `.guidelines/` directory. Commands are configured to read from this location.

## 📦 Package Development

### Building from Source

```bash
# Clone repository
git clone https://github.com/moonshine-software/forty-five.git
cd forty-five

# Install dependencies
npm install

# Build
npm run build

# Test locally
npm link
cd /path/to/your-project
forty-five init
```

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by GitHub Speckit
- Built for the MoonShine Laravel admin panel
- Powered by AI agents like Claude

## 🔗 Links

- [MoonShine Documentation](https://moonshine-laravel.com)
- [GitHub Repository](https://github.com/moonshine-software/forty-five)
- [Report Issues](https://github.com/moonshine-software/forty-five/issues)

---

Made with 🌙 by the MoonShine team
