const gameboard = document.querySelector("#gameboard");
const ctx = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbutton = document.querySelector("#resetbut");
const boardBackground = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodcolor = "red";
const unitsize = 25;
const gameHeight = gameboard.height;
const gameWidth = gameboard.width;

let gameRunning = false;
let xVelocity = unitsize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
  {x: unitsize * 4 , y: 0},
  {x: unitsize * 3, y: 0},
  {x: unitsize *2, y: 0},
  {x: unitsize, y: 0},
  {x: 0, y: 0}
];

window.addEventListener("keydown", changeDirection);
resetbutton.addEventListener("click", resetGame);

gameStart();

function gameStart(){
  gameRunning = true;
  scoretext.textContent = score;
  createFood();
  drawFood();
  nextTic();
}
function nextTic(){
if(gameRunning){
  setTimeout(() => {
  clearBoard();
  drawFood();
  moveSnake();
  drawSnake();
  checkGameover();
  nextTic();
  }, 75)
}
else{
  displayGameOver();
}
}
function clearBoard(){
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0,0,gameHeight, gameWidth);
}
function createFood(){
  function randfood(min, max){
    const randNum = Math.round((Math.random() * (max - min) + min)  / unitsize) * unitsize;
    return randNum;
  }
  foodX = randfood(0, gameWidth - unitsize);
  foodY = randfood(0, gameHeight- unitsize);
}
function drawFood(){
  ctx.fillStyle = foodcolor;
  ctx.fillRect(foodX, foodY, unitsize, unitsize);
}
function moveSnake(){
  const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
  };

  snake.unshift(head);
  if(snake[0].x == foodX && snake[0].y == foodY){
    score+=1;
    scoretext.textContent = score;
    createFood();
  }
  else{
    snake.pop();
  }
}
function drawSnake(){
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;

  snake.forEach(snakepart => {
    ctx.fillRect(snakepart.x, snakepart.y, unitsize, unitsize);
    ctx.strokeRect(snakepart.x, snakepart.y, unitsize, unitsize);
  })
}
function changeDirection(event){
  const keyPressed = event.keyCode;
  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;

  let goingUp = (yVelocity == -unitsize);
  let goingDown = (yVelocity == unitsize);
  let goingLeft = (xVelocity == -unitsize);
  let goingRight = (xVelocity == unitsize);

  switch(true){
    case (keyPressed == LEFT && !goingRight):
      xVelocity = -unitsize;
      yVelocity = 0;
      break;

    case (keyPressed == RIGHT && !goingLeft):
      xVelocity = unitsize;
      yVelocity = 0;
      break;

    case (keyPressed == UP && !goingDown):
      xVelocity = 0;
      yVelocity = -unitsize;
      break;

    case (keyPressed == DOWN && !goingUp):
      xVelocity = 0;
      yVelocity = unitsize;
      break;
  }
}
function checkGameover(){
  switch(true){
    case (snake[0].x < 0):
      gameRunning = false;
      break;
    
    case (snake[0].x >= gameWidth):
      gameRunning = false;
      break;

    case (snake[0].y < 0):
      gameRunning = false;
      break;

    case (snake[0].y >= gameHeight):
      gameRunning = false;
      break;
  }
  for(let i = 1; i < snake.length; i++){
    if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
      gameRunning = false;
    }
  }
}
function displayGameOver(){
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over!", gameWidth/2, gameHeight/2);
  gameRunning = false;
}
function resetGame(){
  score = 0;
  snake = [
      {x: unitsize * 4 , y: 0},
      {x: unitsize * 3, y: 0},
      {x: unitsize *2, y: 0},
      {x: unitsize, y: 0},
      {x: 0, y: 0}
    ];
  xVelocity = unitsize;
  yVelocity = 0;
  gameStart();
}