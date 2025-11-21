const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const passport = require('passport')
// 引入路由模块
const user = require('./routes/user')
const profile = require('./routes/profile')

// 2. 注册内置中间件（关键步骤）
// 解析 JSON 格式的请求体（如前端 axios.post 传 JSON）
app.use(express.json());

// 解析表单格式的请求体（如 <form> 提交、axios 传 application/x-www-form-urlencoded）
// extended: true 允许解析复杂的嵌套对象（推荐默认开启）
app.use(express.urlencoded({ extended: true }));

// passport初始化
app.use(passport.initialize());
// 引入passport配置
require('./config/passport')(passport);

// 路由中间件
app.use('/api/user',user)
app.use('/api/profile',profile)

// app.get('/',(req,res) => {
//     res.send('hello world!')
// })
mongoose.connect('mongodb://localhost:27017/fundMg')
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log(err)
    })
app.listen(port,() => {
    console.log(`Server running on prot ${port}`)
})


