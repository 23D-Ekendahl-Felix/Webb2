const c = document.querySelector('canvas')
const ctx = c.getContext('2d')

const plane = new Image();
plane.src = "./plane.png";
//variabel 
let shipX = 400 
let shipY = 400
let directionH = ""
let directionV = ""
//Vad vi lysnar på 
window.addEventListener('keydown', function(e){
if(e.code == 'ArrowRight'){ directionH = "R"}
if(e.code == 'ArrowLeft'){ directionH = "L"}
if(e.code == 'ArrowUp'){ directionV = "U"}
if(e.code == 'ArrowDown'){ directionV = "D"}
})
window.addEventListener('keyup', function(e){
if(e.code == 'ArrowRight'){ directionH = ""}
if(e.code == 'ArrowLeft'){ directionH = ""}
if(e.code == 'ArrowUp'){ directionV = ""}
if(e.code == 'ArrowDown'){ directionV = ""}
})

// Animationsloopen
function gameLoop() {
  ctx.clearRect(0, 0, c.width, c.height)

  //Läs in piltryck
  motion()

  ctx.drawImage(plane, shipX - 64, shipY)
  
  requestAnimationFrame(gameLoop)
}
gameLoop()


function motion(){
if(directionH == "R"){ shipX += 5}
if(directionH == "L" ){ shipX -= 5}
if(directionV == "U"){ shipY -= 5}
if(directionV == "D"){ shipY += 5}

}