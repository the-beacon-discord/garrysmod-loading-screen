import loonatheworld from '../images/loonatheworld.svg';

let ready = false;
let rot = 0;
const img = new Image();
img.src = loonatheworld;

img.onload = () => { ready = true; }

const drawPlanet = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
  ctx.save();

  rot = (rot + 0.0005) % (2 * Math.PI);
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.translate(-x, -y)
  ctx.drawImage(img, x - radius * 2, y - radius * 2, radius * 4, radius * 4)

  ctx.restore();
}

export default drawPlanet
