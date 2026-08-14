import { useSyncExternalStore } from "react";

/**
 * Tiny in-memory pub/sub so admin edits re-render public pages in the same session.
 * Remove this module when the three data layers talk to Supabase (TanStack Query will replace it).
 */

let version = 0;
const listeners = new Set<() => void>();

export function emitCmsChange() {
  version += 1;
  listeners.forEach((listener) => listener());
}

export function subscribeCms(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCmsVersion() {
  return version;
}

export function useCms() {
  return useSyncExternalStore(subscribeCms, getCmsVersion, getCmsVersion);
}
