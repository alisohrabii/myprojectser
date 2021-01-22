const express=require('express');

const ali=express();
const mongoose=require('mongoose');
const Product = require('./model/product');
ali.set('view engine','ejs');


const DBURL='mongodb+srv://alisohrabi:alisohrabi12@alicluster.fcc6j.mongodb.net/shoping?retryWrites=true&w=majority';
mongoose.connect(DBURL,{useNewUrlParser:true,useUnifiedTopology:true}).then((result)=>{
    ali.listen(8088);
    console.log("conected to database");
}
    ).catch((err)=>console.log("error happendd to conect  mongodbS"))

//middlwaew all fucntion betwen req and res should to use next() t contiue reading  code




ali.get('/createnewproduct',(req,res)=>{
const newproduct=new Product({
proname:'mobile sumsung',
procolor:'red',
procompany:'sum'

})
newproduct.save().then((result)=>console.log('saved sucss')).catch((err)=>console.log('error in saving data'));
    }) 





    //geta all product
ali.get('/getallproduct',(req,res)=>{
    
Product.find().then((result)=>{
    
    res.send(result);
    console.log(result);




}).catch((err)=>console.loge("err in getinh data"))
   
})


    //geta single product
    ali.get('/getsingleproduct',(req,res)=>{
    
        Product.findById().then((result)=>{
            
            res.send(result);
            console.log(result);
        
        
        
        
        }).catch((err)=>console.loge("err in getinh data"))
           
        })
        
        
        
        

