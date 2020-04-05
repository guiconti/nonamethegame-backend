module.exports = {
  messages: {
    error: {
      UNAUTHORIZED: 'You need to sign in to access this feature.',
      INVALID_ID: 'The id sent is invalid.',
      UNIQUE_CONSTRAINT: 'Data sent is violating a unique constraint.',
      INVALID_JSON: 'Data sent is an invalid json.',
      DOCUMENT_NOT_FOUND: 'No data found.',
      INVALID_SELECTED_ADVENTURER:
        'You need to select an adventurer to use this feature.',
      UNEXPECTED_RUNNING:
        'An unexpected error occurred while processing your request.',
    },
  },
  error: {
    name: {
      DOCUMENT_NOT_FOUND_ERROR: 'DocumentNotFoundError',
      VALIDATION_ERROR: 'ValidationError',
      NOT_FOUND: 'NotFoundError',
      INVALID_AUTH: 'InvalidAuthError',
      INVALID_SESSION: 'InvalidSessionError',
      INVALID_ID: 'InvalidId',
      INVALID_SELECTED_ADVENTURER: 'InvalidSelectedAdventurer',
    },
    code: {
      UNIQUE_CONSTRAINT: 11000,
    },
    type: {
      PARSING_FAILED: 'entity.parse.failed',
    },
  },
  values: {
    cryptography: {
      PASSWORD_KEY: process.env.PASSWORD_KEY,
      TOKEN_KEY: process.env.TOKEN_KEY,
      SESSION_SIGNATURE_KEY: process.env.SESSION_SIGNATURE_KEY,
    },
    cookies: {
      SESSION: 'session',
    },
    CLASSES: ['Swordsman', 'Mage', 'Thief'],
    RACES: ['Human', 'Lizard', 'Undead', 'Dwarf', 'Elf'],
    ATTRIBUTES: [
      'strength',
      'intelligence',
      'agility',
      'dexterity',
      'vitality',
    ],
  },
  endpoints: {
    RETRIEVE_ADVENTURER_MAP: '/',
    RETRIEVE_MAP: '/:id',
    CONNECT: '/connect',
  },
  tables: {
    USERS: 'Users',
    ADVENTURERS: 'Adventurers',
    MAPS: 'Maps',
  },
  selections: {
    USER_WITH_PROFILE_DATA: ['_id', 'email', 'selectedAdventurer'],
  },
  populationsPath: {
    ADD_MAP_TO_ADVENTURER: [
      '/v1/map',
      '/v1/map/',
      '/v1/game/connect',
      '/v1/game/connect/',
    ],
  },
  populations: {
    GET_ADVENTURER_MAP_TO_USER: {
      path: 'selectedAdventurer',
      select: ['currentMap'],
    },
    EMPTY: {
      path: '',
      select: [],
    },
  },
  tiles: {
    GROUND: 'G',
    WALL: 'W',
    PORTAL: 'P',
    NPC: 'N',
  },
  paths: {
    MAPS: `${process.cwd()}/server/game/maps/`,
  },
  cachePaths: {
    CONNECTED_ADVENTURERS: 'CONNECTED_ADVENTURERS',
    MAP_PREFIX: 'map-',
  },
  cacheTtls: {
    CONNECTED_ADVENTURERS: 0,
    MAP: 0,
  },
  sockets: {
    CONNECT: 'connect',
  },
};