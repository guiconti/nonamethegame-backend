module.exports = {
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
  ATTRIBUTES: ['strength', 'intelligence', 'agility', 'dexterity', 'vitality'],
};
