/**
 @Author：Wyunfei
 @Date：2019/2/11/10:44
 @FileName: app.js
 */
let express = require('express')
let path = require('path')
let app = express()

// 模板引擎
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/')) // 默认就是views目录，配置是为了方便修改
// 开放目录
app.use('/public', express.static(path.join(__dirname, './public/')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules/')))
app.listen(7000, () => {
    console.log('runing...')
})

// 路由
app.get('/', (req, res) => {
    res.render('index.html', {
        name: '猪八戒'
    })
})


