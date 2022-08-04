const mongoose = require('mongoose')

//Friends Model, using enums 

const Schema = mongoose.Schema
const friendSchema = mongoose.Schema({
    toState:{
        type: String
    },
    fromState:{
        type: String
    },
    toId:{
        type: String
    },
    fromId:{
        type: String
    }
})

module.exports = mongoose.model('Friends', friendSchema)