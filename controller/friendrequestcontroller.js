const Friends = require("../models/friendRequest")
const jwt = require('jsonwebtoken')


//Post Api
exports.friends = async (req, res) => {
    try {
        const { status } = req.body
        if (status == 0) {
            const friend = await Friends.findOne(
                { toId: req.body.toId, fromId: req.body.fromId })

            if (friend) {
                const token = jwt.sign({
                    _id: 'id'
                },
                    'my token is',
                    { expiresIn: '12h' })
                res.json({ success:true, token, friend })
            }
            else {
                const friend = await Friends({
                    toId: req.body.toId,
                    fromId: req.body.fromId,
                    fromState: 0,
                    toState: 1
                })
                if (friend) {
                    const token = jwt.sign({
                        _id: 'id'
                    },
                        'my token is',
                        { expiresIn: '12h' })
                    //console.log(token)
                    await friend.save()
                    res.json({success:true,
                        token, friend
                    })

                    //  const data = await user.save()
                    // res.status(200).send(user, token)

                }
            }
        } else if (status == 2) {
            const friend = await Friends.findOne({
                fromId: req.body.fromId,
                toId: req.body.toId,
                toState: 3
            })
            if (friend) {
                res.status(200).send({friend})
            }
            else {
                const friend = await Friends.findOneAndUpdate(
                    { fromId: req.body.fromId,toId: req.body.toId },
                    
                    { $set: { toState: 2, fromState: 2 } },
                    { new: true })
                res.status(200).send({success:true, friend})

            }
        } else if (status == 3) {
            const friend = await Friends.findOne({ fromId: req.body.fromId, toId:req.body.toId,
                 fromState: 2, toState: 2 })
            if (friend) {
                res.status(200).send({success: true, friend})
            }
            else {
                const friend = await Friends.findOneAndUpdate(
                    { toId: req.body.toId, fromId: req.body.fromId },
                    { $set: { toState: 3, fromState: 3 } },
                    { new: true })
                res.status(200).send({success:true, friend})
            }
        }
        else {
            res.json({success:false,msg:"Request not found"})
        }

    } catch (error) {
        res.status(400).send(error)
    }


}

//Using Get Method
exports.getfriend = async (req, res) => {
    try {
        const { userId } = req.body
        const friend = await Friends.find({ toId:userId })
        res.send({success:"True",friend})

    } catch (err) {
        res.send(err)

    }
},

    exports.userStatus = async (req, res) => {
        try {
    
         const { status } = req.body
            const { userId } = req.body
            if(status==1){
                const friend = await Friends.find({toState: status, toId: userId})
                res.send({success:true, friend})
            }
            else if(status==0){
                const friend = await Friends.find({fromState:status, fromId:userId})
                res.send({success:true, friend})
            }
            else if(status == 2){
                const friend = await Friends.find({ toState: status, $or:[{fromId: userId},{toId:userId}]})
                res.send({success:true, friend})
           }
        }
         catch (error) {
            res.send({success:false, error})
        }
    }

//Pagination
exports.getall = async (req, res) => {
    Friends.paginate({}, { page: req.query.page, limit: req.query.limit })
        .then(response => {
            res.send({ response })
        })
        .catch(error => {
            res.json({
                message: "An error occured:" + error
            })

        })
}



