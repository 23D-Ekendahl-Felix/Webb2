const buttons = document.querySelectorall(".btn");
const valueSpan = document.getElementById(".value");

let counter = 0;

buttons[0].addEventListener("click", function() {
  counter--;
  valueSpan.textContent = counter;
});

buttons[1].addEventListener("click", function() {
  counter++;
  valueSpan.textContent = counter;
});
buttons[2].addEventListener("click", function() {
  counter = 0;
  valueSpan.textContent = counter;
});
