//引入express
const express=require('express');
//实例化
const app=express();
//使用ejs模板引擎
app.set('view engine','ejs');
//设置静态路径＝＞ｃｓｓ等文件正常调用
app.use(express.static('public'));
//登录
app.get('/login',(req,res)=>{
    res.render('login');
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