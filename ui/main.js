//Counter code
console.log("JS Loaded");
            var button = document.getElementById('counter');
            var counter = 0;
            
             button.onclick = function() {
              //make a request to counter endpoint
               //capture the response and store it in a variable
               //render the variable in correct span

              counter = counter + 1;
              var span = document.getElementById('count');
              span.innerHTML = counter.toString();
              };
              console.log("Things went perfect");