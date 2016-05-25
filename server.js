
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require("request");

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/app/'));
app.use('/node', express.static(__dirname + '/node_modules/'));

app.use(bodyParser.json());

app.post('/api/search', function (req, res) {
  var cat = req.body.cat;
  var url = 'https://en.wikipedia.org/w/api.php?action=query&generator=allcategories&gacprefix=' + cat + '&prop=info&format=json';
  request(url, function(error, response, body) {
    var cats = JSON.parse(body);
    if(error) {
      console.error(error);
    }
    else if(!cats.query) {
      console.error('no results');
    }
    else {
      res.status(200).send(cats.query.pages);
    }
  });
});

app.post('/api/list', function (req, res) {
  var cat = req.body.cat;
  var url = 'https://en.wikipedia.org/w/api.php?action=query&generator=categorymembers&gcmtitle=' + cat + '&prop=info&inprop=url&format=json';
  request(url, function(error, response, body) {
    var list = JSON.parse(body);
    if(error) {
      console.error(error);
    }
    else if(!list.query) {
      console.error('no results');
    }
    else {
      res.status(200).send(list.query.pages);
    }
  });
});

app.listen(port);
console.log("Express server listening on port", port, app.settings.env);
