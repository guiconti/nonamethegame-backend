/**
 * Module to handle errors
 * @module middlewares/errorMiddleware
 */

/**
 * Handle all errors in our app. Must call next(err) on a controller to be used
 *
 */

const logger = require('javascript-custom-logger');
const { errors, messages, endpoints } = require('../constants');
// eslint-disable-next-line
module.exports = (err, req, res, next) => {
  switch (err.name) {
    case errors.name.VALIDATION_ERROR:
      return res.status(400).json({
        data: err.details[0].message,
      });
    case errors.name.DOCUMENT_NOT_FOUND_ERROR:
      switch (req.route.path) {
        case endpoints.RETRIEVE_ADVENTURERS:
          return res.status(200).json({
            data: []
          });
        default:
          return res.status(404).json({
            data: messages.error.DOCUMENT_NOT_FOUND
          });
      }
    case errors.name.INVALID_SESSION:
      return res.status(403).json({
        data: messages.error.UNAUTHORIZED,
      });
    case errors.name.INVALID_CLASS:
      return res.status(400).json({
        data: messages.error.INVALID_CLASS,
      });
    case errors.name.INVALID_RACE:
      return res.status(400).json({
        data: messages.error.INVALID_RACE,
      });
    case errors.name.INVALID_GENDER:
      return res.status(400).json({
        data: messages.error.INVALID_GENDER,
      });
    case errors.name.INVALID_ATTRIBUTES:
      return res.status(400).json({
        data: messages.error.INVALID_ATTRIBUTES,
      });
    case errors.name.INVALID_ID:
      return res.status(400).json({
        data: messages.error.INVALID_ID,
      });
    case errors.name.INVALID_SELECTED_ADVENTURER:
      return res.status(400).json({
        data: messages.error.INVALID_SELECTED_ADVENTURER,
      });
    default:
      break;
  }
  switch (err.code) {
    case errors.code.UNIQUE_CONSTRAINT:
      return res.status(409).json({
        data: messages.error.UNIQUE_CONSTRAINT,
      });
    default:
      break;
  }
  switch (err.type) {
    case errors.type.PARSING_FAILED:
      return res.status(400).json({
        data: messages.error.INVALID_JSON,
      });
    default:
      break;
  }
  logger.error(err);
  return res.status(500).json({
    data: messages.error.UNEXPECTED_RUNNING,
  });
};
