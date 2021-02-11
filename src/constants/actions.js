const Moves = require('./moves');

/**
 * Enum of all possible actions in the game (including moves).
 *
 * @type {Readonly<{Down: string, Left: string, Right: string, Up: string, Exit: string}>}
 */
module.exports = Object.freeze({
  ...Moves,
  Exit: 'exit',
});
