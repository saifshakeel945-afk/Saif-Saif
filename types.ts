
export type AppView = 'landing' | 'video' | 'image' | 'voice' | 'search';

export interface GeneratedAsset {
  id: string;
  type: 'video' | 'image' | 'audio';
  url: string;
  prompt: string;
  timestamp: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}

/**
 * AIStudio interface used for API key management in Veo and Pro models.
 */
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    // Ensure aistudio property uses the named AIStudio interface and matches expected global modifiers.
    readonly aistudio: AIStudio;
  }
}