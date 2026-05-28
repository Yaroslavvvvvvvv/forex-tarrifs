const PREFIX = 'forex';

const buildKey = (key: string): string => `${PREFIX}_${key}`;

function safeParse<T>(raw: string | null): T | null {
  if (raw === null || raw === 'undefined') return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const storage = {
  get<T>(key: string): T | null {
    return safeParse<T>(localStorage.getItem(buildKey(key)));
  },
  set<T>(key: string, value: T): void {
    if (value === undefined) {
      localStorage.removeItem(buildKey(key));
      return;
    }
    localStorage.setItem(buildKey(key), JSON.stringify(value));
  },
  remove(key: string): void {
    localStorage.removeItem(buildKey(key));
  },
};
