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

// Ladda in skottljud
const shoot = new Audio()
shoot.src = "./fah.mp3"
shoot.volume = 0;
// Ladda in explosionljud
const exp = new Audio()
exp.src = "./explosion-meme_dTCfAHs.mp3"
exp.volume = 1;

//objekten
//player objekt
const player = {
    x: 400 - 32,
    y: 300,
    directionH: "",
    directionV: "",
    shooting: false
}
//enemy objekt
const enemy = [
    {
        x: 750 * Math.random(),
        y: -100 * Math.random(),
        speed: 5 * Math.random()
    },
    {
        x: 750 * Math.random(),
        y: -100 * Math.random(),
        speed: 5 * Math.random()
    },
    {
        x: 750 * Math.random(),
        y: -100 * Math.random(),
        speed: 5 * Math.random()
    }
]

//Engångs funktioner
KeyListener()

//Spelloop
function gameLoop() {
    // Radera canvas
    ctx.clearRect(0, 0, 800, 600)
    // Rita allt
    MovingObjektsDraw()

    // Uppdatera allt
    updateplayer()

    // Upprepa
    requestAnimationFrame(gameLoop)
}
gameLoop()


/***Alla Funktioner ***/
// Ritaande funktioner
function MovingObjektsDraw() {
    ctx.drawImage(ship, player.x, player.y)
    ctx.drawImage(enemy1, enemy[0].x, enemy[0].y)
    ctx.drawImage(enemy2, enemy[1].x, enemy[1].y)
    ctx.drawImage(enemy2, enemy[2].x, enemy[2].y)
}

// Uppdaterande funktioner
function KeyListener() {
    window.addEventListener('keydown', function (e) {
        if (e.code == 'KeyD') {
            player.directionH = "R"
        }
        if (e.code == 'KeyA') {
            player.directionH = "L"
        }
        if (e.code == 'KeyW') {
            player.directionV = "U"
        }
        if (e.code == 'KeyS') {
            player.directionV = "D"
        }
        if (e.code == 'Space') {
            player.shooting = true
        }
    })
    window.addEventListener('keyup', function (e) {
        if (e.code == 'KeyD') {
            player.directionH = ""
        }
        if (e.code == 'KeyA') {
            player.directionH = ""
        }
        if (e.code == 'KeyW') {
            player.directionV = ""
        }
        if (e.code == 'KeyS') {
            player.directionV = ""
        }
        if (e.code == 'Space') {
            player.shooting = false
        }
    })

}
function updateplayer() {
    if (player.directionH == "R") {
        player.x += 5
    }
    if (player.directionH == "L") {
        player.x -= 5
    }
    if (player.directionV == "D") {
        player.y += 5
    }
    if (player.directionV == "U") {
        player.y -= 5
    }
    if (player.x > 800) {
        player.x = 0
    }
    if (player.x < 0) {
        player.x = 800
    }
}

