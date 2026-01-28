export type Agent = 'claude' | 'cursor' | 'github-copilot';

export interface InitConfig {
  agent: Agent;
  projectPath: string;
}

export interface DownloadResult {
  success: boolean;
  filesDownloaded: number;
  errors: string[];
}

export interface CommandFile {
  name: string;
  path: string;
  content: string;
}

export interface GuidelineFile {
  name: string;
  path: string;
  content: string;
}

export interface SkillFile {
  name: string;
  path: string;
  content: string;
}
