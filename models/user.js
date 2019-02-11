/**
 @Author：Wyunfei
 @Date：2019/2/11/16:14
 @FileName: user.js
 */
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        default: Date.now // 这里不要写Date.now()因为会马上调用，这个时候时间戳就是写死了。当你new model的时候，如果你没有传递create_time，则mongoose就会调用default的Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/imgs/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        // 是否可以评论，可以登录
        // 0 没有限制
        // 1 不可以评论
        // 2 不可以登录
        enum: [0, 1, 2],
        default: 0
    }
})

modules.exports = mongoose.model('User', userSchema)
