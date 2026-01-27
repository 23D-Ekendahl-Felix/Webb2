const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
const bild = new Image()
bild.src = "./nedladdning.png"
bild.addEventListener('load', function() {
  ctx.drawImage(bild, 100, 100, 200, 200)
})

