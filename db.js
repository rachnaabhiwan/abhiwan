const mongoose = require('mongoose')
mongoose.set('debug', true)

mongoose.connect("mongodb://localhost/friend-form", {

    useNewUrlParser:true,
    useUnifiedTopology: true

}).then(()=>{
    console.log("connection successful")
}).catch(()=>{
    console.log("no connection..")

})
