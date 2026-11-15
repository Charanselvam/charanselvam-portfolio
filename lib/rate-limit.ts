interface Window {
  timestamps: number[];
}

const store = new Map<string, Window>();

function prune(w: Window, now: number, windowMs: number) {
  w.timestamps = w.timestamps.filter((t) => now - t < windowMs);
}

export function checkRateLimit(
  key: string,
  opts: { windowMs: number; max: number }
): boolean {
  const now = Date.now();
  const w = store.get(key) ?? { timestamps: [] };
  prune(w, now, opts.windowMs);
  if (w.timestamps.length >= opts.max) {
    store.set(key, w);
    return false;
  }
  w.timestamps.push(now);
  store.set(key, w);
  return true;
}
