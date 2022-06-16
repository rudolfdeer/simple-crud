require('dotenv').config();
import http, { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
const { CONSTANTS } = require('./constants');
const { controller } = require('./controller');

const serverConfig = {
  port: process.env.SERVER_PORT || 3000,
};
class Server {
  client: http.Server;

  constructor() {
    this.client = http.createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        if (req.url == '/api/users' && req.method == 'GET') {
          try {
            await controller.getAll(res);
          } catch (err) {
            res.writeHead(CONSTANTS.CODE_STATUSES.SERVER_ERROR);
            res.end((err as Error).message);
          }
        } else if (
          req.url?.match(/api[\/]users[\/][a-zA-Z0-9-]{1,}[^\/]$/) &&
          req.method == 'GET'
        ) {
          const id = req.url.split('/')[3];
          if (!uuidValidate(id)) {
            res.writeHead(CONSTANTS.CODE_STATUSES.INVALID);
            res.end(CONSTANTS.MESSAGES.INVALID_ID);
          }

          try {
            await controller.getById(res, id);
          } catch (err) {
            res.writeHead(CONSTANTS.CODE_STATUSES.SERVER_ERROR);
            res.end((err as Error).message);
          }
        } else if (req.url == '/api/users' && req.method == 'POST') {
          let data = '';
          req
            .on('data', (chunk) => {
              data += chunk;
            })
            .on('end', async () => {
              try {
                const body = JSON.parse(data);
                await controller.create(res, body);
              } catch (err) {
                res.writeHead(CONSTANTS.CODE_STATUSES.SERVER_ERROR);
                res.end((err as Error).message);
              }
            });
        } else if (
          req.url?.match(/api[\/]users[\/][a-zA-Z0-9-]{1,}[^\/]$/) &&
          req.method == 'PUT'
        ) {
          const id = req.url.split('/')[3];
          if (!uuidValidate(id)) {
            res.writeHead(CONSTANTS.CODE_STATUSES.INVALID);
            res.end(CONSTANTS.MESSAGES.INVALID_ID);
          }

          let data = '';
          req
            .on('data', (chunk) => {
              data += chunk;
            })
            .on('end', async () => {
              try {
                const body = JSON.parse(data);
                await controller.update(res, body, id);
              } catch (err) {
                res.writeHead(CONSTANTS.CODE_STATUSES.SERVER_ERROR);
                res.end((err as Error).message);
              }
            });
        } else if (
          req.url?.match(/api[\/]users[\/][a-zA-Z0-9-]{1,}[^\/]$/) &&
          req.method == 'DELETE'
        ) {
          const id = req.url.split('/')[3];
          if (!uuidValidate(id)) {
            res.writeHead(CONSTANTS.CODE_STATUSES.INVALID);
            res.end(CONSTANTS.MESSAGES.INVALID_ID);
          }

          try {
            await controller.remove(res, id);
          } catch (err) {
            res.writeHead(CONSTANTS.CODE_STATUSES.SERVER_ERROR);
            res.end((err as Error).message);
          }
        } else {
          res.writeHead(CONSTANTS.CODE_STATUSES.NOT_FOUND);
          res.end(CONSTANTS.MESSAGES.INVALID_ENDPOINT);
        }
      }
    );
  }

  async listen() {
    try {
      this.client.listen(serverConfig.port, () =>
        console.log(
          `🚀 server started at: http://localhost:${serverConfig.port}`
        )
      );
    } catch (err) {
      console.log(`server error: ${err}`);
    }
  }
}

class App {
  server: Server;

  constructor() {
    this.server = new Server();
  }

  start() {
    this.server.listen();
  }
}

const app = new App();
app.start();

export default app;