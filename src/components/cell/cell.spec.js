import Cell from './index'

let testCell = null

beforeAll(() => {
  testCell = new Cell({x:0, y:0})
});

describe('cell', () => {
  it('has a location', () => {
    expect(testCell.x).toEqual(0);
    expect(testCell.y).toEqual(0);
  });

  it('it is alive', () => {
    expect(testCell.alive).toEqual(true);
  });
});