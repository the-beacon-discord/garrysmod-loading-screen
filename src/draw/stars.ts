let rot = 0;

class Star {
  static stars: Star[] = [];
  radius: number
  angle: number

  constructor(radius: number, angle: number) {
    this.radius = radius;
    this.angle = angle;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();

    ctx.translate(x, y)
    ctx.rotate(this.angle + rot);
    ctx.translate(-x, -y)

    ctx.fillStyle = 'white';
    ctx.fillRect(x, this.radius, 3, 3);

    ctx.restore();
  }

  static createStars() {
    for (let i = 0; i < 200; i += 1) {
      this.stars.push(new Star(Math.random() * window.innerHeight, Math.random() * 2 * Math.PI))
    }
  }

  static incrementRot() {
    rot = (rot + 0.0005) % (2 * Math.PI);
  }

  static drawStars(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.stars.forEach(star => star.draw(ctx, x, y))
  }
}

Star.createStars();

const drawStars = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  Star.incrementRot();
  Star.drawStars(ctx, x, y);
}

export default drawStars
