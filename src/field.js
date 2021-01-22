const Actions = require('./constants/actions');

/**
 * Checks if the puzzle was solved
 *
 * @param field {Array<Array<string|null>>}
 * @returns {boolean}
 */
function isPuzzleSolved(field) {
  for (let row = 0; row < 4; row++) {
    for (let cell = 0; cell < 4; cell++) {
      if (field[row][cell] !== (row * 4 + cell + 1).toString() && (row !== 3 || cell !== 3)) {
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
  } else if (action === Actions.Down && emptyRow < 3) {
    targetNeighborCellCoordinates = [emptyRow + 1, emptyCell];
  } else if (action === Actions.Left && emptyCell > 0) {
    targetNeighborCellCoordinates = [emptyRow, emptyCell - 1];
  } else if (action === Actions.Right && emptyCell < 3) {
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
  const values = Array.from(Array(15), (_, i) => (i + 1).toString());
  values.push(null);

  const popRandomValue = () => {
    const index = Math.floor(Math.random() * values.length);
    const value = values[index];
    values.splice(index, 1);
    return value;
  };

  return Array.from(Array(4), () => Array.from(Array(4), popRandomValue));
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
