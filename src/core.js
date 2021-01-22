const { applyMoveToField, generateNewField, isPuzzleSolved } = require('./field');
const Actions = require('./constants/actions');

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

    if (action === Actions.Exit) {
      process.exit();
    } else {
      applyMoveToField(field, action);
    }
  }

  output.drawField(field);
  output.drawWiningState();

  process.exit();
};
