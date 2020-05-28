const drawPlanet = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
  ctx.save();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.fillStyle = 'green'
  ctx.fill();

  ctx.restore();
}

export default drawPlanet
