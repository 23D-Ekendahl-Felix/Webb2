const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
var key = {}

x = 350
y = 100
hast = 1
gravity = 0.3
vikt = 1
motorkraft = 0
crachspeed = 10
maxhast = 15
kör = true


//laddar lander bilden
const lander = new Image()
lander.src = "./nuke.png"
const Explotion = new Image()
Explotion.src = "./explotion.png"


function program(kör) {
  window.addEventListener("keydown", function (e) {
    key[e.key] = true
    if (key[" "]) {
      motorkraft = 1
    }
  })
  window.addEventListener("keyup", function (e) {
    key[e.key] = false
    if (!key[" "]) {
      motorkraft = 0
    }
  })

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(lander, x, y)

    //fysik
    hast += gravity * vikt - motorkraft
    if (hast > maxhast) {
      hast = maxhast
    }
    y += hast

    //krasch
    if (y > canvas.height - lander.height) {
      if (hast > crachspeed) {
        ctx.drawImage(Explotion, x , canvas.height - Explotion.height)
        ctx.clearRect(lander.width, lander.height)
          kör = false
      } else {
        ctx.fillStyle = "green"
        ctx.font = "30px Arial"
        ctx.fillText("Grattis du landade", 300, 200)
        kör = false
      }
      y = canvas.height - lander.height
    }
    if (kör) {
      requestAnimationFrame(gameLoop)
    }
  }
  gameLoop()
}
program(kör)
