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

const adminRouter = require('./routes/adminRoute')
app.use(adminRouter)
           
const friendRequestRouter = require('./routes/friendrequest')
app.use(friendRequestRouter)

const clanRouter = require('./routes/clanRoute')
app.use(clanRouter)




/*SOCKET
const io = require('socket.io')(http)
io.on('connection', (socket)=>{
    console.log('Connected....')
})*/


app.listen(3000, function(){
    console.log('Server is running...!')
})


