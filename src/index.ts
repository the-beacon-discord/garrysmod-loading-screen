import 'core-js/stable';
import drawStars from './draw/stars';
import drawTheBeacon from './draw/theBeacon';
import './scss/index.scss';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const planet = document.getElementById('planet') as HTMLImageElement;
const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame

const init = () => {
  requestAnimationFrame(draw);
}

const draw = () => {
  var ctx = canvas.getContext('2d');
  ctx.canvas.height = window.innerHeight
  ctx.canvas.width = window.innerWidth

  const radius = ctx.canvas.width + 700;
  const pivotX = ctx.canvas.width / 2;
  const pivotY = ctx.canvas.height + Math.sqrt(Math.pow(radius, 2) - Math.pow(pivotX, 2))
  
  planet.style.width = `${radius * 4}px`
  planet.style.left = `${pivotX - 2 * radius}px`
  planet.style.top = `${pivotY - 2 * radius}px`
  
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

  drawStars(ctx, pivotX, pivotY);
  drawTheBeacon(ctx);

  requestAnimationFrame(draw);
}

init();
