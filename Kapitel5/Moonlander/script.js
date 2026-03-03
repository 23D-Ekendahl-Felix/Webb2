const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


x = 350
y = 100
hast = 1
gravity = 0.3
vikt = 1
motorkraft = 0
crachspeed = 10
maxhast = 15
bränsle = 100
kör = true

function program(kör) {
  //laddar lander bilden
  const lander = new Image()
  lander.src = "./nuke.png"



  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(lander, x, y)
    fysik()
    flyg()
    if (y > canvas.height - lander.height) {
      krasch()
    }
    //rita Y och Hast och bränsle
    ctx.fillStyle = "white"
    ctx.font = "20px Arial"
    ctx.fillText("Höjd: " + Math.round(canvas.height - lander.height - y), 10, 30)
    ctx.fillText("Hastighet: " + Math.round(hast), 10, 60)
    ctx.fillText("Bränsle: " + bränsle, 10, 90)

    if (kör) {
      requestAnimationFrame(gameLoop)
    }
  }
  gameLoop()
}
program(kör)

function krasch() {
    const Explotion = new Image()
    Explotion.src = "./explosion.png"
  if (hast > crachspeed) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(Explotion, x, canvas.height - Explotion.height)
    kör = false
  } else {
    ctx.fillStyle = "green"
    ctx.font = "30px Arial"
    ctx.fillText("Grattis du landade", 300, 200)
    kör = false
  }
  y = canvas.height - lander.height
}

function flyg() {
  window.addEventListener("keydown", function (e) {
    if (e.code == "Space") {
      if (bränsle <= 0) {
        motorkraft = 0
        return
      }
      motorkraft = 1
      bränsle -= 0.1
    }
  })
  window.addEventListener("keyup", function (e) {
    if (e.code == "Space") {
      motorkraft = 0
    }
  })
}

function fysik() {
  hast += gravity * vikt - motorkraft
  if (hast > maxhast) {
    hast = maxhast
  }
  y += hast
}
