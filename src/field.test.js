const _ = require('lodash');
const { generateNewField, applyMoveToField, isPuzzleSolved } = require('./field');
const Actions = require('./constants/actions');

require('chai').should();

describe('Puzzle Field', function () {
  describe('Generating new field', function () {
    let field;

    before(function () {
      field = generateNewField();
    });

    it('should generate nested array', function () {
      field.should.be.an('array');
      field.every((row) => row.should.be.an('array'));
    });

    it('should generate filed with correct size', function () {
      field.should.have.lengthOf(4);
      field.every((row) => row.should.have.lengthOf(4));
    });

    it('should contain values from 1 to 15 and null', function () {
      const expectedValues = Array.from(Array(15), (_, i) => (i + 1).toString());
      expectedValues.push(null);

      field.flat().should.have.members(expectedValues);
    });

    it('should be different every time', function () {
      const anotherField = generateNewField();

      field.should.not.deep.equal(anotherField);
    });
  });

  describe('Solved puzzle checker', function () {
    it('Correct field shape should be considered as solved', function () {
      isPuzzleSolved([
        ['1', '2', '3', '4'],
        ['5', '6', '7', '8'],
        ['9', '10', '11', '12'],
        ['13', '14', '15', null],
      ]).should.be.true;
    });

    it('Wrong order of items should be considered as wrong', function () {
      isPuzzleSolved([
        ['1', '2', '3', '4'],
        ['6', '5', '7', '8'],
        ['9', '10', '11', '12'],
        ['13', '14', '15', null],
      ]).should.be.false;
    });

    it('Wrong placement of an empty cell should be considered as wrong', function () {
      isPuzzleSolved([
        [null, '1', '2', '3'],
        ['4', '5', '6', '7'],
        ['8', '9', '10', '11'],
        ['12', '13', '14', '15'],
      ]).should.be.false;

      isPuzzleSolved([
        ['1', '2', '3', '4'],
        ['6', '5', '7', '8'],
        ['9', '10', '11', '12'],
        [null, '13', '14', '15'],
      ]).should.be.false;
    });
  });

  describe('Applying the user move to the field', function () {
    // applyMoveToField
    describe('Valid user moves should work properly', function () {
      let field;

      beforeEach(function () {
        field = [
          ['4', '3', '2', '1'],
          ['6', '5', '7', '8'],
          ['9', '10', null, '12'],
          ['13', '14', '15', '11'],
        ];
      });

      it('Move up should change field accordingly', function () {
        applyMoveToField(field, Actions.Up);
        field.should.deep.equal([
          ['4', '3', '2', '1'],
          ['6', '5', null, '8'],
          ['9', '10', '7', '12'],
          ['13', '14', '15', '11'],
        ]);
      });

      it('Move down should change field accordingly', function () {
        applyMoveToField(field, Actions.Down);
        field.should.deep.equal([
          ['4', '3', '2', '1'],
          ['6', '5', '7', '8'],
          ['9', '10', '15', '12'],
          ['13', '14', null, '11'],
        ]);
      });

      it('Move right should change field accordingly', function () {
        applyMoveToField(field, Actions.Right);
        field.should.deep.equal([
          ['4', '3', '2', '1'],
          ['6', '5', '7', '8'],
          ['9', '10', '12', null],
          ['13', '14', '15', '11'],
        ]);
      });

      it('Move left should change field accordingly', function () {
        applyMoveToField(field, Actions.Left);
        field.should.deep.equal([
          ['4', '3', '2', '1'],
          ['6', '5', '7', '8'],
          ['9', null, '10', '12'],
          ['13', '14', '15', '11'],
        ]);
      });
    });

    describe('Impossible moves', function () {
      it('Impossible move Up should not change the field', function () {
        const field = [
          ['4', null, '2', '1'],
          ['6', '5', '7', '8'],
          ['9', '3', '10', '12'],
          ['13', '14', '15', '11'],
        ];
        const newField = _.cloneDeep(field);

        applyMoveToField(newField, Actions.Up);

        field.should.deep.equal(newField);
      });

      it('Impossible move Down should not change the field', function () {
        const field = [
          ['4', '14', '2', '1'],
          ['6', '5', '7', '8'],
          ['9', '3', '10', '12'],
          ['13', null, '15', '11'],
        ];
        const newField = _.cloneDeep(field);

        applyMoveToField(newField, Actions.Down);

        field.should.deep.equal(newField);
      });

      it('Impossible move Right should not change the field', function () {
        const field = [
          ['4', '14', '2', '1'],
          ['6', '5', '7', '8'],
          ['9', '3', '10', '12'],
          ['13', '11', '15', null],
        ];
        const newField = _.cloneDeep(field);

        applyMoveToField(newField, Actions.Right);

        field.should.deep.equal(newField);
      });

      it('Impossible move Left should not change the field', function () {
        const field = [
          ['4', '14', '2', '1'],
          ['6', '5', '7', '8'],
          ['9', '3', '10', '12'],
          [null, '11', '15', '13'],
        ];
        const newField = _.cloneDeep(field);

        applyMoveToField(newField, Actions.Left);

        field.should.deep.equal(newField);
      });
    });
  });
});
