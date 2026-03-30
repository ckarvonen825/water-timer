const images = [
  'images/forest.jpg',
  'images/ocean.jpg', 
  'images/sunset.jpg',
  'images/night.jpg'
];

const buttons = document.querySelectorAll(".theme-buttons button");
const soundButtons = document.querySelectorAll(".sound-buttons button");

images.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = () => console.log(src + ' preloaded!');
});

let selectedSound = "chime";

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

buttons.forEach(function(button) {
  button.addEventListener('click', setTheme);
});

soundButtons.forEach(function(soundButton) {
  soundButton.addEventListener('click', setSound);
});