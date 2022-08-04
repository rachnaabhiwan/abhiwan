const mongoose = require('mongoose')

const Schema = mongoose.Schema
const chatSchema = mongoose.Schema({

    userA :{
        type : String,
    },
    userB : {
        type : String,
    },
    message : {
        type : String
    }
})

module.exports = mongoose.model('Chat', chatSchema)