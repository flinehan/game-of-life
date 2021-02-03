import World from './index'
import Cell from '../cell'

let testWorld = null

beforeAll(() => {
  testWorld = new World()
});

describe('world', () => {

  it('creates a matrix for the world', () => {
    // rows
    expect(testWorld.matrix.length).toEqual(10);
    // 10 col
    expect(testWorld.matrix[0].length).toEqual(10);
  });

  it('adds a cell to the world', () => {
    testWorld.addCell(new Cell({ x: 0, y: 0 }))
    expect(testWorld.addCell).toBeTruthy();
    expect(testWorld.getCell({ x: 0, y: 0 })).toBeTruthy;
    expect(testWorld.matrix[0][0]).toBeTruthy();
    expect(testWorld.matrix[0][2]).toBeFalsy();
  });

  it('removes a cell', () => {
    const isoWord = new World()
    isoWord.addCell(new Cell({ x: 0, y: 0 }))
    isoWord.removeCell({ x: 0, y: 0 })
    expect(isoWord.getCell({ x: 0, y: 0 })).toBeFalsy();
  });

  it('can count neighbours', () => {
    testWorld.addCell(new Cell({ x: 1, y: 0 }))
    testWorld.addCell(new Cell({ x: 0, y: 0 }))
    expect(testWorld.countNeighbours).toBeTruthy();
    expect(testWorld.countNeighbours({ x: 1, y: 0 })).toEqual(1);
  });

  it('can apply world rules', () => {
    expect(testWorld.applyRules).toBeTruthy();
  });

  it('All other live cells die in the next generation. Similarly, all other dead cells stay dead.', () => {
    const isoWord = new World()
    isoWord.addCell(new Cell({ x: 0, y: 0 }))
    isoWord.applyRules()
    expect(isoWord.getCell({ x: 0, y: 0 })).toBeFalsy();
  });

  it('Any live cell with two or three live neighbours survives.', () => {
    const blockWorld = new World({ rows: 4, cols: 4 })

    blockWorld.addCell(new Cell({ x: 1, y: 1 }))
    blockWorld.addCell(new Cell({ x: 1, y: 2 }))
    blockWorld.addCell(new Cell({ x: 2, y: 1 }))
    blockWorld.addCell(new Cell({ x: 2, y: 2 }))
    testWorld.applyRules()

    expect(blockWorld.getCell({ x: 1, y: 1 })).toBeTruthy();
  });

  it('Any dead cell with three live neighbours becomes a live cell.', () => {
    const blinkerWorld = new World({ rows: 5, cols: 5 })

    blinkerWorld.addCell(new Cell({ x: 2, y: 1 }))
    blinkerWorld.addCell(new Cell({ x: 2, y: 2 }))
    blinkerWorld.addCell(new Cell({ x: 2, y: 3 }))
    testWorld.applyRules()

    expect(blinkerWorld.getCell({ x: 2, y: 2 })).toBeTruthy();
  });

});