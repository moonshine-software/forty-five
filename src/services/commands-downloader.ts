import { writeFileSync } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import type { InitConfig, DownloadResult } from '../types/index.js';
import { getAgentConfig } from '../agents.js';

const REPO_BASE_URL = 'https://raw.githubusercontent.com/moonshine-software/forty-five/main';

// List of command files to download
const COMMAND_FILES = [
  'forty-five.components.md',
  'forty-five.layout.md',
  'forty-five.palettes.md',
  'forty-five.field.md',
  'forty-five.component.md',
];

export async function downloadCommands(config: InitConfig): Promise<DownloadResult> {
  const agentConfig = getAgentConfig(config.agent);
  const commandsDir = join(config.projectPath, agentConfig.configDir, 'commands');

  const errors: string[] = [];
  let filesDownloaded = 0;

  for (const fileName of COMMAND_FILES) {
    try {
      const url = `${REPO_BASE_URL}/commands/${fileName}`;
      const response = await fetch(url);

      if (!response.ok) {
        errors.push(`Failed to download ${fileName}: ${response.statusText}`);
        continue;
      }

      const content = await response.text();
      const filePath = join(commandsDir, fileName);

      writeFileSync(filePath, content, 'utf-8');
      filesDownloaded++;
    } catch (error) {
      errors.push(`Failed to download ${fileName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return {
    success: errors.length === 0,
    filesDownloaded,
    errors,
  };
}
