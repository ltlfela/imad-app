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

//Registration

var submit = document.getElementById('register_btn');
submit.onclick = function () {
    
  var request = new XMLHttpRequest();
  
  // Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              alert('Registration successfully');
  }else if (request.status === 500) {
      alert('Something went wrong');
          }
      }
      // NOt done yet
  };
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  request.open('POST', 'http://ltlfela.imad.hasura-app.io/create-user', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
  
};

//Submit username/password

var submit = document.getElementById('login_btn');
submit.onclick = function () {
    
    // Create a request object to the counter endpoint
  var request = new XMLHttpRequest();
  
  // Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              alert('logged in successfully');
  } else if (request.status === 403) {
      alert('Username/password not correct');
  }else if (request.status === 500) {
      alert('Something went wrong');
          }
      }
      // NOt done yet
  };
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  console.log(username);
  console.log(password);
  
  request.open('POST', 'http://ltlfela.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
  
};