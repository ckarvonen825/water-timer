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
const understandBtn = document.querySelector("understandBtn");

const silentLoop = new Audio('sounds/silence.mp3');
silentLoop.loop = true;


let milliseconds;
let targetTime;
const circum = 471;
let seconds;
let remainingSeconds;
let interval;
let sips = 0;
let selectedSound = null;

images.forEach(src => { //preloading images
  const img = new Image();
  img.src = src;
});

function dismissWarning() {
    document.getElementById('mobile-warning').classList.add('hidden');
}

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

function showNotification(){
  const notification = new Notification("Hello!", {
    body: "Time for a sip of water!\nSips: " + sips
    //icon: 
  });
}

function requestPermission(){
  if(Notification.permission === "granted"){
    return;
  }else if(Notification.permission !== "denied"){
  Notification.requestPermission();
  }
}


function start() {

  silentLoop.play().catch(error => {
        console.log("Silent loop failed.", error);
  });

  requestPermission();

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
      remainingSeconds = Math.max(0, Math.ceil(remainingMilliseconds / 1000)); //doesnt let it go bellow 0
      timerCircle.style.strokeDashoffset = circum - (remainingSeconds / seconds * circum);
      if(remainingSeconds <= 0){
        sips++;
        showNotification();
        new Audio('sounds/' + selectedSound + '.wav').play();
        targetTime = Date.now() + (seconds * 1000);
        sipCounter.innerHTML = "Sips: " + sips;
      }
      
      let displayMinutes = Math.floor(Math.max(0, remainingSeconds) / 60);
      let displaySeconds = Math.max(0, remainingSeconds) % 60;
      timerText.textContent = String(displayMinutes).padStart(2, '0') + ":" + String(displaySeconds).padStart(2, '0');
      console.log(String(displayMinutes).padStart(2, '0') + ":" + String(displaySeconds).padStart(2, '0'));


    }, 1000);
}

function stopTimer(){
    silentLoop.pause();
    silentLoop.currentTime = 0;

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

understandBtn.addEventListener("click", dismissWarning);
  







