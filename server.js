var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');

var config = {
    user: 'ltlfela',
    database: 'ltlfela',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
var htmlTemplate = `
<html>
<head>
    <title>
        ${title}
    </title>
    <meta name="viewpoint" content="width=device-width, initial-scale=1">
  <link href="/ui/style.css" rel="stylesheet" />
</head>    
<body>
    <div class="container">
    <div>
        <a href="/">Home</a>
    </div>
    <hr/>
    <h3> ${heading}</h3>
    <div>
        ${date.tDateString()}
    </div>
    <div>
        ${content}
    </div>
    </div> 
</body>

</html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var pool = new Pool(config);

app.get('/test-db', function(req, res) {
     pool.query('SELECT * FROM test', function(err, result) {
         if (err) {
             res.status(500).send(err.toString());
         }
             else {
                 res.send(JSON.stringify(result.rows));
             }
     });
});

var names = [];
app.get('/submit-name', function(req, res) {
    //Get the name from the request
    var name = req.query.name;
    names.push(name);
    // JSON; Javascript Object Notation
    res.send(JSON.stringify(names)); //To Do
});

app.get('/articles/:articleName', function(req, res) {
    // articleName == article-one
    // articles[aarticlesname] == {} content object for article one
 
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0) {
                res.status(404).send('Article not found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
            }
        });
    }); 


app.get('/ui/:fileName', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', req.params.fileName));
});


var port = 80; // Use 8080 for local development because you might already have apache running on 80
app.listen(80, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


