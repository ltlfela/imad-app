//Counter code
var button = document.getElementById('counter');
var counter = 0;

button.onclick = function () {
  
  // Create a request object to the counter endpoint
  var request = new XMLHttpRequest();
  
  // Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.Done) {
          // Take some action
          if (request.status === 200) {
              var counter = request.responseText;
              span.innerHTML = counter.toString();
          }
      }
      // NOt done yet
  };
  
  // Make the request
  request.open('GET', 'http://ltlfela.imad.hasura-app.io/counter', true);
  
};
console.log("main.js loaded");