var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(
    function(req,res,next){
        console.log('The first common middleware called');
        next();
    }
);

app.get('/esim',
    function(request,response){
        response.send('Minä harjoittelen metodien ja parametrien käyttöä! =) Terveisin: Niko K.');
        console.log('Minä harjoittelen metodien ja parametrien käyttöä! =) Terveisin: Niko K.');
    }
);

app.use(
    function(req,res,next){
        console.log('The second common middleware called');
        next();
    }
);

app.get('/esim2/:name',
    function(request,response){
        response.send('Hei, Miten harjoittelu sujuu? '+request.params.name);
    }
);

app.post('/',
    function(request,response){
        response.send(request.body);
        console.log(request.body);
    }
);

module.exports = app;
