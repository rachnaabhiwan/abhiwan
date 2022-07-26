const User = require("../models/adminModel")
//const Friends = require("../models/friendRequest")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//Signup
// exports.signup = async(req, res, next) =>{
//     bcrypt.hash(req.body.password, 10, (err,hash) =>{
//         if(err){
//             return res.status(500).json({
//                 error: err
//             })
//         } 
//         else{
//             const user = new User({
//                 username : req.body.username,
//                 email : req.body.email,
//                 password: hash
//             })

//             user.save()
//             .then(result =>{
//                 res.status(200).json(result)
//             })
//             .catch(err =>{
//                 res.status(500).json({
//                     error : err
//                 })
//             })
//         }
//     })
// }


//Login
exports.login = async(req,res)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                msg : 'user not exist'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(!result){
                return res.status(401).json({
                    msg: 'password matching fail'
                })
            }
            if(result){
                const token = jwt.sign({
                    username : user[0].username,
                    email: user[0].email
                },
                'this is dummy text',{
                    expiresIn:"24h"
                });
                res.status(200).json({
                    username: user[0].username,
                    email: user[0].email,
                    token:token
                })
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            err: error
        })
    })
}


