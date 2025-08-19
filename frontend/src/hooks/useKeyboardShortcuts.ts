import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = Boolean(event.ctrlKey) === Boolean(shortcut.ctrlKey);
        const metaMatches = Boolean(event.metaKey) === Boolean(shortcut.metaKey);
        const shiftMatches = Boolean(event.shiftKey) === Boolean(shortcut.shiftKey);
        const altMatches = Boolean(event.altKey) === Boolean(shortcut.altKey);

        if (keyMatches && ctrlMatches && metaMatches && shiftMatches && altMatches) {
          event.preventDefault();
          shortcut.callback();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);
};

// Common shortcuts
export const commonShortcuts = {
  search: {
    key: 'k',
    metaKey: true,
    description: 'Open search'
  },
  help: {
    key: '?',
    shiftKey: true,
    description: 'Show help'
  },
  escape: {
    key: 'Escape',
    description: 'Close modal/menu'
  }
};