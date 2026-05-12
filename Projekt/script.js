const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

// Laddar bilder och ljud
const playerBil = new Image();
playerBil.src = "./player.png";

const enemyBil = new Image();
enemyBil.src = "./carenypolice.png";

const crashSound = new Audio("./explosion-meme_dTCfAHs.mp3");

// Spelvariabler
let game = {
    laneLeft: canvas.width * 0.4,
    laneMid: canvas.width * 0.5,
    laneRight: canvas.width * 0.6,
    speed: 5,
    maxSpeed: 15,
    enemySpacing: 300,
    enemySpawnY: -200,
    score: 0,
    money: 0,
    shieldUnlockscore: 20,
    gameOver: false,
    paused: false,
    storeOpen: false,
    shieldUnlocked: false,
    debugHitbox: false
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


// Ritfunktioner
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

// UI-ritfunktioner
function drawUI() {

    if (!game.paused && !game.storeOpen && !game.gameOver) {
        drawScoreUi();
        drawShieldUi();
    }

    if (game.paused && !game.storeOpen) {
        drawMenu();
    }

    if (game.storeOpen) {
        drawStore();
    }

    if (game.gameOver && !game.storeOpen && !game.paused ) {
        drawGameOver();
    }
}
function drawScoreUi() {
    ctx.save();
    let x = 10, y = 10, w = 220, h = 60, r = 12;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();

    let grad = ctx.createLinearGradient(0, y, 0, y + h);
    grad.addColorStop(0, "rgba(30,30,30,0.85)");
    grad.addColorStop(1, "rgba(10,10,10,0.85)");

    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#00ffcc";
    ctx.font = "bold 22px Arial";
    ctx.shadowColor = "#00ffcc";
    ctx.shadowBlur = 10;

    ctx.fillText("Score", 25, 32);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Arial";
    ctx.shadowBlur = 5;

    ctx.fillText(game.score, 25, 52);

    ctx.restore();
}
function drawShieldUi() {
    let pw = 70;
    let px = canvas.width - pw - 15;
    let py = canvas.height - pw - 15;
    let pr = 12;

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(px + pr, py);
    ctx.lineTo(px + pw - pr, py);
    ctx.quadraticCurveTo(px + pw, py, px + pw, py + pr);
    ctx.lineTo(px + pw, py + pw - pr);
    ctx.quadraticCurveTo(px + pw, py + pw, px + pw - pr, py + pw);
    ctx.lineTo(px + pr, py + pw);
    ctx.quadraticCurveTo(px, py + pw, px, py + pw - pr);
    ctx.lineTo(px, py + pr);
    ctx.quadraticCurveTo(px, py, px + pr, py);
    ctx.closePath();

    let shieldGrad = ctx.createLinearGradient(px, py, px, py + pw);

    if (game.shieldUnlockscore <= game.score) {
        shieldGrad.addColorStop(0, "rgba(0, 180, 255, 0.45)");
        shieldGrad.addColorStop(1, "rgba(0, 80, 140, 0.45)");
    } else {
        shieldGrad.addColorStop(0, "rgba(120,120,120,0.35)");
        shieldGrad.addColorStop(1, "rgba(60,60,60,0.35)");
    }

    ctx.fillStyle = shieldGrad;
    ctx.fill();

    ctx.strokeStyle = game.shieldUnlockscore <= game.score
        ? "rgba(0, 200, 255, 0.7)"
        : "rgba(120,120,120,0.5)";

    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 30px Arial";

    if (game.shieldUnlockscore <= game.score) {
        ctx.fillStyle = "#00e5ff";
        ctx.shadowColor = "#00e5ff";
        ctx.shadowBlur = 15;
        ctx.fillText("🛡", px + pw / 2, py + pw / 2);
    } else {
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 0;
        ctx.fillText("🔒", px + pw / 2, py + pw / 2);

        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.font = "bold 14px Arial";
        ctx.fillText(game.shieldUnlockscore, px + pw / 2, py + pw / 2 + 22);
    }

    ctx.restore();
}
function drawMenu() {
    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00eaff";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.shadowColor = "#00eaff";
    ctx.shadowBlur = 25;

    ctx.fillText("MENU", canvas.width / 2, canvas.height / 2 - 140);

    let boxW = 320, boxH = 260;
    let bx = canvas.width / 2 - boxW / 2;
    let by = canvas.height / 2 - boxH / 2;

    ctx.fillStyle = "rgba(20,20,20,0.9)";
    ctx.fillRect(bx, by, boxW, boxH);

    ctx.strokeStyle = "rgba(0,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(bx, by, boxW, boxH);

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#ffffff";
    ctx.font = "22px Arial";

    let options = [
        "1. Return",
        "2. Restart",
        "3. Store",
        "4. Info"
    ];

    options.forEach((txt, i) => {
        ctx.fillText(txt, canvas.width / 2, by + 70 + i * 40);
    });

    ctx.restore();
}
function drawStore() {

    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.82)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let boxW = 500;
    let boxH = 400;

    let bx = canvas.width / 2 - boxW / 2;
    let by = canvas.height / 2 - boxH / 2;

    ctx.shadowColor = "#00eaff";
    ctx.shadowBlur = 20;

    ctx.fillStyle = "rgba(15,15,15,0.95)";
    ctx.fillRect(bx, by, boxW, boxH);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#00eaff";
    ctx.strokeRect(bx, by, boxW, boxH);

    ctx.textAlign = "center";

    ctx.fillStyle = "#00eaff";
    ctx.font = "bold 48px Arial";

    ctx.fillText(
        "STORE",
        canvas.width / 2,
        by + 60
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px Arial";

    ctx.fillText(
        "Pengar: " + game.score+ "kr",
        canvas.width / 2,
        by + 120
    );

    let items = [
        " Shield Upgrade",
        " Speed Upgrade",
        " Better Car",
        " Nitro"
    ];

    ctx.font = "24px Arial";

    items.forEach((item, index) => {

        let itemY = by + 190 + index * 45;

        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fillRect(bx + 40, itemY - 28, boxW - 80, 36);

        ctx.strokeStyle = "rgba(0,234,255,0.3)";
        ctx.strokeRect(bx + 40, itemY - 28, boxW - 80, 36);

        ctx.fillStyle = "#ffffff";

        ctx.fillText(
            item,
            canvas.width / 2,
            itemY
        );
    });

    ctx.fillStyle = "#00eaff";
    ctx.font = "20px Arial";

    ctx.fillText(
        "ESC = Close Store",
        canvas.width / 2,
        by + boxH - 35
    );

    ctx.restore();
}

function drawGameOver() {
    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.8)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ff2e2e";
    ctx.font = "bold 70px Arial";
    ctx.textAlign = "center";
    ctx.shadowColor = "#ff0000";
    ctx.shadowBlur = 30;

    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 60);

    ctx.shadowBlur = 10;
    ctx.fillStyle = "#ffd700";
    ctx.font = "bold 28px Arial";

    ctx.fillText(
        "Pengar: " + game.score + " kr",
        canvas.width / 2,
        canvas.height / 2 + 10
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Arial";
    ctx.shadowBlur = 5;

    ctx.fillText(
        "Tryck SPACE för att spela igen",
        canvas.width / 2,
        canvas.height / 2 + 60
    );

    ctx.restore();
}


