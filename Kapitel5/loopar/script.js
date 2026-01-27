const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

let x = Math.random() * canvas.width
let y = Math.random() * canvas.height
let dx = 5
let dy = 5
const r = 20

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Rita cirkel
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = "blue"
  ctx.fill()

  // Uppdatera position
  x += dx
  y += dy

  // Studs mot vänster / höger
  if (x + r > canvas.width || x - r < 0) {
    dx = -dx
  }

  // Studs mot topp / botten
  if (y + r > canvas.height || y - r < 0) {
    dy = -dy
  }

  requestAnimationFrame(loop)
}

loop()


