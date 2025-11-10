import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { Agent, InitConfig } from '../types/index.js';
import { downloadCommands } from '../services/commands-downloader.js';
import { downloadGuidelines } from '../services/guidelines-downloader.js';

export async function initCommand() {
  console.log(chalk.cyan.bold('\n🌙 Forty-Five Initialization\n'));
  console.log(chalk.gray('Setting up AI-powered development toolkit for MoonShine\n'));

  // Check if we're in a valid project directory
  const cwd = process.cwd();
  if (!existsSync(join(cwd, 'composer.json'))) {
    console.log(chalk.red('❌ Error: composer.json not found. Please run this command in your Laravel/MoonShine project root.'));
    process.exit(1);
  }

  // Ask which agent the user is using
  const answers = await inquirer.prompt<{ agent: Agent }>([
    {
      type: 'list',
      name: 'agent',
      message: 'Which AI agent are you using?',
      choices: [
        {
          name: '🤖 Claude (claude.ai/code)',
          value: 'claude',
        },
        {
          name: '💬 Cursor (Coming soon)',
          value: 'cursor',
          disabled: true,
        },
        {
          name: '🐙 GitHub Copilot (Coming soon)',
          value: 'github-copilot',
          disabled: true,
        },
      ],
      default: 'claude',
    },
  ]);

  const config: InitConfig = {
    agent: answers.agent,
    projectPath: cwd,
  };

  console.log(chalk.gray(`\n📂 Project path: ${cwd}`));
  console.log(chalk.gray(`🤖 Selected agent: ${answers.agent}\n`));

  // Create directories
  const spinner = ora('Creating directories...').start();

  try {
    const agentDir = answers.agent === 'claude' ? '.claude' : `.${answers.agent}`;
    const commandsDir = join(cwd, agentDir, 'commands');
    const guidelinesDir = join(cwd, '.guidelines');

    if (!existsSync(commandsDir)) {
      mkdirSync(commandsDir, { recursive: true });
    }

    if (!existsSync(guidelinesDir)) {
      mkdirSync(guidelinesDir, { recursive: true });
    }

    spinner.succeed('Directories created');
  } catch (error) {
    spinner.fail('Failed to create directories');
    console.error(chalk.red(error));
    process.exit(1);
  }

  // Download commands
  spinner.start('Downloading Forty-Five commands...');

  try {
    const commandsResult = await downloadCommands(config);

    if (commandsResult.success) {
      spinner.succeed(`Downloaded ${commandsResult.filesDownloaded} commands`);
    } else {
      spinner.warn(`Downloaded ${commandsResult.filesDownloaded} commands with some errors`);
      if (commandsResult.errors.length > 0) {
        console.log(chalk.yellow('\nErrors:'));
        commandsResult.errors.forEach(err => console.log(chalk.yellow(`  - ${err}`)));
      }
    }
  } catch (error) {
    spinner.fail('Failed to download commands');
    console.error(chalk.red(error));
    process.exit(1);
  }

  // Download guidelines
  spinner.start('Downloading guidelines...');

  try {
    const guidelinesResult = await downloadGuidelines(config);

    if (guidelinesResult.success) {
      spinner.succeed(`Downloaded ${guidelinesResult.filesDownloaded} guidelines`);
    } else {
      spinner.warn(`Downloaded ${guidelinesResult.filesDownloaded} guidelines with some errors`);
      if (guidelinesResult.errors.length > 0) {
        console.log(chalk.yellow('\nErrors:'));
        guidelinesResult.errors.forEach(err => console.log(chalk.yellow(`  - ${err}`)));
      }
    }
  } catch (error) {
    spinner.fail('Failed to download guidelines');
    console.error(chalk.red(error));
    process.exit(1);
  }

  // Success message
  console.log(chalk.green.bold('\n✨ Forty-Five initialized successfully!\n'));
  console.log(chalk.cyan('Next steps:'));
  console.log(chalk.gray('  1. Open your project in Claude Code'));
  console.log(chalk.gray('  2. Use slash commands like:'));
  console.log(chalk.cyan('     /forty-five.components') + chalk.gray(' - Work with Blade components'));
  console.log(chalk.cyan('     /forty-five.layout') + chalk.gray(' - Create layouts'));
  console.log(chalk.cyan('     /forty-five.palettes') + chalk.gray(' - Create color palettes'));
  console.log(chalk.gray('\n  3. Example: ') + chalk.cyan('/forty-five.components create a user table with actions'));
  console.log();
}
