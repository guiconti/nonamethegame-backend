module.exports = {
  messages: {
    error: {
      UNAUTHORIZED: 'You need to sign in to access this feature.',
      INVALID_ID: 'The id sent is invalid.',
      UNIQUE_CONSTRAINT: 'Data sent is violating a unique constraint.',
      INVALID_JSON: 'Data sent is an invalid json.',
      DOCUMENT_NOT_FOUND: 'No data found.',
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
    RETRIEVE_MAP: '/:id',
  },
  tables: {
    USERS: 'Users',
    ADVENTURERS: 'Adventurers',
    MAPS: 'Maps',
  },
  selections: {
    USER_WITH_PROFILE_DATA: ['_id', 'email', 'selectedAdventurer'],
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
};
