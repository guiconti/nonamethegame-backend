const express = require('express');
const retrieveControllers = require('../../../utils/retrieveControllers');
const retrieveSchemas = require('../../../utils/retrieveSchemas');
const { endpoints } = require('../../../constants');
const userMiddleware = require('../../../middlewares/userMiddleware');

const router = express.Router();

const controllers = retrieveControllers(
  __filename.split('/routers')[1].split('.')[0]
);
const schemas = retrieveSchemas(__filename.split('/routers')[1].split('.')[0]);

router.get(
  endpoints.RETRIEVE_MAP,
  schemas.retrieveMap,
  userMiddleware,
  controllers.retrieveMap
);

module.exports = router;
