const path = require('path')
const express = require('express')
const app = express()
const http = require('http')

const bodyparser = require('body-parser')

//Connecting DB
const mongoose = require('mongoose')
require('./db')

//Middleware
app.use(express.json())

//const friendRouter = require('./routes/friend')
//app.use('/friend', friendRouter)

const userRouter = require('./routes/userRoute')
app.use(userRouter)
        
    

const friendRequestRouter = require('./routes/friendrequest')
app.use(friendRequestRouter)

const chatRouter = require('./routes/chatRoute')
app.use(chatRouter)




/*SOCKET
const io = require('socket.io')(http)
io.on('connection', (socket)=>{
    console.log('Connected....')
})*/


app.listen(3000, function(){
    console.log('Server is running...!')
})


