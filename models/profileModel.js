const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    coin:{
        type:Number,
        required:true
    },
    level:{
        type:Number,
        required:true
    },
    gems:{
        type:Number,
        required:true
    },
    stats:[{
        winCount:{
            type:Number
        },
        loseCount:{
            type:Number
        },
        trophy:{
            type:Number
        }
}],
    clanId:{
        type:String,
        default:" "
    },
    userId:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Profile", profileSchema);