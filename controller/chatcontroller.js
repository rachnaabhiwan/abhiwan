const Chat = require('../models/chat')
const friendRequest = require('../models/friendRequest')


exports.message = async(req, res)=>{
    try{
        const user = await Chat({
            userA : req.body.userA,
            userB : req.body.userB,
            message : req.body.message
        })
        const msg = await user.save()
        res.send(msg)
    }catch(err){
        console.log(err)
        res.send(err)   
    }
}

exports.message1 = async(req, res)=>{
    try{
        const msg = await Chat.find()
        res.status(200).json(msg)
    }catch(error){
        res.send(error)
    }
}