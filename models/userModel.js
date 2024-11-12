const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true,
    },
    firstName: { 
        type: String,
         required: true 
    },
    lastName: { 
        type: String,
         required: true

     },
    email:{ 
        type: String,
         required: true, 
         unique: true
     },
    password:  { 
        type: String,
         required: true 

    },
    phoneNumber: { 
        type: String
    }
})
const userDetails = mongoose.model("userDetails ",userSchema)
module.exports = userDetails
