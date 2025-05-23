// Get canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Game variables
var gameRunning = false, gameInterval, leftPlayerScore = 0, rightPlayerScore = 0;
var maxScore = 10, paddleHeight = 80, paddleWidth = 10, paddleSpeed = 10, ballRadius = 10;

// Ball and paddle properties
var ballX = canvas.width / 2, ballY = canvas.height / 2, ballSpeedX = 5, ballSpeedY = 5;
var leftPaddleY = canvas.height / 2 - paddleHeight / 2, rightPaddleY = leftPaddleY;

// Key states
var upPressed = false, downPressed = false, wPressed = false, sPressed = false;

// Initialize game
function init() {
    draw();
    
    // Setup key events
    document.onkeydown = function(e) {
        if (e.key === "ArrowUp") upPressed = true;
        else if (e.key === "ArrowDown") downPressed = true;
        else if (e.key.toLowerCase() === "w") wPressed = true;
        else if (e.key.toLowerCase() === "s") sPressed = true;
    };
    
    document.onkeyup = function(e) {
        if (e.key === "ArrowUp") upPressed = false;
        else if (e.key === "ArrowDown") downPressed = false;
        else if (e.key.toLowerCase() === "w") wPressed = false;
        else if (e.key.toLowerCase() === "s") sPressed = false;
    };
    
    // Setup buttons
    document.getElementById("start-btn").onclick = startGame;
    document.getElementById("pause-btn").onclick = pauseGame;
    document.getElementById("restart-btn").onclick = restartGame;
    document.getElementById("message-modal-close").onclick = hideModal;
    document.getElementById("play-again-btn").onclick = restartGame;
}

// Game control functions
function startGame() { if (!gameRunning) { gameRunning = true; gameInterval = setInterval(loop, 16); } }
function pauseGame() { gameRunning = false; clearInterval(gameInterval); }
function restartGame() { leftPlayerScore = 0; rightPlayerScore = 0; hideModal(); reset(); if (!gameRunning) startGame(); }
function hideModal() { document.getElementById("message-modal").style.display = "none"; }

// Main game loop
function loop() {
    if (gameRunning) {
        update();
        draw();
    }
}

// Update game state
function update() {
    // Move paddles
    if (upPressed && rightPaddleY > 0) rightPaddleY -= paddleSpeed;
    if (downPressed && rightPaddleY + paddleHeight < canvas.height) rightPaddleY += paddleSpeed;
    if (wPressed && leftPaddleY > 0) leftPaddleY -= paddleSpeed;
    if (sPressed && leftPaddleY + paddleHeight < canvas.height) leftPaddleY += paddleSpeed;
    
    // Move ball and handle collisions
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Ball collision with top/bottom
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) ballSpeedY = -ballSpeedY;
    
    // Ball collision with paddles
    if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        ballSpeedY = (ballY - (leftPaddleY + paddleHeight/2)) * 0.2;
    }
    
    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        ballSpeedY = (ballY - (rightPaddleY + paddleHeight/2)) * 0.2;
    }
    
    // Score points
    if (ballX < 0) { rightPlayerScore++; reset(); }
    else if (ballX > canvas.width) { leftPlayerScore++; reset(); }
    
    // Check for win
    if (leftPlayerScore >= maxScore) { playerWin("Left player"); pauseGame(); }
    else if (rightPlayerScore >= maxScore) { playerWin("Right player"); pauseGame(); }
}

// Reset ball position
function reset() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = Math.random() > 0.5 ? 5 : -5;
    ballSpeedY = Math.random() * 4 - 2;
}

// Show winning message
function playerWin(player) {
    document.getElementById('message').textContent = `Congratulations! ${player} wins!`;
    document.getElementById('message-modal').style.display = 'block';
}

// Draw game elements
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw center line
    ctx.beginPath();
    ctx.setLineDash([5, 15]);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#FFF";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw elements
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFEB3B";
    ctx.fill();
    
    ctx.fillStyle = "#00008B";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    
    ctx.fillStyle = "#8B0000";
    ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
    
    // Draw scores
    ctx.fillStyle = "#FFF";
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`${leftPlayerScore}`, canvas.width / 4, 30);
    ctx.fillText(`${rightPlayerScore}`, 3 * canvas.width / 4, 30);
}

// Initialize on window load
window.onload = init;