function drawHitbox(obj, color = "red") {
    const hb = getHitbox(obj);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(hb.x, hb.y, hb.rx, hb.ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
}
function drawShieldEffect() {
    if (game.shieldUnlocked == true) {
        ctx.shadowBlur = 50;
        ctx.shadowColor = "rgba(0, 255, 255, 0.9)";
    }
    if (game.shieldUnlocked == false) {
        ctx.shadowColor = "";
        ctx.shadowBlur = 0;
    }
}

// Lyssnar på knapptryckningar
window.addEventListener("keydown", (e) => {

    if (e.code === "Escape") {

        if (game.storeOpen) {
            game.storeOpen = false;
            game.paused = true;
            return;
        }

        game.paused = !game.paused;

        return;
    }

    if (e.code === "KeyH") {
        game.debugHitbox = !game.debugHitbox;
    }
    if (e.code === "KeyS" && game.shieldUnlockscore <= game.score && !game.shieldUnlocked && !game.gameOver && !game.paused && !game.storeOpen) {
            game.shieldUnlocked = true;
            game.score -= game.shieldUnlockscore;
    }

    if (game.paused) {
        if (e.code === "Digit1") game.paused = false;

        if (e.code === "Digit2") {
            restartGame();
            game.paused = false;
        }
        if (e.code === "Digit3") {
    game.storeOpen = true;
}

        if (e.code === "Digit4") {
            alert("");
        }

        return;
    }

    if (!game.gameOver) {
        if (e.code === "KeyA") player.dir = "left";
        if (e.code === "KeyD") player.dir = "right";
    }

    if (e.code === "Space" && game.gameOver) {
        restartGame();
    }
});
window.addEventListener("keyup", () => {
    player.dir = "";
});

// Speluppdateringsfunktioner
function updatePlayer() {
    if (player.dir === "left") player.x -= 6;
    if (player.dir === "right") player.x += 6;

    if (player.x < game.laneLeft) player.x = game.laneLeft;
    if (player.x > game.laneRight) player.x = game.laneRight;
}
function updateEnemies() {
    game.speed = 5 + game.score * 0.1;

    if (game.speed > game.maxSpeed) {
        game.speed = game.maxSpeed;
    }

    for (let e of enemies) {
        e.y += game.speed;

        if (e.y > canvas.height) {
            e.y = game.enemySpawnY;
            e.x = lanes[Math.floor(Math.random() * lanes.length)];
            game.score++;
        }
    }
}
function createEnemies() {
    enemies = [];

    for (let i = 0; i < 5; i++) {
        enemies.push({
            x: lanes[Math.floor(Math.random() * 3)],
            y: game.enemySpawnY - i * game.enemySpacing,
            width: 100,
            height: 100
        });
    }
}
function getHitbox(obj) {
    return {
        x: obj.x + obj.width / 2,
        y: obj.y + obj.height / 2,
        rx: obj.width * 0.2,
        ry: obj.height * 0.45
    };
}
function isColliding(a, b) {
    const dx = (a.x - b.x) / (a.rx + b.rx);
    const dy = (a.y - b.y) / (a.ry + b.ry);

    return (dx * dx + dy * dy) < 1;
}
function checkCollision() {
    const playerBox = getHitbox(player);

    if (game.shieldUnlocked == true) {
        for (let e of enemies) {
            const enemyBox = getHitbox(e);
            if (isColliding(playerBox, enemyBox)) {
                console.log("Shield blocked a hit!");
                e.y = -200;
                e.x = lanes[Math.floor(Math.random() * lanes.length)];
                game.shieldUnlocked = false;
            }
        }

    }
    else {
        for (let e of enemies) {
            const enemyBox = getHitbox(e);
            if (isColliding(playerBox, enemyBox)) {
                crashSound.currentTime = 0;
                crashSound.play();
                game.gameOver = true;
            }
        }
    }
}

// Spelloop
function restartGame() {
    game.score = 0;
    game.speed = 5;
    game.gameOver = false;
    game.paused = false;
    game.storeOpen = false;
    player.x = game.laneMid;
    game.shieldUnlocked = false;
    createEnemies();
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    drawPlayer();
    drawEnemies();
    if (game.debugHitbox) {
        drawHitbox(player, "lime");
        for (let e of enemies) {
            drawHitbox(e, "red");
        }
    }
    drawUI();

    if (!game.gameOver && !game.paused) {
        updatePlayer();
        drawShieldEffect();
        updateEnemies();
        checkCollision();
    }
    requestAnimationFrame(gameLoop);
}

createEnemies();
gameLoop();