# Getting Started with Forty-Five

Welcome to Forty-Five! This guide will help you set up and start using AI-powered development for your MoonShine projects.

## What is Forty-Five?

Forty-Five is a CLI tool inspired by GitHub Speckit that brings AI assistance to MoonShine development. It installs:
- **Slash commands** for your AI agent (Claude, Cursor, etc.)
- **Comprehensive guidelines** about MoonShine components
- **Best practices** to generate production-ready code

## Installation

### Step 1: Install Globally

```bash
npm install -g @moonshine-software/forty-five
```

Verify installation:
```bash
forty-five --version
```

### Step 2: Navigate to Your Project

```bash
cd /path/to/your-moonshine-project
```

Make sure you're in the root directory with `composer.json`.

### Step 3: Initialize

```bash
forty-five init
```

You'll see:
```
🌙 Forty-Five Initialization

Setting up AI-powered development toolkit for MoonShine

? Which AI agent are you using? (Use arrow keys)
❯ 🤖 Claude (claude.ai/code)
  💬 Cursor (Coming soon)
  🐙 GitHub Copilot (Coming soon)
```

Select your AI agent (currently only Claude is supported).

The tool will:
1. ✅ Create `.claude/commands/` directory
2. ✅ Create `.guidelines/` directory
3. ✅ Download latest commands from GitHub
4. ✅ Download latest guidelines from GitHub

### Step 4: Verify Setup

Check that these directories were created:

```bash
ls -la .claude/commands/
# Should show:
# forty-five.components.md
# forty-five.layout.md
# forty-five.palettes.md

ls -la .guidelines/
# Should show:
# blade-components.md
# palettes.md
```

## Using Forty-Five

### In Claude Code

1. **Open your project** in Claude Code (claude.ai/code)

2. **Use slash commands** by typing `/` followed by the command name:

   ```
   /forty-five.components create a user table with actions
   ```

3. **Claude will:**
   - Read the guidelines from `.guidelines/blade-components.md`
   - Understand your request
   - Generate proper MoonShine code
   - Follow all best practices

### Available Commands

#### `/forty-five.components`

Create any MoonShine component with proper structure.

**Examples:**

```
/forty-five.components create a table with user data, status badges, and edit/delete buttons
```

```
/forty-five.components create a modal form for creating new products with fields: name, price, description
```

```
/forty-five.components create a card with metrics showing total users, revenue, and orders
```

#### `/forty-five.layout`

Generate complete layouts with navigation.

**Examples:**

```
/forty-five.layout create a sidebar layout with logo, menu items (Dashboard, Users, Settings), and theme switcher
```

```
/forty-five.layout create a top navigation bar with horizontal menu
```

```
/forty-five.layout create a responsive layout with mobile menu support
```

#### `/forty-five.palettes`

Create and modify custom color palettes using OKLCH color space.

**Examples:**

```
/forty-five.palettes create a blue ocean theme with hue 240
```

```
/forty-five.palettes create a purple palette for dark and light themes
```

```
/forty-five.palettes modify the existing palette to use green as primary color (hue 142)
```

## What Gets Generated

When you use Forty-Five commands, Claude generates code that:

✅ **Follows MoonShine conventions**
- Correct component usage
- Proper HTML structure (no duplicate tags)
- Required CSS wrappers in place

✅ **Is production-ready**
- All required attributes included
- Assets properly configured
- Responsive design

✅ **Uses best practices**
- Slot-based tables for complex data
- Proper icon usage
- Semantic colors and styling

## Example Workflow

Let's create a complete user management page:

### 1. Create the Layout

```
/forty-five.layout create a sidebar layout with:
- Logo linked to homepage
- Menu items: Dashboard, Users, Settings, Analytics
- Theme switcher
- Burger menu for mobile
```

Claude will generate a complete layout with proper structure.

### 2. Create the Users Table

```
/forty-five.components create a users table with columns:
- ID
- Avatar (image)
- Name
- Email
- Role (badge with colors)
- Status (active/inactive with badges)
- Actions (view, edit, delete buttons with icons)

Use slot-based table structure
```

Claude will create a table with all MoonShine components properly integrated.

### 3. Add a Form Modal

```
/forty-five.components create a modal for adding new users with fields:
- Name (text input)
- Email (email input)
- Role (select: Admin, Editor, User)
- Status (toggle: Active/Inactive)
- Submit and Cancel buttons
```

### 4. Create a Custom Palette

```
/forty-five.palettes create a professional blue palette with hue 240 for the admin panel
```

Claude will generate a complete color palette with both light and dark themes!

## Understanding the Guidelines

The `.guidelines/` directory contains comprehensive documentation:

### `blade-components.md`

Complete reference for all MoonShine Blade components:
- Layout components (Sidebar, TopBar, Wrapper, etc.)
- Interface components (Table, Form, Card, Modal, etc.)
- Navigation components (Menu, Burger, Logo, etc.)
- Form components (Input, Select, Checkbox, etc.)
- Display components (Badge, Alert, Icon, etc.)

Each component includes:
- Purpose and usage
- Required attributes
- Optional parameters
- Code examples
- Best practices
- Common mistakes to avoid

### `palettes.md`

Color system and theme customization:
- Default color palettes
- Creating custom palettes
- Theme configuration
- Color usage guidelines

## Tips for Best Results

### 1. Be Specific

❌ Bad: "create a table"
✅ Good: "create a users table with name, email, status badge, and action buttons"

### 2. Mention Components

❌ Bad: "make it look nice"
✅ Good: "use badges for status, icons for buttons, and a modal for the form"

### 3. Specify Structure

❌ Bad: "add some layout"
✅ Good: "use a sidebar layout with menu items and a grid with 4 columns for content"

### 4. Reference MoonShine Concepts

✅ "Use slot-based table with MoonShine badge components"
✅ "Add a burger menu for mobile responsiveness"
✅ "Include theme switcher in the sidebar"

## Troubleshooting

### Commands Not Showing Up

**Problem:** Can't see slash commands in Claude

**Solution:**
1. Restart Claude Code
2. Verify files exist: `ls .claude/commands/`
3. Check file permissions
4. Try typing `/` to see available commands

### Guidelines Not Being Followed

**Problem:** Generated code doesn't follow MoonShine patterns

**Solution:**
1. Verify `.guidelines/` directory exists
2. Check guidelines files are present
3. Be more specific in your prompts
4. Reference specific components by name

### "composer.json not found"

**Problem:** Can't initialize in directory

**Solution:**
- Run `forty-five init` in your Laravel project root
- Make sure you're in a MoonShine project

## Next Steps

1. **Explore the Guidelines**
   - Read `.guidelines/blade-components.md`
   - Understand available components
   - See examples and patterns

2. **Try Simple Commands**
   - Start with `/forty-five.components`
   - Create a simple table or form
   - Get familiar with the workflow

3. **Build Something Real**
   - Create a complete page
   - Use multiple commands
   - Iterate and refine

4. **Share Feedback**
   - Report issues on GitHub
   - Suggest improvements
   - Share your success stories

## Resources

- **Documentation**: [README.md](README.md)
- **GitHub**: https://github.com/moonshine-software/forty-five
- **MoonShine Docs**: https://moonshine-laravel.com
- **Issues**: https://github.com/moonshine-software/forty-five/issues

## Support

Need help?
- Check the [Troubleshooting](#troubleshooting) section
- Read the [README](README.md)
- Open an issue on GitHub
- Join the MoonShine community

---

Happy coding with Forty-Five! 🌙
