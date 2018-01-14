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

app.listen(7500);