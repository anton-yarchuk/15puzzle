const Actions = require('./constants/actions');
const { fieldSize } = require('./constants/field');

/**
 * Checks if the puzzle was solved
 *
 * @param field {Array<Array<string|null>>}
 * @returns {boolean}
 */
function isPuzzleSolved(field) {
  for (let row = 0; row < fieldSize; row++) {
    for (let cell = 0; cell < fieldSize; cell++) {
      if (
        field[row][cell] !== (row * fieldSize + cell + 1).toString() &&
        (row !== fieldSize - 1 || cell !== fieldSize - 1)
      ) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Mutates field according to the user's move.
 *
 * @param field {Array<Array<string|null>>}
 * @param action {Actions}
 */
function applyMoveToField(field, action) {
  const [emptyRow, emptyCell] = getEmptyCellCoordinates(field);

  let targetNeighborCellCoordinates;
  if (action === Actions.Up && emptyRow > 0) {
    targetNeighborCellCoordinates = [emptyRow - 1, emptyCell];
  } else if (action === Actions.Down && emptyRow < fieldSize - 1) {
    targetNeighborCellCoordinates = [emptyRow + 1, emptyCell];
  } else if (action === Actions.Left && emptyCell > 0) {
    targetNeighborCellCoordinates = [emptyRow, emptyCell - 1];
  } else if (action === Actions.Right && emptyCell < fieldSize - 1) {
    targetNeighborCellCoordinates = [emptyRow, emptyCell + 1];
  }

  if (targetNeighborCellCoordinates) {
    const [targetRow, targetCell] = targetNeighborCellCoordinates;
    field[emptyRow][emptyCell] = field[targetRow][targetCell];
    field[targetRow][targetCell] = null;
  }
}

/**
 * Generates new random playing field.
 *
 * @returns {Array<Array<string|null>>}
 */
function generateNewField() {
  // TODO: Improve field generating. Right now it, potentially, can generate unsolvable field
  const values = Array.from(Array(fieldSize ** 2 - 1), (_, i) => (i + 1).toString());
  values.push(null);

  const popRandomValue = () => {
    const index = Math.floor(Math.random() * values.length);
    const value = values[index];
    values.splice(index, 1);
    return value;
  };

  return Array.from(Array(fieldSize), () => Array.from(Array(fieldSize), popRandomValue));
}

/**
 * Finds coordinates of an empty cell on the field.
 *
 * @param field {Array<Array<string|null>>}
 * @returns {[number, number]} coordinates of an empty cell
 */
function getEmptyCellCoordinates(field) {
  for (const row of field) {
    let rowIndex = field.indexOf(row);
    for (const cell of row) {
      let cellIndex = row.indexOf(cell);
      if (!cell) return [rowIndex, cellIndex];
    }
  }
}

module.exports = {
  generateNewField,
  isPuzzleSolved,
  applyMoveToField,
};
