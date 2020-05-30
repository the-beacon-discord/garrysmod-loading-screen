import { Vector } from "../Vector";

// Variables that you can change!
// 
const BULB_RADIUS = 20;
const BROADCAST_INTERVAL = 45;
const BROADCAST_THICKNESS = 10;
const SUPPORT_THICKNESS = 10;
const SUPPORT_BORDER_THICKNESS = 5;
const SUPPORT_ANGLE = Math.PI / 8
const FRAME_START_FROM_LEFT = true;
const FRAME_CLIMB_UP_TO_MAX = 0.8;
const FRAME_THICKNESS = 7;

// Initialise broadcast radii with a single 0 radius circle.
let radii = [0];
let broadcast_timer = 0;

const drawTheBeacon = (ctx: CanvasRenderingContext2D) => {
  const MAX_RADIUS = Math.sqrt(Math.pow(ctx.canvas.width / 2, 2) + Math.pow(ctx.canvas.height / 2, 2))
  const BROADCAST_DROPOFF_START = MAX_RADIUS / 2

  // Position vectors of the bulb and where the left and right legs meet the bottom of the canvas.
  const bulbPos = new Vector(ctx.canvas.width / 2, ctx.canvas.height / 2)
  const leftLegBasePos = new Vector(bulbPos.x - (ctx.canvas.height * Math.tan(SUPPORT_ANGLE) / 2), ctx.canvas.height);
  const rightLegBasePos = new Vector(bulbPos.x + (ctx.canvas.height * Math.tan(SUPPORT_ANGLE) / 2), ctx.canvas.height);

  // Vectors from the bottom of legs to the bulb.
  const leftLegToBulb = bulbPos.sub(leftLegBasePos);
  const rightLegToBulb = bulbPos.sub(rightLegBasePos);

  // Generate the position vectors in which the inside supports of The Bacon logo is connected to.
  const notches: Vector[] = [];
  let fromLeft = FRAME_START_FROM_LEFT;
  for (let i = 0; i < FRAME_CLIMB_UP_TO_MAX; i += 0.1) {
    const currentLeg = fromLeft ? leftLegToBulb : rightLegToBulb;
    const currentBase = fromLeft ? leftLegBasePos : rightLegBasePos;

    notches.push(currentLeg.portion(i).add(currentBase))
    fromLeft = !fromLeft
  }

  // Create any new circles if required
  broadcast_timer = (broadcast_timer + 1) % BROADCAST_INTERVAL;
  if (broadcast_timer === 0) {
    radii.push(0);
  }

  // Draw the bulb.
  ctx.beginPath();
  ctx.arc(bulbPos.x, bulbPos.y, BULB_RADIUS, 0, 2 * Math.PI)
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white'
  ctx.fill();

  // Set up clipping so supports do not pop above the bulb.
  {
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height / 2);
    ctx.clip();

    // Draw outside legs
    // Also set up clipping so inside supports can only be drawn inside the triangle.
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    ctx.lineWidth = SUPPORT_THICKNESS
    ctx.moveTo(leftLegBasePos.x, leftLegBasePos.y);
    ctx.lineTo(bulbPos.x, bulbPos.y);
    ctx.lineTo(rightLegBasePos.x, rightLegBasePos.y);
    ctx.stroke();
    ctx.clip();

    // Draw inside supports
    // The "notches" are where the inside supports are connected
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = FRAME_THICKNESS;
    ctx.moveTo(notches[0].x, notches[0].y);
    for (let i = 1; i < notches.length; i += 1) {
      ctx.lineTo(notches[i].x, notches[i].y)
    }
    ctx.stroke();
    ctx.restore();
  }

  // Draw circles!
  for (let i = 0; i < radii.length; i += 1) {
    ctx.beginPath();
    radii[i] = radii[i] + 1

    ctx.arc(bulbPos.x, bulbPos.y, radii[i],
      (Math.PI / 2) + SUPPORT_ANGLE + Math.atan2(SUPPORT_THICKNESS + SUPPORT_BORDER_THICKNESS, radii[i]),
      (Math.PI / 2) - SUPPORT_ANGLE - Math.atan2(SUPPORT_THICKNESS + SUPPORT_BORDER_THICKNESS, radii[i]),
    )
    
    if (radii[i] > MAX_RADIUS) radii.splice(i, 1)
    if (radii[i] >= BROADCAST_DROPOFF_START) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, 20 / (radii[i] - BROADCAST_DROPOFF_START))})`
    } else {
      ctx.strokeStyle = 'white';
    }

    ctx.lineWidth = BROADCAST_THICKNESS
    ctx.stroke();
  }
}

export default drawTheBeacon
