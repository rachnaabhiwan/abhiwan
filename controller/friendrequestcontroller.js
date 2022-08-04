const Friends = require("../models/friendRequest")


//Sending Request
exports.adduser=async(req,res)=>{
    try{
        const value = await Friends.findOne({toId:req.body.toId, fromId:req.body.fromId})
            if(value){
               res.send(value)
            }
            
            else{
            const user =  await Friends({
            toId  : req.body.toId,
            fromId : req.body.fromId,
            fromState:0,
            toState:1
        })
        const data = await user.save()
        res.status(200).send(data)
    }

        // if(data){
        //     const value = await Friends.findOneAndUpdate({fromId:req.body.fromId},
        //         {$set:{ fromState:1,toState:0}},
        //         {new:true})
        //     }
    }catch(error){
        console.log(error);
        res.status(400).send(error)
    }
}

//Using Get Request
exports.user=async(req,res)=>{
    try{
        const friend1 = await Friends.find({toState:1, toId:req.body.toId})
        console.log(friend1)
        res.send(friend1)
        
       // res.status(200).json(friend1)
    }catch(err){
        res.send(err)
        
    }
}

//Accepting the request
exports.accept = async(req, res)=>{
    try{
        const value = await Friends.findOneAndUpdate(
            {fromId:req.body.fromId},
            {$set:{toState:2}},
            {new:true})
        res.status(200).send(value)

    }catch(error){
        res.status(400).send(error)
    }
}


//Rejecting the request
exports.reject = async(req, res)=>{
    try{
        const value = await Friends.findOneAndUpdate(
            {toId:req.body.toId},
            {$set:{toState:3}},
            {new:true})
        res.status(200).send(value)
    }catch(error){
        res.status(400).send(error)
    }
},

//Blocking User
exports.block=async(req,res)=>{
    try{
        const value = await Friends.findOneAndUpdate(
            {toId:req.body.toId},
            {$set:{toState:4}},
            {new: true})
        res.status(200).send(value)
    }catch(error){
        console.log(error);
        res.status(400).send(error)
    }
}


