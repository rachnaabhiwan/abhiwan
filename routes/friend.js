const express = require('express')
const router = express.Router()
const Friend = require('../models/friend')

router.get('/', async(req, res) => {
    try{
        const friend = await Friend.find()
        res.json(friend)
    }catch(err){
        res.send('ERROR ' + err)

    }
})

router.get('/:id', async(req,res) =>{
    try{
        const friend = await Friend.findById(req.params.id)
        res.json(friend)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.post('/', async(req, res) =>{
    const friend = new Friend({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    try{
        const f1= await friend.save()
        res.json(f1)

    }catch(err){
        res.send('error')
    }

})

router.put('/update', async(req,res)=>{
    try{
        const {id,name,email} = req.body
        const friend = await Friend.findOneAndUpdate({_id:id},
            {$set:{name:name,email:email}},{new:true})
        res.json(friend)
       // Object.assign(friend, req.body)  

    }catch(error){ 
        console.log(error);
        res.send('Error')
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const friend = await Friend.findByIdAndDelete(req.params.id)
        res.json(friend)

    }catch(error){
        res.send('Error')
    }
})




module.exports= router