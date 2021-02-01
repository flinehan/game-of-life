import Cell from './index'

let testCell = null

beforeAll(() => {
  testCell = new Cell({x:0, y:0})
});

describe('cell', () => {
  it('has a location', () => {
    const test = new Cell({x:1, y:1})
    expect(test.x).toEqual(1);
    expect(test.y).toEqual(1);
  });
});