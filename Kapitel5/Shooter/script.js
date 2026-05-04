const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// Ladda in bilden av rymskeppet
const ship = new Image()
ship.src = "./jet-plane.png"

// Ladda in bild av fiende 1
const enemy1 = new Image()
enemy1.src = "./islamic.png"

// Ladda in bild av fiende 2
const enemy2 = new Image()
enemy2.src = "./skull.png"

// Ladda in bild av explosion
const explosion = new Image()
explosion.src = "./planet.png"
let blastTimer = 0
let blastX = 0
let blastY = 0

// Ladda in bakgrundmusik
const bgmusik = new Audio();
bgmusik.src = "";
bgmusik.loop = true;   // spelar om automatiskt
bgmusik.volume = 1;  // valfritt (0 - 1)

bgmusik.play();

// Ladda in skottljud
const shots = [];
for (let i = 0; i < 10; i++) {
  shots.push(new Audio("./fah.mp3"));
}
let shotIndex = 0;
shots.volume = 0;
const exp = new Audio()
exp.src = "./explosion-meme_dTCfAHs.mp3"
expvolume = 1;

// Variabler
let shipX = 400 - 32
let shipY = 300
let directionH = ""
let directionV = ""
let shooting = false
let enemy1x = 750 * Math.random()
let enemy1y = -100 * Math.random()
let enemy1speed = 5 * Math.random()
let enemy2x = 750 * Math.random()
let enemy2y = -100 * Math.random()
let enemy2speed = 5 * Math.random()

// Lyssna på tangeter: pil-vänster/pil-höger
window.addEventListener('keydown', function (e) {
  if (e.code == 'KeyD') {
    directionH = "R"
  }
  if (e.code == 'KeyA') {
    directionH = "L"
  }
  if (e.code == 'KeyW') {
    directionV = "U"
  }
  if (e.code == 'KeyS') {
    directionV = "D"
  }
  if (e.code == 'Space') {
    shooting = true
  }
})
window.addEventListener('keyup', function (e) {
  if (e.code == 'KeyD') {
    directionH = ""
  }
  if (e.code == 'KeyA') {
    directionH = ""
  }
  if (e.code == 'KeyW') {
    directionV = ""
  }
  if (e.code == 'KeyS') {
    directionV = ""
  }
  if (e.code == 'Space') {
    shooting = false
  }
})

// Animationsloopen
function gameLoop() {
  // Radera canvas
  ctx.clearRect(0, 0, 800, 600)

  motion()
  border()
  stars()
  laser()
  rocketFlame()
  enemies()
  spaceship()
  explosiondra()

  // Upprepa
  requestAnimationFrame(gameLoop)
}
gameLoop()

// Rita ut fiender
function enemies() {
  ctx.drawImage(enemy1, enemy1x, enemy1y)
  enemy1y += enemy1speed
  ctx.drawImage(enemy2, enemy2x, enemy2y)
  enemy2y += enemy2speed
  if (enemy1y > 600) {
    enemy1x = 750 * Math.random()
    enemy1y = -100 * Math.random()
    enemy1speed = 5 * Math.random()
  }
  if (enemy2y > 600) {
    enemy2x = 750 * Math.random()
    enemy2y = -100 * Math.random()
    enemy2speed = 5 * Math.random()
  }
}

function motion() {
  if (directionH == "R") {
    shipX += 5
  }
  if (directionH == "L") {
    shipX -= 5
  }
  if (directionV == "D") {
    shipY += 5
  }
  if (directionV == "U") {
    shipY -= 5
  }
}
function border() {
  if (shipX > 800) {
    shipX = 0
  }
  if (shipX < 0) {
    shipX = 800
  }
}
// Rita ut rymdskeppet
function spaceship() {
  ctx.drawImage(ship, shipX, shipY)
}
function rocketFlame() {
  ctx.beginPath()
  ctx.moveTo(shipX + 28, shipY + 50)
  ctx.lineTo(shipX + 20, shipY + 70)
  ctx.lineTo(shipX + 32, shipY + 70 + Math.random() * 30)
  ctx.lineTo(shipX + 42, shipY + 70)
  ctx.lineTo(shipX + 36, shipY + 50)
  ctx.fillStyle = "orange"
  ctx.fill()
}

function explosiondra() {
  if (blastTimer > 0) {
    ctx.drawImage(explosion, blastX - 32, blastY - 32)
    blastTimer -= 1
  }
}

  function laser() {
    if (shooting) {
      shots[shotIndex].currentTime = 0;
      shots[shotIndex].play();
      shotIndex = (shotIndex + 1) % shots.length;
      ctx.fillStyle = "white";
      ctx.fillRect(shipX + 31, 0, 2, shipY);
      //kolla om skotten träffar fienderna
      checkCollisions();
    }
  }

  function checkCollisions() {
    if (shipX + 31 > enemy1x && shipX + 31 < enemy1x + 64 && shipY > enemy1y) {
      exp.play();
      blastTimer = 20
      blastX = enemy1x + 64
      blastY = enemy1y - 64
      enemy1x = 750 * Math.random()
      enemy1y = -100 * Math.random()
      enemy1speed = 5 * Math.random()
    }
    if (shipX + 31 > enemy2x && shipX + 31 < enemy2x + 64 && shipY > enemy2y) {
      exp.play();
      blastTimer = 20
      blastX = enemy2x + 32
      blastY = enemy2y + 32
      enemy2x = 750 * Math.random()
      enemy2y = -100 * Math.random()
      enemy2speed = 5 * Math.random()
    }
  }*

  function stars() {
    ctx.fillStyle = "white"
    ctx.fillRect(Math.random() * 800, Math.random() * 600, 4, 4)
  }