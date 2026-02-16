import { writeFileSync } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import type { InitConfig, DownloadResult } from '../types/index.js';

const REPO_RAW_URL = 'https://raw.githubusercontent.com/moonshine-software/forty-five/main';
const REPO_API_URL = 'https://api.github.com/repos/moonshine-software/forty-five/contents/guidelines';

interface GitHubContentItem {
  name: string;
  type: string;
  download_url: string | null;
}

async function fetchGuidelineFileList(): Promise<string[]> {
  const response = await fetch(REPO_API_URL, {
    headers: { 'Accept': 'application/vnd.github.v3+json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch guidelines list: ${response.statusText}`);
  }

  const items = (await response.json()) as GitHubContentItem[];

  return items
    .filter((item) => item.type === 'file' && item.name.endsWith('.md'))
    .map((item) => item.name);
}

export async function downloadGuidelines(config: InitConfig): Promise<DownloadResult> {
  const guidelinesDir = join(config.projectPath, '.guidelines');

  const errors: string[] = [];
  let filesDownloaded = 0;

  let fileNames: string[];
  try {
    fileNames = await fetchGuidelineFileList();
  } catch (error) {
    return {
      success: false,
      filesDownloaded: 0,
      errors: [`Failed to fetch guidelines list: ${error instanceof Error ? error.message : String(error)}`],
    };
  }

  for (const fileName of fileNames) {
    try {
      const url = `${REPO_RAW_URL}/guidelines/${fileName}`;
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
