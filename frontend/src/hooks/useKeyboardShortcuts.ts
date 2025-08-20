import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: (event: KeyboardEvent) => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach((shortcut) => {
        const {
          key,
          ctrlKey = false,
          metaKey = false,
          shiftKey = false,
          altKey = false,
          callback
        } = shortcut;

        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          event.ctrlKey === ctrlKey &&
          event.metaKey === metaKey &&
          event.shiftKey === shiftKey &&
          event.altKey === altKey
        ) {
          event.preventDefault();
          callback(event);
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};

// Common shortcuts
export const commonShortcuts = {
  search: {
    key: 'k',
    metaKey: true, // Cmd on Mac
    ctrlKey: false, // Will be handled by OS detection
    description: 'Open search'
  },
  help: {
    key: '?',
    shiftKey: true,
    description: 'Show help'
  },
  escape: {
    key: 'Escape',
    description: 'Close modal/dialog'
  }
};

// Detect OS for proper modifier key
if (typeof window !== 'undefined') {
  const isMac = window.navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  if (!isMac) {
    commonShortcuts.search.ctrlKey = true;
    commonShortcuts.search.metaKey = false;
  }
}