/**
 @Author：Wyunfei
 @Date：2019/2/11/10:44
 @FileName: app.js
 */
let express = require('express')
let path = require('path')
let bodyParser = require('body-parser')
let session = require('express-session')
let app = express()
let router = require('./routes/router')

// 模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是views目录，配置是为了方便修改
// 开放目录
app.use('/public', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))
app.listen(7000, () => {
    console.log('runing...')
})

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/*
* 在express这个框架中默认不支持session和cookie
* 但是我们可以使用中间件：express-session来解决
* 1、npm i express-session
* 2、配置（一定要在app.use(router)之前）
* 3、使用
*   当把这个插件配置好以后，我们就可以通过express-session来访问和设置session成员
*   添加session成员：req.session.foo = 'bar'
*   访问session成员：req.session.foo
* */
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// 把路由挂载到app中
app.use(router)




