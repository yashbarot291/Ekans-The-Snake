var dir={x:0, y:0};
var f_sound= new Audio("music/food.mp3");
var g_sound= new Audio("music/gameover.mp3");
var m_sound= new Audio("music/move.mp3");
var b_sound= new Audio("music/ekans bgm.mp3");
var speed= 5;
var last_time=0;
var snake= [
  {x: 13, y: 15}
];
var food={x: 4, y: 4};
var score=0;






function main(curr_time){
  window.requestAnimationFrame(main);
  // console.log(curr_time);
  if((curr_time-last_time)/1000<(1/speed))
    return;
  last_time=curr_time;
  game_engine();
}
function collision(sarr)
{
  for(var i=1; i<snake.length; i++){
    if(snake[0].x===snake[i].x && snake[0].y ===snake[i].y)
      return true;
  }
  return (snake[0].x>20 || snake[0].x<1 || snake[0].y>20 || snake[0].y<1);
}

function game_engine(){
  b_sound.play();
  // updating snake variable and food
  if(collision(snake))
  {
    g_sound.play();
    b_sound.pause();
    dir={x:0, y: 0};
    alert("Game Over! Press any key to play again.");
    score=0;
    scorebox.innnerHTML="Score: 0";
    snake=[
      {x: 13, y: 15}
    ];
    m_sound.play();
    b_sound.play();
  }
  // if you have eaten the food, snake will grow, new food will be displayed, increment the score
  if(snake[0].x===food.x && snake[0].y===food.y)
  {
    f_sound.play();
    score=score+1;
    scorebox.innerHTML="Score: "+ score;
    // score.innerHTML="";
    snake.unshift({x: snake[0].x+dir.x, y :snake[0].y+dir.y});
    food={x: Math.round(1+17*Math.random()), y: Math.round(1+17*Math.random())};
  }
  //snake movement
  for(var i=snake.length-1; i>=1; i--)
  {
    snake[i]={...snake[i-1]};
  }
  snake[0].x+=dir.x;
  snake[0].y+=dir.y;
  //display food and snake
  board.innerHTML = "";
  snake.forEach((e, index)=>{
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      if(index==0){
        snakeElement.classList.add("head");
      }
      else
        snakeElement.classList.add("sbody");
      board.appendChild(snakeElement);
  });
  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}







// var hiscore= localStorage.getItem("hiscore");
// if(hiscore === null)
// {
//   localStorage.setItem("hiscore", 0);
// }
window.requestAnimationFrame(main);
document.addEventListener('keydown', function(e){

  switch(e.key){
    case "ArrowUp":
      m_sound.play();
      console.log("up");
      dir={x:0, y:-1};
      break;

    case "ArrowDown":
      m_sound.play();
      console.log("Down");
      dir={x:0, y:1};
      break;

    case "ArrowRight":
      m_sound.play();
      console.log("right");
      dir={x:1, y:0};
      break;

    case "ArrowLeft":
      m_sound.play();
      console.log("left");
      dir={x:-1, y:0};
      break;

    default:
      break;
  }
});
