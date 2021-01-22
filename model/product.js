const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:200
    },
    color: {
        type:String
    },
    price: {
        type: String,
        
    },
    discount: {
        type:Number,
        
    },
    image:{
        type:String
    },
    detail:{
        type:String
    },
    type:{
        type:String
    }
},{timestamps:true})








const Product = mongoose.model('Pduct', productSchema);

module.exports =  Product ;