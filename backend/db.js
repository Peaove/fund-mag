const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://localhost:27017/fundMg')
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err) => {
        console.log(err)
    })

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User',userSchema)

module.exports = {
    User
}