import http from 'http';

// A loopback S3 stub for plan 017's probes (M6-0, M5's local walk). It stores what is put, lists by prefix with
// LastModified, deletes in batch, serves objects over HTTP, and records every request it receives.
// failPut(key) -> true answers that PUT with a 500.
export function createS3Stub({ bucket = 'bucket', failPut = () => false } = {}) {
  const objects = new Map();
  const log = [];
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks);
      const url = new URL(req.url, 'http://stub');
      const path = decodeURIComponent(url.pathname);
      const entry = { method: req.method, path, query: Object.fromEntries(url.searchParams) };
      const xml = (status, text) => {
        res.writeHead(status, { 'Content-Type': 'application/xml' });
        res.end(text);
      };
      if (req.method === 'PUT' && path.startsWith(`/${bucket}/`)) {
        const key = path.slice(bucket.length + 2);
        if (failPut(key)) {
          log.push({ ...entry, kind: 'put', key, status: 500 });
          xml(500, '<Error><Code>InternalError</Code><Message>stub</Message></Error>');
          return;
        }
        objects.set(key, { body, type: req.headers['content-type'], acl: req.headers['x-amz-acl'], lastModified: new Date() });
        log.push({ ...entry, kind: 'put', key, type: req.headers['content-type'], acl: req.headers['x-amz-acl'], bytes: body.length, status: 200 });
        res.writeHead(200, { ETag: '"stub"' });
        res.end();
        return;
      }
      if (req.method === 'GET' && (path === `/${bucket}` || path === `/${bucket}/`) && !url.searchParams.has('delete')) {
        const prefix = url.searchParams.get('prefix') ?? '';
        log.push({ ...entry, kind: 'list', prefix, status: 200 });
        const contents = [...objects].filter(([k]) => k.startsWith(prefix)).map(([k, o]) => `<Contents><Key>${k}</Key><LastModified>${o.lastModified.toISOString()}</LastModified><ETag>"stub"</ETag><Size>${o.body.length}</Size><StorageClass>STANDARD</StorageClass></Contents>`).join('');
        xml(200, `<?xml version="1.0" encoding="UTF-8"?><ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/"><Name>${bucket}</Name><Prefix>${prefix}</Prefix><Marker></Marker><MaxKeys>1000</MaxKeys><IsTruncated>false</IsTruncated>${contents}</ListBucketResult>`);
        return;
      }
      if (req.method === 'POST' && url.searchParams.has('delete')) {
        const keys = [...body.toString().matchAll(/<Key>([^<]*)<\/Key>/g)].map((m) => m[1]);
        keys.forEach((k) => objects.delete(k));
        log.push({ ...entry, kind: 'delete', keys, status: 200 });
        xml(200, `<?xml version="1.0" encoding="UTF-8"?><DeleteResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">${keys.map((k) => `<Deleted><Key>${k}</Key></Deleted>`).join('')}</DeleteResult>`);
        return;
      }
      if (req.method === 'GET' && path.startsWith(`/${bucket}/`)) {
        const key = path.slice(bucket.length + 2);
        const obj = objects.get(key);
        log.push({ ...entry, kind: 'get', key, status: obj ? 200 : 404 });
        if (!obj) { xml(404, '<Error><Code>NoSuchKey</Code></Error>'); return; }
        res.writeHead(200, { 'Content-Type': obj.type ?? 'application/octet-stream' });
        res.end(obj.body);
        return;
      }
      log.push({ ...entry, kind: 'other', status: 400 });
      xml(400, '<Error><Code>NotImplemented</Code></Error>');
    });
  });
  return {
    objects,
    log,
    listen: (port = 0) => new Promise((resolve) => { server.listen(port, '127.0.0.1', () => resolve(server.address().port)); }),
    close: () => new Promise((resolve) => { server.closeAllConnections?.(); server.close(resolve); }),
  };
}
