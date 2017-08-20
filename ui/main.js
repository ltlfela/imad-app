//Counter code
console.log("JS Loaded");
var button = document.getElementById('counter');
var counter = 0;

button.onclick = function () {
  
  counter = counter + 1;
   var span = document.getElementById('count');
   span.innerHTML = counter.toString();
};
console.log("Things went perfect");