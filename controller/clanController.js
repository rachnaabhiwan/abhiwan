const Clan = require("../models/clanModel")

//Join Clan
exports.join = async(req, res)=>{
    try{
        const user = await Clan({
            username: req.body.username,
            clanname: req.body.clanname
        })
        if(user){
            await user.save()
            res.send(user)
        }

    }catch(error){
        res.send(error)
    }
}

exports.getdata = async(req, res)=>{
    try{
        const user = await Clan.findOne({
            clanname: req.body.username
        })
        if(user){
            await user.save()
            res.send(user)
        }
    }catch(error){
        res.send(error)
    }
}