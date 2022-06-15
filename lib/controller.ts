import { ServerResponse } from 'http';
import { ErrorCallback } from 'typescript';

const { service } = require('./service');
const { CONSTANTS } = require('./constants');

const getAll = async (res: ServerResponse) => {
  try {
    const response = await service.getAll();
    res.writeHead(CONSTANTS.CODE_STATUSES.OK, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(response));
  } catch (err) {
    res.writeHead(CONSTANTS.CODE_STATUSES.SERVER_ERROR);
  }
};

const getById = async (res: ServerResponse, id: string) => {
  try {
    const response = await service.getById(id);
    res.writeHead(CONSTANTS.CODE_STATUSES.OK, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(response));
  } catch (err) {
    res.writeHead(CONSTANTS.CODE_STATUSES.NOT_FOUND);
    res.end((err as Error).message);
  }
};

const create = async (res: ServerResponse, body: any) => {
  try {
    const response = await service.create(body);
    res.writeHead(CONSTANTS.CODE_STATUSES.CREATED);
    res.end(JSON.stringify(response));
  } catch (err) {
    res.writeHead(CONSTANTS.CODE_STATUSES.INVALID);
    res.end((err as Error).message);
  }
};

const update = async (res: ServerResponse, body: any, id: string) => {
  try {
    const response = await service.update(body, id);
    res.writeHead(CONSTANTS.CODE_STATUSES.OK);
    res.end(JSON.stringify(response));
  } catch (err) {
    if ((err as Error).message === CONSTANTS.MESSAGES.NOT_FOUND) {
      res.writeHead(CONSTANTS.CODE_STATUSES.NOT_FOUND);
      res.end((err as Error).message);
    } else {
      res.writeHead(CONSTANTS.CODE_STATUSES.INVALID);
      res.end((err as Error).message);
    }
  }
};

const remove = async (res: ServerResponse, id: string) => {
  try {
    await service.remove(id);
    res.writeHead(CONSTANTS.CODE_STATUSES.DELETED);
    res.end();
  } catch (err) {
    res.writeHead(CONSTANTS.CODE_STATUSES.NOT_FOUND);
    res.end((err as Error).message);
  }
};

const controller = {
  getAll,
  getById,
  create,
  update,
  remove,
};

module.exports = {
  controller,
};
