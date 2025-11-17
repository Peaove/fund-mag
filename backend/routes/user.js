const express = require('express')
const router = express.Router()
const { User } = require('../db')

router.get('/test',(req,res) => {
    res.json({msg: 'login works'})
})

router.post('/register',(req,res) => {
    User.findOne({email: req.body.email})
        .then((user) => {
            if(user) {
                return res.status(400).json({msg: '邮箱已被注册'})
            }else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                })
            }
        })
})

module.exports = router