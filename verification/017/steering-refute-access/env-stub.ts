const values: Record<string, string> = { NODE_ENV: 'production' };
export const env = new Proxy(values, { get: (t, k: string) => (k in t ? t[k] : 'dummy-value') });
