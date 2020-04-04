const joi = require('@hapi/joi');
const mongoose = require('mongoose');
const { InvalidId } = require('../../../utils/errors');

const schema = joi.object().keys({
  id: joi
    .string()
    .custom(value => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new InvalidId();
      }
      return value;
    })
    .required(),
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (!error) {
    return next();
  }
  return next(error);
};
