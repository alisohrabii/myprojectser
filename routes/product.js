const express = require('express');
const config = require("../config/keys");
const Product=require('../model/product');
const { Router } = require('express');

const router = express.Router();

//rigister
router.post("/SetProduct",async(req, res) => {
  try{
    
    const {name,price,discount,color,detail,type}=req.body;
    console.log(name,price,color);
 
  const newproduct= new Product({
    name:name,
    price:price,
    discount:discount,
    color:color,
    detail:detail,
    type:type
    });
    newproduct.save().then((result)=>{
      res.status(200).json({mss:"info saved in database"});
      console.log('saved sucss');
    }).catch((err)=>console.log(err));


}catch(err){
    res.status(500).json({mss:"خطا در شبکه"});
  }
});


router.post("/Getproductbyname",async(req, res) => {
    try{
    const {type}=req.body;
    console.log(type);
    const product= await Product.find({type:type});
    
          if (product==null){
            console.log("product not found");
                    res.status(400).json({mss:"این نام کاربری وجود ندارد"});
          }else{
            console.log("product  found");
            console.log(product);
                 res.status(200).json({product});
            }
        
    
    
           
    
    }catch(err){
        res.status(500).json({mss:"خطا در سرور"});
      }
    
    
})
module.exports = router;