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
    var id = req.body.id;
    var pw = req.body.pw;
    var pwcheck = req.body.check;
    var name = req.body.names;
    var grade = req.body.grade;
    var clas = req.body.class;
    var number = req.body.number;
    var idInject = new Promise((resolve, reject)=>{
        if(!(id.length>=6 && id.length<=20))
        {
            res.send("<script>alert('아이디는 6~20자로 해 주세요.');"+
            "history.back();</script>");
        }
        else{
            connection.query('select * from account where ID = "'+id+'"', (err, lists)=>{
                if(err) { reject(Error("SQL Error")); }
                else {
                    if(lists.length == 0){
                        resolve(true);
                    }
                    else{
                        res.send("<script>alert('이미 존재하는 아이디입니다.');"+
                        "history.back();</script>")
                    }
                }
            });
        }
    })
    var pwInject = new Promise((resolve, reject)=>{
        if(!(pw.length>=6 && pw.length<=20)){
            res.send("<script>alert('비밀번호는 6~20자로 해주세요.');"+
                "history.back();</script>")
        }
        else if(pw != pwcheck){
            res.send("<script>alert('비밀번호가 틀립니다.');"+
                "history.back();</script>")
        }else{
            resolve(true);
        }
    });
    var nameInject = new Promise((resolve, reject)=>{
        if(name.length<=20){
            res.send("<script>alert('이름은 20자로 이하로 해주세요.');"+
                "history.back();</script>")
        }else{
            resolve(true);
        }
    })
    var gcnInject = new Promise((resolve, reject) => {
        if(grade == ""){
            res.send("<script>alert('학년을 선택해주세요.');"+
                "history.back();</script>")
        }else if(clas == ""){
            res.send("<script>alert('반을 선택해주세요.');"+
                "history.back();</script>")
        }else if(number == ""){
            res.send("<script>alert('번호를 선택해주세요.');"+
                "history.back();</script>")
        }else{
            resolve(true);
        }
    })
    Promise.all([idInject,pwInject, nameInject, gcnInject]).then((values)=>{
        console.log("Promise Success!!");
        if(values[0] && values[1] && value[2] && value[3]){
            res.send("<script>alert('True');"+
            "history.back();</script>");
        }else{
            res.send("<script>alert('False');"+
            "history.back();</script>");
        }
    });
});