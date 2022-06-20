export {};

import { v4 as uuidv4 } from 'uuid';

const { CONSTANTS } = require('./constants');

export interface User {
  id?: string;
  username?: string;
  age?: number;
  hobbies?: string[];
}

const usersMock: User[] = [];

const getAll = () => {
  const users = usersMock;
  return users;
};

const getById = (id: string) => {
  const user = usersMock.find((el) => el.id === id);
  if (!user) {
    throw new Error(CONSTANTS.MESSAGES.NOT_FOUND);
  }
  return user;
};

const create = (body: User) => {
  const user = { ...body, id: uuidv4() };
  usersMock.push(user);
  return user;
};

const update = (body: User, id: string) => {
  const index = usersMock.findIndex((el) => el.id === id);
  const user = usersMock[index];

  if (index === -1) {
    throw new Error(CONSTANTS.MESSAGES.NOT_FOUND);
  }

  usersMock[index] = { ...user, ...body };

  const updatedUser = usersMock.find((el) => el.id === id);
  return updatedUser;
};

const remove = (id: string) => {
  const index = usersMock.findIndex((el) => el.id === id);

  if (index === -1) {
    throw new Error(CONSTANTS.MESSAGES.NOT_FOUND);
  }

  usersMock.splice(index, 1);
};

const repository = {
  getAll,
  getById,
  create,
  update,
  remove,
};

module.exports = {
  repository,
};
