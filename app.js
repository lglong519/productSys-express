//引入express
const express=require('express');
//实例化
const app=express();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/productmanage");
const db = mongoose.connection;

db.on('open', function (cb) {
    console.log('数据库连接成功',Date());
});
db.on('error', console.error.bind(console, 'connection error:'));
// var mySchema = new mongoose.Schema({username:String,password:String});
// var PersonModel = mongoose.model("user", mySchema);
var model = mongoose.model('',{},'user');
model.find((err,docs)=>{
    console.log(1,err);
    console.log(2,docs);
})
/*
var personEntity = new PersonModel({
    username : "3feng",
    password  : 16
});
personEntity.save(function (error, doc) {
    console.log(3,error);
    console.log(4,doc);
});
*/

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//使用ejs模板引擎
app.set('view engine','ejs');
//设置静态路径＝＞ｃｓｓ等文件正常调用
app.use(express.static('public'));
//登录
app.get('/login',(req,res)=>{
    res.render('login');
});

//登录
app.post('/doLogin',(req,res)=>{
    console.log(req.body);
    

});

//商品
app.get('/product',(req,res)=>{
    res.render('product');
});

//增加
app.get('/productadd',(req,res)=>{
    res.render('productadd');
});

//编辑
app.get('/productedit',(req,res)=>{
    res.render('productedit');
});

//删除
app.get('/productdelete',(req,res)=>{
    res.render('productdelete');
});

app.listen(7500);