const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    mobnumber:{
        type:String
    },
    email: {
        type:String
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    token:{
        type:String
    },
    cart:{
type:Array

    }
},{timestamps:true})

const User = mongoose.model('User', userSchema);

module.exports =  User ;