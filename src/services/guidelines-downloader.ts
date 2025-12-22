import { writeFileSync } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import type { InitConfig, DownloadResult, GuidelineFile } from '../types/index.js';

const REPO_BASE_URL = 'https://raw.githubusercontent.com/moonshine-software/forty-five/main';

// List of guideline files to download
const GUIDELINE_FILES = [
  'blade-components.md',
  'palettes.md',
  'fields-development.md',
  'components-development.md',
];

export async function downloadGuidelines(config: InitConfig): Promise<DownloadResult> {
  const guidelinesDir = join(config.projectPath, '.guidelines');

  const errors: string[] = [];
  let filesDownloaded = 0;

  for (const fileName of GUIDELINE_FILES) {
    try {
      const url = `${REPO_BASE_URL}/guidelines/${fileName}`;
      const response = await fetch(url);

      if (!response.ok) {
        errors.push(`Failed to download ${fileName}: ${response.statusText}`);
        continue;
      }

      const content = await response.text();
      const filePath = join(guidelinesDir, fileName);

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
