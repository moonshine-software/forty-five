#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { packageJson } from './utils/package.js';

const program = new Command();

program
  .name('forty-five')
  .description('AI-powered development toolkit for MoonShine - inspired by GitHub Speckit')
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize Forty-Five in your MoonShine project')
  .action(initCommand);

program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
