const settings = document.getElementById("settings-image");
const menu = document.querySelector(".menu");
const clock = document.querySelector(".clock-container");
const timer = document.querySelector(".work-timer");
const submit = document.querySelector(".submit");
const pomodoros = document.querySelector("#pomodoros");
const workTime = document.querySelector("#time");
const breakTime = document.querySelector("#break");

let workInterval, breakInterval, tomatoes;

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


settings.addEventListener('click', pageState);

function countDown() {
    counter--;
    timer.innerHTML = counter;
}


submit.addEventListener('click', () => {
    workInterval = workTime.value;
    breakInterval = breakTime.value;
    tomatoes = pomodoros.value;
    pageState();
    
})