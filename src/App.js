import Canvas from './components/canvas'
import World from './components/world'
import Cell from './components/cell'
// hardcode these
var defaults = {
	cellsX: 100,
	cellsY: 80,
	cellSize: 10,
	rules: "23/3",
	gridColor: "#eee",
	cellColor: "#ccc"
};
const size = { rows: 50, cols: 50 }

const testWorld = new World(size)

window.testWorld = testWorld

testWorld.addCell(new Cell({ x: 1, y: 1 }))
testWorld.addCell(new Cell({ x: 1, y: 2 }))
testWorld.addCell(new Cell({ x: 1, y: 3 }))

function App() {
	const draw = (ctx, frameCount) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		for (let x = 0.5; x < defaults.cellsX * defaults.cellSize; x += defaults.cellSize) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, defaults.cellsY * defaults.cellSize);
		}

		for (let y = 0.5; y < defaults.cellsY * defaults.cellSize; y += defaults.cellSize) {
			ctx.moveTo(0, y);
			ctx.lineTo(defaults.cellsX * defaults.cellSize, y);
		}
		ctx.stroke();
		for (let y = 0; y < testWorld.matrix.length; y++) {
			for (let x = 0; x < testWorld.matrix[y].length; x++) {
				if (testWorld.matrix[y][x]) {
					ctx.fillRect(x * defaults.cellSize + 1,
						y * defaults.cellSize + 1,
						defaults.cellSize - 1,
						defaults.cellSize - 1);
				}
			}
		}

		if (testWorld.running) {
			testWorld.applyRules()
		}
	}

	return (
		<div>
			<Canvas draw={draw} {...size} />
			<button onClick={testWorld.random}>
				random
			</button>
			<button onClick={testWorld.applyRules}>
				apply rules
			</button>
			<button onClick={() => testWorld.running = !testWorld.running}>
				Play/Stop
			</button>
			<button onClick={testWorld.clear}>
				clear
			</button>
		</div>
	)
}

export default App;
