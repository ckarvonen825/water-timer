const images = [
  'images/forest.jpg',
  'images/ocean.jpg',
  'images/sunset.jpg',
  'images/night.jpg'
];

const buttons = document.querySelectorAll(".theme-buttons button");
const soundButtons = document.querySelectorAll(".sound-buttons button");
const timerCircle = document.querySelector("#timerCircle");
const timerText = document.querySelector("#timerText");
const startStop = document.querySelector("#button");
const dropdown = document.querySelector("#time");
const sipCounter = document.querySelector("#sipCounter");


let milliseconds;
let targetTime;
const circum = 471;
let seconds;
let remainingSeconds;
let interval;
let sips = 0;

images.forEach(src => {
  const img = new Image();
  img.src = src;
});

let selectedSound = null;

function setTheme(event){
  let theme = event.target.dataset.theme;
  buttons.forEach(function(button) {
    button.classList.remove("active");
  });
  event.target.classList.add("active");
  document.body.classList.remove("theme-forest", "theme-sunset", "theme-night", "theme-ocean");
  document.body.classList.add("theme-" + theme);
}

function setSound(event) {
  selectedSound = event.target.dataset.sound;
  soundButtons.forEach(function(soundButton) {
    soundButton.classList.remove("active");
  });
  event.target.classList.add("active");
  new Audio('sounds/' + selectedSound + '.wav').play();
}



function start() {
  seconds = dropdown.value * 60;
  remainingSeconds = seconds;
  milliseconds = remainingSeconds * 1000;
  targetTime = Date.now() + milliseconds;
  
  remainingSeconds = Math.ceil(milliseconds / 1000);

  if(selectedSound === null){
    selectSoundAlert.classList.add("visible");

  setTimeout(function() {
    selectSoundAlert.classList.remove("visible");
  }, 2000);
  return;
  }

  if(startStop.innerHTML === "Start"){
    startTimer();

  }else if (startStop.innerHTML === "Stop"){
    stopTimer();
  }

}

function startTimer(){
  startStop.innerHTML = "Stop";
  dropdown.disabled = true;

    interval = setInterval(function() {
      const now = Date.now();
      const remainingMilliseconds = targetTime - now;
      remainingSeconds = Math.ceil(remainingMilliseconds / 1000);

      timerCircle.style.strokeDashoffset = circum - (remainingSeconds / seconds * circum);
      if(remainingSeconds <= 0){
        new Audio('sounds/' + selectedSound + '.wav').play();
        targetTime = Date.now() + (seconds * 1000);
        sips++;
        sipCounter.innerHTML = "Sips: " + sips;
      }
      
      let displayMinutes = Math.floor(Math.max(0, remainingSeconds) / 60);
      let displaySeconds = Math.max(0, remainingSeconds) % 60;
      timerText.textContent = String(displayMinutes).padStart(2, '0') + ":" + String(displaySeconds).padStart(2, '0');
      console.log(String(displayMinutes).padStart(2, '0') + ":" + String(displaySeconds).padStart(2, '0'));


    }, 1000);
}

function stopTimer(){
  startStop.innerHTML = "Start";
    dropdown.disabled = false;
    sips = 0;
    clearInterval(interval);
    seconds = 0;
    remainingSeconds = 0;
    timerCircle.style.strokeDashoffset = 0;
    timerText.textContent = `${dropdown.value}:00`;
    sipCounter.innerHTML = "Sips: " + sips;

}


buttons.forEach(function(button) {
  button.addEventListener("click", setTheme);
});

soundButtons.forEach(function(soundButton) {
  soundButton.addEventListener("click", setSound);
});

dropdown.addEventListener("change", function() {
  timerText.textContent = `${dropdown.value}:00`;
});

startStop.addEventListener("click", start);
  







