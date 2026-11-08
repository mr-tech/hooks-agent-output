// QA observer for M8-b (chain 015). Loaded into the generator with `node -r`. Every outbound TCP connect the process
// starts is written to stderr as one `OBS connect <host>:<port>` line, before the connect is attempted. The rig points
// CDN_ENDPOINT (S3) at 127.0.0.1:1, so a connect to port 1 is an S3 call attempted by that request.
const net = require('net');
const orig = net.Socket.prototype.connect;
net.Socket.prototype.connect = function connect(...args) {
  let port; let host;
  const a = args[0];
  if (Array.isArray(a)) { [{ port, host }] = [a[0] || {}]; } else if (a && typeof a === 'object') { ({ port, host } = a); } else { [port, host] = args; }
  if (port !== undefined) process.stderr.write(`OBS connect ${host || 'localhost'}:${port}\n`);
  return orig.apply(this, args);
};
