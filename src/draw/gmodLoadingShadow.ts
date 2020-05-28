const drawGmodLoadingShadow = (ctx: CanvasRenderingContext2D) => {
  ctx.save();

  ctx.fillStyle = 'gray'
  ctx.shadowColor = 'gray'
  ctx.shadowBlur = 15
  ctx.fillRect(ctx.canvas.width - 9, ctx.canvas.height - 10, -400, -66)

  ctx.restore();
}

export default drawGmodLoadingShadow
