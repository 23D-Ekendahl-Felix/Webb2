const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

let bredd = 100
let färg = 67
let x = 0
let y = 0
let höjd = 100
let dx = 1
let dy = 1
let dbredd = 1
let dhöjd = 1
function gameloop() {
  bredd += dbredd
  färg += 1
  höjd += dhöjd
  x += dx
  y += dy
  ctx.fillStyle = "hsl("+färg+", 100%, 50%)"
  // ctx.fillRect(x, y, bredd, höjd)




  // if (x + bredd > canvas.width || x < 0) {
  //   dx = -dx
  // }
  // if (y + höjd > canvas.height || y < 0) {
  //   dy = -dy
  // }
  // if (bredd > 200 || bredd < 50) {
  //   dbredd = -dbredd
  // }
  // if (höjd > 200 || höjd < 50) {
  //   dhöjd = -dhöjd
  // }


  requestAnimationFrame(gameloop)
}
gameloop()