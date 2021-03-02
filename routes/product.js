const express = require('express');
const config = require("../config/keys");
const Product=require('../model/product');


const { Router } = require('express');
const multer=require('multer');
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
//set cart

//save product images

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
  cb(null,` ${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
  const ext = path.extname(file.originalname)
  if (ext !== '.svg' || ext !== '.png') {
  return cb(res.status(400).end('only jpg, png are allowed'), false);
  }
  cb(null, true)
  }})
  var upload = multer({ storage: storage }).single("file");
  
  

router.post("/UploadProductImage",(req, res) => {
 
    console.log('hiiiiiiiiiiiii0000');
    upload(req, res, err => {
      if (err) return res.json({ success: false, err })
      return res.json({ success: true, image: res.req.file.path, fileName: res.req.file.filename })
      })


  
  
})





module.exports = router;