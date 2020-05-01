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
const tomatoCounter = document.querySelector(".pomodoro-counter");
const alarm = document.getElementById("alarm");
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
submit.addEventListener('click', () => {
    startTimer();
    pageState();
});
play.addEventListener('click', () => {
    if(!isNaN(workInterval)){
    timer(secondsLeft);
    }

});
pause.addEventListener('click', () => {clearInterval(countdown);});
restart.addEventListener('click', () => {
    if(initiate.innerHTML == "BREAK"){
        timer(breakSeconds);
    }
    else if(initiate.innerHTML == "WORK"){
        timer(workSeconds);
    }
});

//Timer function, sets countdown
function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);

        if(secondsLeft < 1){
            clearInterval(countdown);
            if(isWork){
                timer(breakSeconds);
                isWork = false;
                isBreak = true;
                alarm.play();
                initiate.innerHTML = "BREAK";
            }
            else if(isBreak){
                timer(workSeconds);
                isBreak = false;
                isWork = true;
                alarm.play();
                initiate.innerHTML = "WORK";
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
    workInterval = workTime.value;
    breakInterval = breakTime.value;
    tomatoes = pomodoros.value;
    workSeconds = workInterval * 60;
    breakSeconds = breakInterval * 60;
    isWork = true;
    initiate.innerHTML = "WORK";
    timer(workSeconds);
}


/* 
when work interval done, plays alarm, changes to break time(declaration),

appends a pomodoro to the bottom of the screen

when break interval done, plays alarm, starts another work interval

when pomodoros done...plays victory lap..
*/