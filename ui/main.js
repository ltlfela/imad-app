
function loadLoginForm () {

var loginHTML = `
<h3>Login/Register to unluck greatness</h3>
<div> 
<input type="text" id="username" placeholder="username" />
<input type="password" id="password" />
<br/>
<input type="submit" value="Login" id="login_btn" />
<input type="submit" value="Register" id="register_btn" />
</div>
`;

document.getElementById('login_area').innerHTML = loginHTML;

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
              submit.value = 'Success';
  } else if (request.status === 403) {
      submit.value = 'Invalid credentials. Try again?';
  }else if (request.status === 500) {
      alert ('Something went wrong');
      submit.value = 'Login';
          } else {
              alert ('Something went wrong');
      submit.value = 'Login'; 
          }
          loadLogin();
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
  
  submit.value = 'Loggin in...';
  
};
  
  //Registration

var register = document.getElementById('register_btn');
register.onclick = function () {
    
  var request = new XMLHttpRequest();
  
  // Capture the response and store it in a variable
  request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              alert('Registration successfully');
              register.value = 'Registered ass';
  } else {
      alert('Something went wrong, cannot register ass');
      register.value = 'Register';
          }
      }
      // NOt done yet
  };
  
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  
  request.open('POST', 'http://ltlfela.imad.hasura-app.io/create-user', true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({username: username, password: password}));
  
  register.value = 'Registering...';
};
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
    <h3> Hi ass <i> ${username} </i></h3>
    <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}

//Counter code
function counter () {
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
}

//Submit Name
function submitName () {
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
}

loadLogin();

loadArticles();
