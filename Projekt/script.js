const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const playerBil = new Image();
playerBil.src = "./car (1).png";

const enemyBil1 = new Image();
enemyBil1.src = "./vehicle.png";

let game = {
    numberOfTrees: 6,
    laneLeft: canvas.width * 0.35,
    laneRight: canvas.width * 0.45,
    distanceBetweenEnemies: 500
};

let player = {
    x: canvas.width * 0.4,
    y: canvas.height * 0.6,
    width: 128,
    height: 128,
    directionH: "",
    directionV: ""
};
let enemy = {
    x: canvas.width * 0.3,
    y: -game.distanceBetweenEnemies,
    width: 28,
    height: 128,
    speed: 3
};
let enemies = [];


function drawPlayer() {
    ctx.drawImage(playerBil, player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
    ctx.drawImage(enemyBil1, enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
    }
}

window.addEventListener("keydown", function (e) {
    if (e.code == "KeyD") {
        player.directionH = "R";
    }
    if (e.code == "KeyA") {
        player.directionH = "L";
    }
});

window.addEventListener("keyup", function (e) {
    if (e.code == "KeyD") {
        player.directionH = "";
    }
    if (e.code == "KeyA") {
        player.directionH = "";
    }
});

function updateplayer() {
    if (player.directionH == "R") {
        player.x += 5;
    }
    if (player.directionH == "L") {
        player.x -= 5;
    }

    if (player.x > game.laneRight) {
        player.x = game.laneRight;
    }
    if (player.x < game.laneLeft) {
        player.x = game.laneLeft;
    }
}

function enemyFysik() {

    for (let i = 0; i < enemies.length; i++) {

        enemies[i].y += enemies[i].speed;

        if (enemies[i].y > canvas.height) {

            enemies[i].y = -game.distanceBetweenEnemies;

        }

    }

}

for (let i = 0; i < 6; i++) {

    let laneIndex = i % 2;

    enemies.push({
        x: lanes[laneIndex],
        y: -i * game.distanceBetweenEnemies,
        width: 128,
        height: 128,
        speed: 8
    });

}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawEnemies();
   

    updateplayer();
    enemyFysik();

    requestAnimationFrame(gameLoop);

}
gameLoop();