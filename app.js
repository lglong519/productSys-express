//引入express
const express = require('express');
//实例化
const app = express();
const bodyParser = require('body-parser');
//引入 express-session
const session = require("express-session");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/productmanage");
const db = mongoose.connection;

db.on('open', function (cb) {
    console.log('数据库连接成功', Date());
});
db.on('error', console.error.bind(console, 'connection error:'));
// var mySchema = new mongoose.Schema({username:String,password:String});

// var PersonModel = mongoose.model("user", mySchema);
let model = mongoose.model('', {    //Schema 内容可以不写，但是查询结果除了_id,其他属性无法单独获取
    username: '',
    password: ''
}, 'user');
/*
var personEntity = new PersonModel({
    username : "3feng",
    password  : 16
});
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',		//服务器生成session的签名
    name: 'connect.sid',			//***默认为：connect.sid，可以不写
    resave: false,				//默认为true，不管session是否变化强制保存
    saveUninitialized: true,		//设置为true，如果session未初始化，则自动生成
    cookie: {
        maxAge: 30 * 60 * 1000
    },
    rolling: true
}));

//使用ejs模板引擎
app.set('view engine', 'ejs');
//设置静态路径＝＞ｃｓｓ等文件正常调用
app.use(express.static('public'));

//自定义中间件，判断登录状态
app.use(function (req, res, next) {
    console.log(req.url);
    if (req.url === '/login' || req.url === '/doLogin') {
        console.log(11);
        next();
    } else {
        if (req.session.userInfo && req.session.userInfo != '') {
            console.log(22);
            app.locals['userInfo'] = req.session.userInfo;    //配置全局变量，可在模板使用
            next();
        } else {
            console.log(33, req.session.userInfo);
            res.render('login');
        }
    }
});

//登录
app.get('/login', (req, res) => {
    res.render('login');
});

//登录
app.post('/doLogin', (req, res) => {
    console.log(req.body);
    model.findOne(req.body, (err, result) => {
        if (result) {
            console.log('查询成功', result._id);
            console.log('查询成功2', result.username);
            console.log('查询成功3', result.password);
            req.session.userInfo = result.username;
            console.log(44, req.session.userInfo);
            res.redirect('/product');
        } else {
            console.log('查询失败', result);
            res.send('<script>alert("登录失败");location.href="/login";</script>');
        }
    })
});

//退出登录
app.get('/loginOut', (req, res) => {
    req.session.destroy(err => {
        /*销毁session,退出登录*/
        if (err) {
            console.log(err);
        } else {
            res.redirect('/login');
        }
    })
});

//商品
app.get('/product', (req, res) => {
    res.render('product');
});

//增加
app.get('/productadd', (req, res) => {
    res.render('productadd');
});

//编辑
app.get('/productedit', (req, res) => {
    res.render('productedit');
});

//删除
app.get('/productdelete', (req, res) => {
    res.render('productdelete');
});

app.listen(7500);