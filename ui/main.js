//Counter code
var button = document.getElementById('counter');

button.onclick = function () {
  
  // Create a request object to the counter endpoint
  var request = new XMLHttpRequest();
  
  // Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              var counter = request.responseText;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
          }
      }
      // NOt done yet
  };
  
  // Make the request
  request.open('GET', 'http://ltlfela.imad.hasura-app.io/counter', true);
  request.send(null);
};

//Submit Name


var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    
    // Create a request object to the counter endpoint
  var request = new XMLHttpRequest();
  
  // Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              var names = request.responseText;
              names = JSON.parse(names);
  var list = '';
  for (var i=0; i<names.length; i++) {
      list += '<li>' + names[i] + '</li>';
  }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
          }
      }
      // NOt done yet
  };
  
  var nameInput = document.getElementById('name');
var name = nameInput.value;
  
  // Make the request
  request.open('GET', 'http://ltlfela.imad.hasura-app.io/submit-name?name=' + name, true);
  request.send(null);
  
  
};

//Submit username/password


var submit2 = document.getElementById('submit_btn2');
submit2.onclick = function () {
    
    // Create a request object to the counter endpoint
  var request2 = new XMLHttpRequest();
  
  // Capture the response and store it in a variable
  request2.onreadystatechange = function () {
      if (request2.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request2.status === 200) {
              alert('logged in successfully');
  } else if (request2.status === 403) {
      alert('Username/password not correct');
  }else if (request2.status === 500) {
      alert('Something went wrong');
          }
      }
      // NOt done yet
  };
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  console.log(username);
  console.log(password);
  
  request2.open('POST', 'http://ltlfela.imad.hasura-app.io/login', true);
  request2.setRequestHeader('Content-Type', 'application/json');
  request2.send(JSON.stringify({username: username, password: password}));
  
};
