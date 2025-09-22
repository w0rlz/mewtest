const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const map = [
  [1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,1],
  [1,0,1,0,1,0,0,1],
  [1,0,1,0,1,0,0,1],
  [1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1],
];

const MAP_WIDTH = map[0].length;
const MAP_HEIGHT = map.length;
const TILE_SIZE = 64;

let player = {
  x: TILE_SIZE + TILE_SIZE / 2,
  y: TILE_SIZE + TILE_SIZE / 2,
  angle: 0,
  speed: 2,
};

const FOV = Math.PI / 3; // 60 degrees
const NUM_RAYS = WIDTH;
const MAX_DEPTH = TILE_SIZE * 8;

function castRays() {
  const startAngle = player.angle - FOV / 2;
  const step = FOV / NUM_RAYS;

  for (let i = 0; i < NUM_RAYS; i++) {
    const rayAngle = startAngle + i * step;
    let dist = 0;
    let hit = false;

    const dx = Math.cos(rayAngle);
    const dy = Math.sin(rayAngle);

    while (!hit && dist < MAX_DEPTH) {
      dist += 1;

      const testX = Math.floor((player.x + dx * dist) / TILE_SIZE);
      const testY = Math.floor((player.y + dy * dist) / TILE_SIZE);

      if (
        testX < 0 || testX >= MAP_WIDTH ||
        testY < 0 || testY >= MAP_HEIGHT
      ) {
        hit = true;
        dist = MAX_DEPTH;
      } else if (map[testY][testX] === 1) {
        hit = true;
      }
    }

    // Remove fish-eye distortion
    const correctedDist = dist * Math.cos(rayAngle - player.angle);
    const wallHeight = Math.min((TILE_SIZE * 320) / correctedDist, HEIGHT);

    const color = `rgb(${255 - correctedDist}, ${255 - correctedDist}, ${255 - correctedDist})`;
    ctx.fillStyle = color;
    ctx.fillRect(i, (HEIGHT - wallHeight) / 2, 1, wallHeight);
  }
}

function render() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  castRays();
}

function update() {
  if (keys["ArrowUp"]) {
    player.x += Math.cos(player.angle) * player.speed;
    player.y += Math.sin(player.angle) * player.speed;
  }
  if (keys["ArrowDown"]) {
    player.x -= Math.cos(player.angle) * player.speed;
    player.y -= Math.sin(player.angle) * player.speed;
  }
  if (keys["ArrowLeft"]) {
    player.angle -= 0.04;
  }
  if (keys["ArrowRight"]) {
    player.angle += 0.04;
  }
}

const keys = {};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}

loop();
