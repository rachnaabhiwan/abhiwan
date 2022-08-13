const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clanSchema = mongoose.Schema({
    username :{
        type: String
    },
    clanname : {
        type: String
    }

})

module.exports = mongoose.model('Clan', clanSchema)