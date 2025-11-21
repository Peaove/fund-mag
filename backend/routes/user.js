const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const passport = require('passport');

// router.get('/test', (req, res) => {
//     res.json({ msg: 'login works' })
// })

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json('邮箱已被注册')
            } else {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    identity: req.body.identity,
                })


                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, function (err, hash) {
                        if (err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})

router.post('/login', (req, res) => {
    // 登录验证,拿到用户登录的邮箱和密码
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(404).json('用户不存在')
            }
            // 密码匹配验证
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        // 密码匹配成功，生成 JWT 令牌
                        jwt.sign({ id: user._id, username: user.username, identity:user.identity }, 'secret', { expiresIn: '1h' },(err,token) => {
                            if (err) throw err;
                            // 登录成功，返回令牌
                            res.json({ msg: '登录成功', token: 'Bearer ' + token });
                        });
                        
                    } else {
                        return res.status(400).json('密码错误')
                    }
                })
        })
})

router.get('/current',passport.authenticate('jwt', { session: false }),(req,res) => {
    res.json({
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        identity: req.user.identity,
    })
})

module.exports = router