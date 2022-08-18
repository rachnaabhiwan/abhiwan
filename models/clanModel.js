const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clanSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    clanName:{
        type:String,
        required:true
    },
    clanId:{
        type:Number,
        required:true
    
    },
    clanLeader:{
        type:String,
        required:true

    },
    joinId:{
        type:Array
}
})

module.exports = mongoose.model('clan', clanSchema)