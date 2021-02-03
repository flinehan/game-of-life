import React, { useRef, useEffect } from 'react'

// hardcode these
var defaults = {
  cellsX    : 100,
  cellsY    : 80,
  cellSize  : 10,
  rules     : "23/3",
  gridColor : "#eee",
  cellColor : "#ccc"
};

const Canvas = props => {
  
  const { draw, rows, cols, ...rest } = props
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width  = rows * defaults.cellSize || 10 * defaults.cellSize;
		canvas.height = cols * defaults.cellSize || 10 * defaults.cellSize;
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas