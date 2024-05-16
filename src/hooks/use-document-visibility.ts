import { useMemo, useSyncExternalStore } from 'react';

type VisibilityState = 'hidden' | 'visible' | 'prerender' | undefined;

interface VisibilitySubscriber {
  (): void;
}

interface Unsubscribable {
  (): void;
}

abstract class VisibilityMonitor {
  abstract subscribe(callback: VisibilitySubscriber): Unsubscribable;
  abstract getSnapshot(): VisibilityState;
}

class DocumentVisibilityMonitor extends VisibilityMonitor {
  subscribe(callback: VisibilitySubscriber): Unsubscribable {
    document.addEventListener('visibilitychange', callback);

    return () => {
      document.removeEventListener('visibilitychange', callback);
    };
  }
  getSnapshot(): VisibilityState {
    return document.visibilityState;
  }
}

function useVisibilityMonitor(): VisibilityMonitor {
  return useMemo(() => new DocumentVisibilityMonitor(), []);
}

export function useDocumentVisibility(): VisibilityState {
  const monitor = useVisibilityMonitor();
  const visibility = useSyncExternalStore(monitor.subscribe, monitor.getSnapshot, monitor.getSnapshot);

  return visibility;
}
