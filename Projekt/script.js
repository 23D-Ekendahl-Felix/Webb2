const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const playerBil = new Image();
playerBil.src = "./car (1).png";

const enemyBil = new Image();
enemyBil.src = "./vehicle.png";

const crashSound = new Audio("./explosion-meme_dTCfAHs.mp3");

let game = {
    laneLeft: canvas.width * 0.4,
    laneMid: canvas.width * 0.5,
    laneRight: canvas.width * 0.6,
    speed: 5,
    maxSpeed: 10,
    score: 0,
    gameOver: false
};

let player = {
    x: game.laneMid,
    y: canvas.height * 0.7,
    width: 100,
    height: 100,
    dir: "",
    hitboxPadding: 25
};

let enemies = [];
let lanes = [game.laneLeft, game.laneMid, game.laneRight];

function createEnemies() {
    enemies = [];

    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: lanes[i % 3],
            y: -i * 200,
            width: 100,
            height: 100,
            hitboxPadding: 25
        });
    }
}

function getHitbox(obj) {
    const p = obj.hitboxPadding || 0;

    return {
        x: obj.x + p,
        y: obj.y + p,
        width: obj.width - p * 2,
        height: obj.height - p * 2
    };
}

function isColliding(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

function drawRoad() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";
    ctx.fillRect(game.laneLeft, 0, 250, canvas.height);

    ctx.fillStyle = "yellow";
    ctx.fillRect(game.laneMid + 48, 0, 5, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(game.laneLeft + 10, 0, 5, canvas.height);
    ctx.fillRect(game.laneRight + 76, 0, 5, canvas.height);
}

function drawPlayer() {
    ctx.drawImage(playerBil, player.x, player.y, player.width, player.height);
}

function drawEnemies() {
    for (let e of enemies) {
        ctx.drawImage(enemyBil, e.x, e.y, e.width, e.height);
    }
}

function drawUI() {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(10, 10, 200, 50);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.strokeRect(10, 10, 200, 50);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Arial";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 6;

    ctx.fillText("Score: " + game.score, 25, 35);
    ctx.restore();

    if (game.gameOver) {
        ctx.save();

        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ff3b3b";
        ctx.font = "bold 60px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 15;

        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

        ctx.fillStyle = "#ffffff";
        ctx.font = "20px Arial";
        ctx.shadowBlur = 8;

        ctx.fillText("Tryck SPACE för att spela igen", canvas.width / 2, canvas.height / 2 + 30);

        ctx.restore();
    }
}

window.addEventListener("keydown", (e) => {
    if (e.code === "KeyA") player.dir = "left";
    if (e.code === "KeyD") player.dir = "right";

    if (e.code === "Space" && game.gameOver) {
        restartGame();
    }
});

window.addEventListener("keyup", () => {
    player.dir = "";
});

function updatePlayer() {
    if (player.dir === "left") player.x -= 6;
    if (player.dir === "right") player.x += 6;

    if (player.x < game.laneLeft) player.x = game.laneLeft;
    if (player.x > game.laneRight) player.x = game.laneRight;
}

function updateEnemies() {
    for (let e of enemies) {
        e.y += game.speed;

        if (e.y > canvas.height) {
            e.y = -200;
            e.x = lanes[Math.floor(Math.random() * lanes.length)];

            game.score++;

            if (game.speed <= game.maxSpeed) {
                if (game.score % 5 === 0) {
                    game.speed += 1;
                }
            }
        }
    }
}

function checkCollision() {
    const playerBox = getHitbox(player);

    for (let e of enemies) {
        const enemyBox = getHitbox(e);

        if (isColliding(playerBox, enemyBox)) {
            game.gameOver = true;
            crashSound.play();
            return;
        }
    }
}

function restartGame() {
    game.score = 0;
    game.speed = 5;
    game.gameOver = false;
    player.x = game.laneMid;
    createEnemies();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();
    drawPlayer();
    drawEnemies();
    drawUI();

    if (!game.gameOver) {
        updatePlayer();
        updateEnemies();
        checkCollision();
    }

    requestAnimationFrame(gameLoop);

}
createEnemies();
gameLoop();