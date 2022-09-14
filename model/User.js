const mongoose = require("mongoose")

const {Schema , model} = mongoose ;

const userSchema = mongoose.Schema({

    name : {
        type : String,
        required :true
    },

    email : {
        type : String,
        required : true ,
        unique : true 
    },
    password : {
        type : String,
        required : true ,
    } ,
    phone : Number 

})


module.exports = User = mongoose.model('user',userSchema)