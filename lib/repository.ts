export {};

import { v4 as uuidv4 } from 'uuid';

const { CONSTANTS } = require('./constants');

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
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

const repository = {
  getAll,
  getById,
  create,
};

module.exports = {
  repository,
};
