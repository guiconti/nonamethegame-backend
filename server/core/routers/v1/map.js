const express = require('express');
const retrieveControllers = require('../../../utils/retrieveControllers');
const { endpoints } = require('../../../constants');
const userMiddleware = require('../../../middlewares/userMiddleware');

const router = express.Router();

const controllers = retrieveControllers(
  __filename.split('/routers')[1].split('.')[0]
);

router.get(
  endpoints.RETRIEVE_ADVENTURER_MAP,
  userMiddleware,
  controllers.retrieveAdventurerMap
);

module.exports = router;
