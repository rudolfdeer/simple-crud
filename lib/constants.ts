export {};

const CODE_STATUSES = {
  OK: 200,
  SERVER_ERROR: 500,
  INVALID: 400,
  NOT_FOUND: 404,
  CREATED: 201,
  DELETED: 204,
};

const MESSAGES = {
  SERVER_ERROR: 'Server error.',
  INVALID_ID: 'Invalid user id (not uuid).',
  INVALID_BODY: 'Invalid body: does not contain required fields or their type is incorrent.',
  NOT_FOUND: 'Record with this id doesnt exist.',
  DELETED: 'Record is deleted.',
};

const CONSTANTS = {
  CODE_STATUSES,
  MESSAGES,
};

module.exports = {
  CONSTANTS,
};
