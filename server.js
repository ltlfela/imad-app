var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
     'article-one': {
    title: 'Article One | IMAD',
    heading: 'Article One',
    date: 'Sep 5, 2017',
    content:`
    <p>
            This is the content for my first trail. his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.
        </p>
        <p>
            This is the content for my first trail. his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.
        </p> 
         `
},
     'article-two': {
         title: 'Article Two | IMAD',
    heading: 'Article Two',
    date: 'Sep 5, 2017',
    content:`
    <p>
            This is the content for my first trail. his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.
        </p>
        <p>
            This is the content for my first trail. his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.
        </p> 
         `
     },
     'article-three': {
         title: 'Article Three | IMAD',
    heading: 'Article Three',
    date: 'Sep 5, 2017',
    content:`
    <p>
            This is the content for my first trail. his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.
        </p>
        <p>
            This is the content for my first trail. his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.his is the content for my first trail.
        </p>
        }
         `
}
}; 
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
        ${date}
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

app.get("/:articleName", function(req, res) {
    // articleName == article-one
    // articles[aarticlesname] == {} content object for article one
    var articleName = req.params.articleName;
   res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
