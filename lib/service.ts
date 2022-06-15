export {};

const { CONSTANTS } = require('./constants');
const { repository } = require('./repository');

const getAll = async () => {
  const response = await repository.getAll();
  return response;
};

const getById = async (id: string) => {
  const response = await repository.getById(id);
  return response;
};

const create = async (body: any) => {
  if (!body.username || typeof body.username !== 'string') {
    throw new Error(CONSTANTS.MESSAGES.INVALID_BODY);
  }

  if (!body.age || typeof body.age !== 'number') {
    throw new Error(CONSTANTS.MESSAGES.INVALID_BODY);
  }

  if (!body.hobbies || !Array.isArray(body.hobbies)) {
    throw new Error(CONSTANTS.MESSAGES.INVALID_BODY);
  }

  const response = await repository.create(body);
  return response;
};


const service = {
  getAll,
  getById,
  create
};

module.exports = {
  service,
};