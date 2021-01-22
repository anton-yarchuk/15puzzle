const keypress = require('keypress');

const Actions = require('../constants/actions');

/**
 * Mapping between keys name and MoveDirections
 *
 * @type {Readonly<{left: string, up: string, right: string, down: string}>}
 * @returns {void}
 */
const keyMapping = Object.freeze({
  up: Actions.Up,
  down: Actions.Down,
  right: Actions.Right,
  left: Actions.Left,
});

/**
 * Draws a playing field to the console.
 *
 * @param field {Array<Array<string|null>>}
 */
module.exports.drawField = (field) => {
  console.clear();

  field.forEach((row) => {
    console.log(row.map((it) => (it || '__').padStart(4)).join());
  });
};

/**
 * Asks an user to make a move using console.
 */
module.exports.askForInput = () => {
  console.log('Use your key arrows to make a move!');
};

/**
 * Reads pressed keys from the STDIN and converts them to valid Action.
 * Reacts to arrow keys, Ctrl+C and ESC.
 *
 * @returns {Promise<Actions>}
 */
module.exports.readInput = async () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  keypress(stdin);

  return new Promise((resolve) => {
    const onKeyPress = (ch, key) => {
      if (key) {
        // Ctrl+C or ESC should close the game
        if ((key.ctrl && key.name === 'c') || key.name === 'escape') {
          stdin.removeListener('keypress', onKeyPress);
          stdin.setRawMode(false);
          resolve(Actions.Exit);
        }

        // If arrow keys were pushed
        if (Object.keys(keyMapping).includes(key.name)) {
          stdin.removeListener('keypress', onKeyPress);
          stdin.setRawMode(false);
          resolve(keyMapping[key.name]);
        }
      }
    };
    stdin.on('keypress', onKeyPress);
  });
};

/**
 * Draws a winning message to the console.
 */
module.exports.drawWiningState = () => {
  console.log('You won!');
};
