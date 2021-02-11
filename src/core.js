const { applyMoveToField, generateNewField, isPuzzleSolved } = require('./field');
const Actions = require('./constants/actions');
const Moves = require('./constants/moves');

/**
 * Launches the game.
 *
 * @param input
 * @param output
 * @returns {Promise<void>}
 */
module.exports.launchGame = async ({ input, output }) => {
  let field = generateNewField();

  while (!isPuzzleSolved(field)) {
    output.drawField(field);
    output.askForInput();
    const action = await input.readInput();

    if (Object.values(Moves).includes(action)) {
      applyMoveToField(field, action);
    } else if (action === Actions.Exit) {
      process.exit();
    }
  }

  output.drawField(field);
  output.drawWiningState();

  process.exit();
};
