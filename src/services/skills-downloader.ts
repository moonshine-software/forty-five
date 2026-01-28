import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import type { InitConfig, DownloadResult } from '../types/index.js';

const REPO_BASE_URL = 'https://raw.githubusercontent.com/moonshine-software/forty-five/main';

// List of skill directories to download (each contains SKILL.md)
const SKILL_NAMES = [
  'moonshine-components',
  'moonshine-layout',
  'moonshine-palettes',
  'moonshine-field',
  'moonshine-component',
];

export async function downloadSkills(config: InitConfig): Promise<DownloadResult> {
  const agentDir = config.agent === 'claude' ? '.claude' : `.${config.agent}`;
  const skillsDir = join(config.projectPath, agentDir, 'skills');

  const errors: string[] = [];
  let filesDownloaded = 0;

  for (const skillName of SKILL_NAMES) {
    try {
      // Create skill directory
      const skillDir = join(skillsDir, skillName);
      if (!existsSync(skillDir)) {
        mkdirSync(skillDir, { recursive: true });
      }

      // Download SKILL.md
      const url = `${REPO_BASE_URL}/skills/${skillName}/SKILL.md`;
      const response = await fetch(url);

      if (!response.ok) {
        errors.push(`Failed to download ${skillName}/SKILL.md: ${response.statusText}`);
        continue;
      }

      const content = await response.text();
      const filePath = join(skillDir, 'SKILL.md');

      writeFileSync(filePath, content, 'utf-8');
      filesDownloaded++;
    } catch (error) {
      errors.push(`Failed to download ${skillName}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  return {
    success: errors.length === 0,
    filesDownloaded,
    errors,
  };
}
