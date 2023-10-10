const playBoard = document.querySelector(".playboard");
const divMain = document.getElementById('div-main');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');

function saludar() {
    let jugador = prompt("Hola, ¿cuál es tu nombre de jugador?");
    if (jugador === null) {
      alert("Ingrese su nombre de jugador porfavor");
      return;
    }
    alert(`Hola ${jugador}! Buena suerte jugando Snake Game. Recuerda mover las flechas para iniciar el juego. Puedes hacer clic en la pantalla para ampliarla y tener una mejor jugabilidad. ¡Buena suerte! 😊`);
  }
  saludar();

divMain.addEventListener("click", ()=>{
    divMain.style.transition = `all 0.3s`
    divMain.style.transform = `scale(1.1)`;
})

let gameOver = false;
let foodX, foodY;
let SnakeX = 5, SnakeY = 10;
let velocityX = 0, velocityY = 0;
let SnakeBody = [];
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0 ;

const foodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const handleGameOver = () => {
    clearInterval(setIntervalId);
    
    let confirmRequest = confirm("Perdiste, quieres seguir jugando?");

    if(confirmRequest){
        location.reload();
    }else{
        alert("Gracias por jugar!");
        window.close();
    }
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlmarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(SnakeX === foodX && SnakeY === foodY){
        foodPosition();
        SnakeBody.push(foodX, foodY);
        score++;

        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerHTML = `Score: ${score}`;

        highScoreElement.innerHTML = `high-Score: ${highScore}`;
    }

    for(let i = SnakeBody.length - 1; i > 0; i--){
SnakeBody[i] = SnakeBody[i - 1];
    }

SnakeBody[0] = [SnakeX, SnakeY]

    SnakeX += velocityX;
    SnakeY += velocityY;

if(SnakeX <= 0 || SnakeX > 30 || SnakeY <= 0 || SnakeY > 30){
gameOver = true;
body.style.backgroundColor = "#E52200";
}

for(let i = 0; i < SnakeBody.length; i++){
    htmlmarkup += `<div class="head" style="grid-area: ${SnakeBody[i][1]} / ${SnakeBody[i][0]}"></div>`;
    if(i != 0 && SnakeBody[0][1] === SnakeBody[i][1] && SnakeBody[0][0] === SnakeBody[i][0]){
gameOver = true;

    }
}

    
    playBoard.innerHTML = htmlmarkup;
};

foodPosition();

setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);