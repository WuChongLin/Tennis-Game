// Game Variables
let gameMode = null; // 'single' or 'multi'
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// Game Objects
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 8,
    speedX: 5,
    speedY: 5
};

let paddle1 = {
    x: 20,
    y: canvas.height / 2 - 50,
    width: 15,
    height: 100,
    speed: 6,
    dirY: 0
};

let paddle2 = {
    x: canvas.width - 35,
    y: canvas.height / 2 - 50,
    width: 15,
    height: 100,
    speed: 6,
    dirY: 0
};

let score = {
    player1: 0,
    player2: 0
};

let gameRunning = false;
let animationId = null;

// Start Single Player
function startSinglePlayer() {
    gameMode = 'single';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('player1Name').textContent = 'Tu';
    document.getElementById('player2Name').textContent = 'AI Bot';
    document.getElementById('controls').textContent = 'Muovi con: W (su) - S (giù)';
    resetBall();
    gameRunning = true;
    gameLoop();
}

// Start Multiplayer
function startMultiplayer() {
    gameMode = 'multi';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'block';
    document.getElementById('player1Name').textContent = 'Giocatore 1';
    document.getElementById('player2Name').textContent = 'Giocatore 2';
    document.getElementById('controls').textContent = 'P1: W (su) - S (giù) | P2: ↑ (su) - ↓ (giù)';
    resetBall();
    gameRunning = true;
    gameLoop();
}

// Reset Ball
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = (Math.random() > 0.5 ? 1 : -1) * 5;
    ball.speedY = (Math.random() - 0.5) * 8;
}

// Reset Game
function resetGame() {
    score.player1 = 0;
    score.player2 = 0;
    updateScore();
    resetBall();
    gameRunning = true;
}

// Back to Menu
function backToMenu() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    document.getElementById('menu').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('gameStatus').textContent = '';
    
    // Reset input
    paddle1.dirY = 0;
    paddle2.dirY = 0;
}

// Keyboard Events
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key.toUpperCase()) {
        case 'W':
            paddle1.dirY = -1;
            break;
        case 'S':
            paddle1.dirY = 1;
            break;
        case 'ARROWUP':
            paddle2.dirY = -1;
            break;
        case 'ARROWDOWN':
            paddle2.dirY = 1;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key.toUpperCase()) {
        case 'W':
        case 'S':
            if (gameMode === 'multi' || gameMode === 'single') {
                paddle1.dirY = 0;
            }
            break;
        case 'ARROWUP':
        case 'ARROWDOWN':
            paddle2.dirY = 0;
            break;
    }
});

// Update Paddle Position
function updatePaddle(paddle) {
    paddle.y += paddle.dirY * paddle.speed;
    
    // Boundary check
    if (paddle.y < 0) {
        paddle.y = 0;
    }
    if (paddle.y + paddle.height > canvas.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

// AI Logic for Single Player
function updateAI() {
    const paddleCenter = paddle2.y + paddle2.height / 2;
    const ballCenter = ball.y;
    const difficulty = 5; // AI difficulty
    
    if (ballCenter < paddleCenter - 35) {
        paddle2.dirY = -1;
    } else if (ballCenter > paddleCenter + 35) {
        paddle2.dirY = 1;
    } else {
        paddle2.dirY = 0;
    }
    
    updatePaddle(paddle2);
}

// Update Ball
function updateBall() {
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    
    // Top and bottom collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.speedY = -ball.speedY;
        ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
    }
    
    // Paddle collision
    if (
        ball.x - ball.radius < paddle1.x + paddle1.width &&
        ball.y > paddle1.y &&
        ball.y < paddle1.y + paddle1.height
    ) {
        ball.speedX = -ball.speedX;
        ball.x = paddle1.x + paddle1.width + ball.radius;
        // Add spin based on paddle position
        ball.speedY += (paddle1.y + paddle1.height / 2 - ball.y) * 0.1;
        ball.speedX *= 1.05; // Increase speed slightly
    }
    
    if (
        ball.x + ball.radius > paddle2.x &&
        ball.y > paddle2.y &&
        ball.y < paddle2.y + paddle2.height
    ) {
        ball.speedX = -ball.speedX;
        ball.x = paddle2.x - ball.radius;
        // Add spin based on paddle position
        ball.speedY += (paddle2.y + paddle2.height / 2 - ball.y) * 0.1;
        ball.speedX *= 1.05; // Increase speed slightly
    }
    
    // Scoring
    if (ball.x - ball.radius < 0) {
        score.player2++;
        updateScore();
        resetBall();
    }
    
    if (ball.x + ball.radius > canvas.width) {
        score.player1++;
        updateScore();
        resetBall();
    }
}

// Draw Functions
function drawCourt() {
    // Background
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Center line
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Court boundaries
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
    ctx.fillStyle = '#ffeb3b';
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawPaddle(paddle) {
    ctx.fillStyle = '#3498db';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = '#2c3e50';
    ctx.lineWidth = 2;
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawNet() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 80);
    ctx.lineTo(canvas.width / 2, canvas.height - 80);
    ctx.stroke();
}

// Update Score Display
function updateScore() {
    document.getElementById('player1Score').textContent = score.player1;
    document.getElementById('player2Score').textContent = score.player2;
    document.getElementById('gameScore1').textContent = score.player1;
    document.getElementById('gameScore2').textContent = score.player2;
}

// Main Game Loop
function gameLoop() {
    if (!gameRunning) return;
    
    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCourt();
    drawNet();
    
    // Update
    updatePaddle(paddle1);
    if (gameMode === 'single') {
        updateAI();
    } else {
        updatePaddle(paddle2);
    }
    updateBall();
    
    // Draw
    drawPaddle(paddle1);
    drawPaddle(paddle2);
    drawBall();
    
    // Continue loop
    animationId = requestAnimationFrame(gameLoop);
}
