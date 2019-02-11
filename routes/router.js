/**
 @Author：Wyunfei
 @Date：2019/2/11/15:18
 @FileName: router.js
 */
let express = require('express')
let router = express.Router()

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
    let { body } = req
    console.log(body)
})


module.exports = router
