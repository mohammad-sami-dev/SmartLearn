// Type definitions for Jitsi Meet External API
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export interface JitsiMeetConfig {
  roomName: string;
  width?: string | number;
  height?: string | number;
  parentNode?: HTMLElement | null;
  userInfo?: {
    displayName?: string;
    email?: string;
  };
  configOverwrite?: {
    startWithAudioMuted?: boolean;
    startWithVideoMuted?: boolean;
    prejoinPageEnabled?: boolean;
    enableWelcomePage?: boolean;
    enableClosePage?: boolean;
    disableDeepLinking?: boolean;
    [key: string]: any;
  };
  interfaceConfigOverwrite?: {
    TOOLBAR_BUTTONS?: string[];
    SHOW_JITSI_WATERMARK?: boolean;
    SHOW_WATERMARK_FOR_GUESTS?: boolean;
    [key: string]: any;
  };
}

export interface JitsiMeetAPI {
  executeCommand: (command: string, ...args: any[]) => void;
  addEventListener: (event: string, callback: (data?: any) => void) => void;
  removeEventListener: (event: string, callback: (data?: any) => void) => void;
  dispose: () => void;
}

export {};
