const Friends = require("../models/friendRequest")
const UserStats = require('../models/profileModel')
const Clan = require('../models/clanModel')
const jwt = require('jsonwebtoken')


//Friends 
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
                res.json({ success: true, token, friend })
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
                    res.json({
                        success: true,
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
                res.status(200).send({ friend })
            }
            else {
                const friend = await Friends.findOneAndUpdate(
                    { fromId: req.body.fromId, toId: req.body.toId },

                    { $set: { toState: 2, fromState: 2 } },
                    { new: true })
                res.status(200).send({ success: true, friend })

            }
        } else if (status == 3) {
            const friend = await Friends.findOne({
                fromId: req.body.fromId, toId: req.body.toId,
                fromState: 2, toState: 2
            })
            if (friend) {
                res.status(200).send({ success: true, friend })
            }
            else {
                const friend = await Friends.findOneAndUpdate(
                    { toId: req.body.toId, fromId: req.body.fromId },
                    { $set: { toState: 3, fromState: 3 } },
                    { new: true })
                res.status(200).send({ success: true, friend })
            }
        }
        else {
            res.json({ success: false, msg: "Request not found" })
        }

    } catch (error) {
        res.status(400).send(error)
    }


}

//Using Get Method
exports.getfriend = async (req, res) => {
    try {
        const { userId } = req.body
        const friend = await Friends.find({ toId: userId })
        res.send({ success: "True", friend })

    } catch (err) {
        res.send(err)

    }
},

    exports.userStatus = async (req, res) => {
        try {

            const { status } = req.body
            const { userId } = req.body
            if (status == 1) {
                const friend = await Friends.find({ toState: status, toId: userId })
                res.send({ success: true, friend })
            }
            else if (status == 0) {
                const friend = await Friends.find({ fromState: status, fromId: userId })
                res.send({ success: true, friend })
            }
            else if (status == 2) {
                const friend = await Friends.find({ toState: status, $or: [{ fromId: userId }, { toId: userId }] })
                res.send({ success: true, friend })
            }
        }
        catch (error) {
            res.send({ success: false, error })
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


// -----------------userStats-------------

exports.userStats = async (req, res) => {
    try {
        const { winCount } = req.body
        // const user = await UserStats({
        //name:req.body.name,coin:req.body.coin,level:req.body.level,gems:req.body.gems,"stats.winCount":winCount})
        const user = await UserStats(req.body)
        const data = await user.save()
        // console.log(data)
        //res.send({success: true, data}) 
        if (data) {
            const token = jwt.sign({
                _id: 'id'
            },
                'my token is',
                { expiresIn: '12h' })
            await data.save()
            res.json({ success: true, token, data })
        }
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

exports.userprofile = async (req, res) => {
    try {
        const user = await UserStats.findOne({ userId: req.body.userId })
        if (user) {
            res.send({ success: true, user })
        }
        else {
            res.send('User not found')
        }
    } catch (error) {
        res.send(error)
    }

}

// -----------Clan Management---------

exports.clan = async (req, res) => {
    try {
        const clan = await Clan.findOne({ clanName: req.body.clanName })
        if (clan) {
            const token = await jwt.sign({ _id: clan._id },
                "my token is",
                { expiresIn: '1d' });

            res.json({ clan, token })
        } else {
            const random = Math.floor(Math.random() * 123456789)
            const user = await Clan({
                userId: req.body.userId,
                clanName: req.body.clanName,
                clanId: random,
                clanLeader: req.body.clanLeader,
                joinId: req.body.joinId


            })
            const token = await jwt.sign({ _id: user._id },
                "my token is",
                { expiresIn: '1d' });
            const data = await user.save()
            res.send({ success: true, token, data })
        }
    } catch (error) {
        res.status(404).send(error)
    }
}



exports.joinClan = async (req, res) => {
    try {
        const user = req.user
        //console.log(user._id)
        const value = await Clan.findOne({ _id: user._id })
        //console.log(value)

        const { status } = req.body
        if (status == 0) {

            const sameuser = await Clan.findOne({ joinId: req.body.joinId })
            // console.log(sameuser.joinId);
            if (sameuser) {
                res.send(sameuser)
            }
            else {
                const data = await Clan.findOneAndUpdate({ clanName: req.body.clanName },
                    { $push: { joinId: req.body.joinId } }, { new: true })
                await data.save()
                //console.log(data)
                res.send({success: true, data})
            }
        }
        if (status == 1) {
            const data = await Clan.findOneAndUpdate({ joinId: req.body.joinId },
                { $pull: { joinId: req.body.joinId } }, { new: true })
            if (data) {
                await data.save()
                res.send({success:true, data })

            }
            else{
                res.send({
                    success: true,
                    message: 'Member not found'
                })
            }
        }
    } catch (error) {
        res.status(404).send(error)
    }
}

exports.kicked = async (req, res) => {
    try {
        const data = await Clan.findOneAndUpdate({ joinId: req.body.joinId },
            { $pull: { userId: req.body.userId } }, { new: true })
        await data.save()
        res.send(data)

    } catch (error) {
        res.send(error)
    }
}


