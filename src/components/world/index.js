import Cell from "../cell";

export default class World {
  NEIGHBOURS = [
    { y: -1, x: -1 }, { y: -1, x: 0 }, { y: -1, x: 1 },
    { y: 0, x: -1 }, null, { y: 0, x: 1 },
    { y: 1, x: -1 }, { y: 1, x: 0 }, { y: 1, x: 1 },
  ]

  constructor({ rows, cols } = { rows: 10, cols: 10 }) {
    this.rows = rows;
    this.cols = cols;
    this.running = false;
    this.matrix = this.setupMatrix({ rows, cols })
  }

  setupMatrix({ rows, cols }) {
    return Array(cols).fill(false).map((col) => {
      return Array(rows).fill(false)
    })
  }

  clear = () =>{
    this.matrix = this.setupMatrix(this)
  }

  random = () => {
    this.matrix = Array(this.cols)
      .fill(false)
      .map((col, colIndex) => {
        return Array(this.rows).fill(false).map((item, rowIndex)=>{
          if(Math.random() > .8){
            return new Cell({y: colIndex,x:rowIndex})
          }
        })
      });
  }

  addCell(cell) {
    this.matrix[cell.y][cell.x] = cell
  }

  removeCell(cell) {
    if (this.getCell(cell)) {
      this.matrix[cell.y][cell.x] = false
    }
  }

  getCell({ y, x }) {
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) {
      return false
    }

    return this.matrix[y][x]
  }

  countNeighbours({ x, y }) {
    let count = 0;
    this.NEIGHBOURS
      .map((neighbour) => {
        if (neighbour) {
          if (this.getCell({ x: x + neighbour.x, y: y + neighbour.y })) {
            count++
          }
        }
      })
    return count;
  }

  applyRules = () => {
    const buffer = this.setupMatrix(this)
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        const neighbours = this.countNeighbours({ x, y });
        const cell = this.getCell({ x, y })
        if ((neighbours === 2 && cell) || neighbours === 3) {
          buffer[y][x] = new Cell({ x, y })
        } else {
          buffer[y][x] = false
        }
      }
    }

    this.matrix = buffer;
  }
}