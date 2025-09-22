const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let playerx = 0;
let playery = 0;
let px = 10;
let py = 10;

function update(){
  reset();
  draw();
}
function reset(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function draw(){
  ctx.fillRect(px,py,playerx,player);
}

update(loop);
