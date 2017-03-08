var Express = require("express");
var path    = require("path");

var app = Express();

app.use(Express.static('dist'));
app.set('views', __dirname);

app.set('view engine', 'handlebars');


//assuming app is express Object.
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080);
console.log('Express app listening on ' + 8080);
