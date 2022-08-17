const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mongoosePaginate = require('mongoose-paginate-v2')

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

friendSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Friends', friendSchema)