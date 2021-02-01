import World from './index'
import Cell from '../cell'

let testWorld = null

beforeAll(() => {
  testWorld = new World({ rows: 2, cols: 2 })
});

describe('world', () => {

  it('creates a matrix for the world', () => {
    // rows
    expect(testWorld.matrix.length).toEqual(10);
    // 10 col
    expect(testWorld.matrix[0].length).toEqual(10);
  });

  it('adds a cell to the world', () => {
    const cellCount = testWorld.addCell(new Cell({ x: 0, y: 0 }))

    expect(testWorld.addCell).toBeTruthy();
    expect(cellCount).toEqual(1);
  });

  it('removes a cell', () => {
    testWorld.addCell(new Cell({ x: 0, y: 0 }))
    const cellCountCache = testWorld.cellCount
    const cellCount = testWorld.removeCell({ x: 0, y: 0 })
    expect(cellCount).toEqual(0);
  });

  it('can count neighbours', () => {
    testWorld.addCell(new Cell({x:1, y:0}))
    testWorld.addCell(new Cell({x:0, y:0}))
    expect(testWorld.countNeighbours).toBeTruthy();
    expect(testCell.countNeighbours({x:1, y:0})).toEqual(1);
  });

  it('can check world rules', () => {
    expect(testWorld.checkRules).toBeTruthy();
  });

  it('All other live cells die in the next generation. Similarly, all other dead cells stay dead.', () => {
    testWorld.addCell(new Cell({ x: 0, y: 0 }))
    testWorld.checkRules({ x: 0, y: 0 })
    expect(testWorld.cellCount).toEqual(0);
  });

  it('Any live cell with two or three live neighbours survives.', () => {
    const blockWorld = new World({rows: 4, cols: 4})

    blinkerWorld.addCell(new Cell({ x: 1, y: 1 }))
    blinkerWorld.addCell(new Cell({ x: 1, y: 2 }))
    blinkerWorld.addCell(new Cell({ x: 2, y: 1 }))
    blinkerWorld.addCell(new Cell({ x: 2, y: 2 }))

    testWorld.checkCell({ x: 0, y: 0 })
    expect(testWorld.cellCount).toEqual(4);
  });

  it('Any dead cell with three live neighbours becomes a live cell.', () => {
    const blinkerWorld = new World({rows: 5, cols: 5})

    blinkerWorld.addCell(new Cell({ x: 2, y: 1 }))
    blinkerWorld.addCell(new Cell({ x: 2, y: 2 }))
    blinkerWorld.addCell(new Cell({ x: 2, y: 3 }))

    expect(blinkerWorld.cellCount).toEqual(3);
  });

});