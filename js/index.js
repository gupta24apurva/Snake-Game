//Game constsnts and variables
let inputDir={x: 0, y: 0};
let foodSound=new Audio('music/food.mp3');
let gameOverSound=new Audio('music/gameover.mp3');
let moveSound=new Audio('music/move.mp3');
let snakeArr=[{x:13,y:15}];
let lastPaintTime=0;
food={x:6, y:7};
let score=0;
let speed=7;

//Game functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed)
    return;
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    //if snake bumps into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        return true;
    }
        if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        return true;
    
}
function gameEngine()
{


    //Part 1: Updating the snake and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again");
        snakeArr=[{x:13,y:15}];
        score=0;
        scoreBox.innerHTML="Score: "+score;
    }
    
    
    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
    {
        foodSound.play();
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="Highest Score: "+hiscoreval;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    //Moving the snake
    for (let i = snakeArr.length-2; i >=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};  
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    let easy=document.getElementById('easy');
    let med=document.getElementById('med');
    let hard=document.getElementById('hard');
    easy.addEventListener('click',()=>{
        easy.style.backgroundColor="black";
        easy.style.color="white";
        med.style.backgroundColor="white";
        med.style.color="black";
        hard.style.backgroundColor="white";
        hard.style.color="black";
        speed=7;
        selected=true;
    })
    med.addEventListener('click',()=>{
        med.style.backgroundColor="black";
        med.style.color="white";
        easy.style.backgroundColor="white";
        easy.style.color="black";
        hard.style.backgroundColor="white";
        hard.style.color="black";
        speed=12;      
        selected=true;  
    })
    hard.addEventListener('click',()=>{
        hard.style.backgroundColor="black";
        hard.style.color="white";
        easy.style.backgroundColor="white";
        easy.style.color="black";
        med.style.backgroundColor="white";
        med.style.color="black";
        speed=16;
        selected=true;
    })

    //Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        snakeElement.classList.add('head');
        else
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });
    //Display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);    
}






//Main logic
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else
{
    hiscoreval=JSON.parse(hiscore);
    hiscoreBox.innerHTML="Highest Score: "+ hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0, y:1} //Start the game
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
            
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        
        default:
            break;
    }
});