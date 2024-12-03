function Particles(width = 100, height = 100, speed = 3, size = 10) {

  const particle = (x = 0, y = 0) => {
    return {
      x: x,
      y: y,
      phase: Math.floor(Math.random() * height),
      amplitude: 5,
      size: size,
      color: randomColor()
    };
  };

  const transparency = '/ 67%)';

  function randomColor() {
    let color = "";
    for (let i = 0; i < 3; i++) {
      const pos = Math.floor(Math.random() * 156) + 100;
      color += pos + " ";
    }
    color = "rgb(" + color + transparency;
    console.log(color);
    return color;
  }

  const circle = (point, ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = ctx.fillStyle = point.color;
    ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  const moveSinglePart = (obj, tick) => {
    obj.x = (obj.phase + tick * speed) % width;
    obj.y = (obj.y + obj.amplitude * Math.cos(tick / 180 * Math.PI)) % height;
    if (obj.y < 0) {
      obj.y = height + obj.y;
    }
  }

  const drawSinglePart = (part, context) => {
    circle(part, context)
  };

  let particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(particle(0, Math.floor(Math.random() * 500)));
  }

  const draw = (context) => {
    for (let obj of particles) {
      drawSinglePart(obj, context);
    }
  };

  const move = (tick = 0) => {
    for (let obj of particles) {
      moveSinglePart(obj, tick);
    }
  }

  return {
    drawAll: draw,
    moveAll: move
  }
}

export default Particles;
