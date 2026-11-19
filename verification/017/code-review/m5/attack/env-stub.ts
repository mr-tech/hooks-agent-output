const values: Record<string, string> = {
  NODE_ENV: 'production',
  CDN_BUCKET: 'bucket',
  CDN_ENDPOINT: 'http://127.0.0.1:39101',
  CDN_KEY: 'attack',
  CDN_SECRET: 'attack',
  PREVIEW_IMAGE_URL: 'http://127.0.0.1:39102/generate',
  PREVIEW_IMAGE_API_KEY: 'attack-key',
};
export const env = new Proxy(values, { get: (t, k: string) => (k in t ? t[k] : 'attack-stub') });
