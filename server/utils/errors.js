const { errors } = require('../constants');

class NotFound extends Error {
  constructor(...args) {
    super(...args);
    this.name = errors.name.NOT_FOUND;
    Error.captureStackTrace(this, NotFound);
  }
}

class InvalidAuth extends Error {
  constructor(...args) {
    super(...args);
    this.name = errors.name.INVALID_AUTH;
    Error.captureStackTrace(this, InvalidAuth);
  }
}

class InvalidSession extends Error {
  constructor(...args) {
    super(...args);
    this.name = errors.name.INVALID_SESSION;
    Error.captureStackTrace(this, InvalidSession);
  }
}

class InvalidId extends Error {
  constructor(...args) {
    super(...args);
    this.name = errors.name.INVALID_ATTRIBUTES
    Error.captureStackTrace(this, InvalidId);
  }
}

class InvalidSelectAdventurer extends Error {
  constructor(...args) {
    super(...args);
    this.name = errors.name.INVALID_SELECTED_ADVENTURER
    Error.captureStackTrace(this, InvalidSelectAdventurer);
  }
}

module.exports = {
  NotFound,
  InvalidAuth,
  InvalidSession,
  InvalidId,
  InvalidSelectAdventurer,
};
