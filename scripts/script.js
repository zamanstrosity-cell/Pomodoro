//Element selectors
const settings = document.getElementById("settings-image");
const menu = document.querySelector(".menu");
const clock = document.querySelector(".clock-container");
const play = document.getElementById("start-image");
const pause = document.getElementById("pause-image");
const restart = document.getElementById("restart-image");
const timerDisplay = document.querySelector(".work-timer");
const submit = document.querySelector(".submit");
const pomodoros = document.querySelector("#pomodoros");
const workTime = document.querySelector("#time");
const breakTime = document.querySelector("#break");
const initiate = document.querySelector(".declaration");
//global variables
let workInterval, breakInterval, tomatoes, seconds, countdown;
let isBreak = false;
let isWork = false;
let secondsLeft;

//Sets the page view
function pageState(){ 
    if (menu.style.visibility == "visible") {
        menu.style.visibility = "hidden";
        clock.style.visibility = "visible"
    }
    else {
        menu.style.visibility = "visible";
        clock.style.visibility = "hidden";
    }
}

//Event Listeners
settings.addEventListener('click', pageState); 
submit.addEventListener('click', startTimer);
/* play.addEventListener('click', pauseTimer); */


//Timer function, sets countdown
function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 0){
            clearInterval(countdown);
            if(isWork){
                timer(breakSeconds);
                isWork = false;
                isBreak = true;
                initiate.innerHTML = "Break";
            }
            else if(isBreak){
                timer(workSeconds);
                isBreak = false;
                isWork = true;
                initiate.innerHTML = "Work";
            }
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds/ 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0': ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
}

function startTimer(){
    pageState();
    workInterval = workTime.value;
    breakInterval = breakTime.value;
    tomatoes = pomodoros.value;
    workSeconds = workInterval * 60;
    breakSeconds = breakInterval * 60;
    isWork = true;
    timer(workSeconds);
}
/* 
if(isWork && secondsLeft <= 0){
    isWork = false;
    isBreak = true;
    timer(breakSeconds);
    initiate.innerHTML = "Break!";
}

 */
/* 
Takes Work Time/Break Time/pomodoros

Declares the session you're in ("work, break")

Display Work Countdown on screen

When paused...pause the clock

when rewind, restarts the clock it's on 

when play, continues the clock

when work interval done, plays alarm, changes to break time(declaration),

appends a pomodoro to the bottom of the screen

when break interval done, plays alarm, starts another work interval

when pomodoros done...plays victory lap..
*/