var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs'); //파일 로드 사용
var mysql = require('mysql');
var ejs = require('ejs');

app.set('view engine','ejs');
app.set('views', './');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname, + '/public'));

app.listen(3303, ()=>{
    console.log('Server start');
});

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'qwer1234',
    port : 3306,
    database : 'ezw',
    dateStrings : 'date'
});
connection.connect((err)=>{
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }else{
        console.log('MYSQL Connect Successfully!');
    }
});

app.get('/',(req, res)=>{
    fs.readFile('index.html',(error,data)=>{
        if(error) {
            console.log(error);
        }else {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(data);
        }
    });
});

app.get('/log',(req, res)=>{
    fs.readFile('login.html',(error,data)=>{
        if(error) {
            console.log(error);
        }else {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end();
        }
    }); 
});

app.get('/sup',(req, res)=>{
    fs.readFile('SignUp.ejs', 'utf-8',(error,data)=>{
        if(error) {
            console.log(error);
        }else {
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(ejs.render(data,[]));
        }
    });
})

app.post('/logininf', (req, res)=>{
    
});

app.post('/signinf', (req, res)=>{
    var inject = require('./Inject.js');
    inject.Inject(req, res, connection);
});