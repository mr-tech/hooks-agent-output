// Preload: removes http.Server.prototype.closeIdleConnections, the shape of a Node runtime before 18.2.
delete require('http').Server.prototype.closeIdleConnections;
