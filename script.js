🔹 script.js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let px = 10;
let py = 10;
let playerWidth = 50;
let playerHeight = 50;

function update() {
  reset();
  draw();
  requestAnimationFrame(update);
}

function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(px, py, playerWidth, playerHeight);
}

update();
