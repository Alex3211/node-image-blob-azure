// tslint:disable:no-console

import * as debug from 'debug';
import * as http from 'http';
import Server from './server';
import utils from './utils/Utils';
require('dotenv').config();

debug('ts-express:server');

const port = normalizePort(utils.getPort());
Server.set('port', port);

console.log(`${utils.newDate()}: Server listening on port ${port}`);

const server = http.createServer(Server);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
  const Port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(Port)) { return val; } else if (Port >= 0) { return Port; } else { return false; }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') { throw error; }
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${utils.newDate()}: ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${utils.newDate()}: ${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}