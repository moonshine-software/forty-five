import { writeFileSync } from 'fs';
import { join } from 'path';
import type { InitConfig } from '../types/index.js';

export async function createConfigFile(config: InitConfig): Promise<void> {
  const configContent = {
    version: '1.0.0',
    agent: config.agent,
    initialized: new Date().toISOString(),
  };

  const configPath = join(config.projectPath, '.forty-five.json');
  writeFileSync(configPath, JSON.stringify(configContent, null, 2), 'utf-8');
}
