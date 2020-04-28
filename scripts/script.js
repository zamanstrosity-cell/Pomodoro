const settings = document.getElementById("settings-image");
const menu = document.querySelector(".menu");
const clock = document.querySelector(".clock-container");
const timer = document.querySelector(".work-timer");
const submit = document.querySelector(".submit");
const pomodoros = document.querySelector("#pomodoros");
const workTime = document.querySelector("#time");
const breakTime = document.querySelector("#break");

let workInterval, breakInterval, tomatoes, minutes;
let seconds = 0;
function pageState(){ //Sets the page view
    if (menu.style.visibility == "visible") {
        menu.style.visibility = "hidden";
        clock.style.visibility = "visible"
    }
    else {
        menu.style.visibility = "visible";
        clock.style.visibility = "hidden";
    }
}

settings.addEventListener('click', pageState); //changes view when settingas is clicked

submit.addEventListener('click', () => { //sets the variables when submit
    workInterval = workTime.value;
    breakInterval = breakTime.value;
    tomatoes = pomodoros.value;
    pageState();
    setInterval(countDown, 1000);
})

function countDown(){
    minutes = workInterval;
    if (seconds == 0){
        minutes--;
        seconds = 59;
    }
    seconds--;
    timer.innerHTML = `${minutes}:${seconds}`;
}


