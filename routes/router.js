/**
 @Author：Wyunfei
 @Date：2019/2/11/15:18
 @FileName: router.js
 */
let express = require('express')
let router = express.Router()
let mongoose = require('mongoose')
let User = require('../models/user')
let md5 = require('blueimp-md5')
// 连接数据库
mongoose.connect('mongodb://localhost/jiyun', { useMongoClient: true })

router.get('/', (req, res) => {
    res.render('index.html')
})

router.get('/login', (req, res) => {
    res.render('login.html')
})

router.post('/login', (req, res) => {

})

router.get('/register', (req, res) => {
    res.render('register.html')
})

router.post('/register', (req, res) => {
    /*
    * 1、获取表单提交的数据
    * 2、操作数据库
    *       判断该用户是否存在
    *           存在 -> NO
    *           !存在 -> yes
    * 3、发送响应
    * */
    let { body } = req
    User.findOne({
        $or: [
            {
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, (err, data) => {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Internal error'
            })
        }
        if (data) {
            // 邮箱或昵称已存在
            // return res.status(200).json({
            //     err_code: 1,
            //     message: 'email or nickname already exists'
            // })

            // 这种处理方式不代表不好，服务端处理起来更加安全一些，但是会增大服务器的压力，同时为了交互的一致性，因为有些浏览器禁用了ajax或不支持ajax，GitHub目前就是这么做的，从服务端返回提示消息
            return res.render('register.html', {
                err_message: '邮箱或昵称已存在'
            })
        }

        // 处理password加密 - 多次加密
        body.password = md5(md5(body.password))
        new User(body).save((err, user) => {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Internal error'
                })
            }
            // 这种方式可以 - 方法一
            // res.status(200).send(JSON.stringify({
            //     code: 0,
            //     success: true
            // }))
            // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器 - 方法二
            res.status(200).json({
                err_code: 0,
                message: 'ok'
            })
        })




    })
})


module.exports = router
