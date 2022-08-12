const Clan = require("../models/clanModel")

//Join Clan
exports.join = async(req, res)=>{
    try{
        const user = await Clan({
            username: req.body.username,
            clanname: req.body.clanname
        })

    }catch(error){
        res.send(400)
    }
}