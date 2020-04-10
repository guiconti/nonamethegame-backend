module.exports = {
  cryptography: {
    PASSWORD_KEY: process.env.PASSWORD_KEY,
    TOKEN_KEY: process.env.TOKEN_KEY,
    SESSION_SIGNATURE_KEY: process.env.SESSION_SIGNATURE_KEY,
  },
  cookies: {
    SESSION: 'session',
  },
  ONE_SECOND_IN_MILLISECONDS: 1000,
  ONE_MILLISECOND_IN_NANOSECONDS: 1000000,
  ONE_SECOND_IN_NANOSECONDS: 1000000000,
  CLASSES: ['Swordsman', 'Mage', 'Thief'],
  RACES: ['Human', 'Lizard', 'Undead', 'Dwarf', 'Elf'],
  ATTRIBUTES: ['strength', 'intelligence', 'agility', 'dexterity', 'vitality'],
};
