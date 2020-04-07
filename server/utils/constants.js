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
    ADVENTURER_WITH_MAP_ONLY: ['currentMap'],
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
  game: {
    VISION_RANGE: 6,
    MOVEMENTS: ['UP', 'DOWN', 'LEFT', 'RIGHT'],
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
  },
  paths: {
    MAPS: `${process.cwd()}/server/game/maps/`,
  },
  cachePaths: {
    ACTIVE_MAPS: 'ACTIVE_MAPS',
    QUEUE_TO_CONNECT_ADVENTURERS: 'QUEUE_TO_CONNECT_ADVENTURERS',
    CONNECTED_ADVENTURERS: 'CONNECTED_ADVENTURERS',
    MAP_PREFIX: 'MAP-',
    ADVENTURER_PREFIX: 'ADVENTURER-',
    ADVENTURER_MANUAL_ACTIONS_PREFIX: 'ADVENTURER_MANUAL-',
  },
  cacheTtls: {
    ACTIVE_MAPS: 0,
    QUEUE_TO_CONNECT_ADVENTURERS: 0,
    CONNECTED_ADVENTURERS: 0,
    MAP: 0,
    ADVENTURER: 0,
    ADVENTURER_MANUAL_ACTIONS: 10,
  },
  sockets: {
    CONNECT: 'connect',
    CONNECTED: 'connected',
    DISCONNECT: 'disconnect',
    GAME_METADATA: 'game_metadata',
    ADVENTURER_MOVE: 'adventurer_move',
  },
  engine: {
    TICK_RATE: 60,
    UPDATE_DATABASE_INTERVAL: 10000,
  },
};
