import 'core-js/stable';
import drawGmodLoadingShadow from './draw/gmodLoadingShadow';
import drawPlanet from './draw/planet';
import drawStars from './draw/stars';
import drawTheBeacon from './draw/theBeacon';
import './scss/index.scss';

// import ical from 'ical';
// import fetch from 'isomorphic-fetch';
// const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
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
  
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clear canvas

  drawGmodLoadingShadow(ctx);
  drawPlanet(ctx, pivotX, pivotY, radius);
  drawTheBeacon(ctx);
  drawStars(ctx, pivotX, pivotY);

  requestAnimationFrame(draw);
}

// fetch(CORS_ANYWHERE + 'https://calendar.google.com/calendar/ical/h8pe8j0pmikgpp2cmjsh3f24ig%40group.calendar.google.com/public/basic.ics')
//   .then(res => res.text())
//   .then((data) => {
//     console.log(ical.parseICS(data))
//   })

init();
