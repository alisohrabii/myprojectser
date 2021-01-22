const express = require('express');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const auth=require('../midllware/auth');
const config = require("../config/keys");
const User=require('../model/users');
const { Router } = require('express');
const router = express.Router();

//rigister
router.post("/register",async(req, res) => {
  try{
    console.log(req.data)
 const {name,lastname,email,password}=req.body;
const user= await User.findOne({email:email});
if (user!=null){
  res.status(400).json({mss:"این کاربر از قبل ثبت نام کرده است"});
}else{
  const salt=await bcrypt.genSalt(10);
const hashedpass=await bcrypt.hash(password,salt);

  const newuser= new User({
    name:name,
    email:email,
    password:hashedpass,
    lastname:lastname
    
    });
    newuser.save().then((result)=>{
      res.status(200).json({mss:"info saved in database"});
      console.log('saved sucss');
    }).catch((err)=>console.log(err));
}

}catch(err){
    res.status(500).json({mss:"خطا در شبکه"});
  }






});



//login  

router.post("/login",async(req, res) => {
try{
const {email,password}=req.body;
const user= await User.findOne({email:email});

      if (user==null){
                res.status(400).json({mss:"این نام کاربری وجود ندارد"});
      }else{
           
           const ismatch=await bcrypt.compare(password,user.password);
           
  
                      if (ismatch){  
                             const token=jwt.sign({id:user._id},config.secret);
                             console.log(token); 
                             User.findOneAndUpdate({email:email},{token:token}).then(result=>{
                                 console.log(result)
                                 res.status(200).json({token,user:{username:user.name,lastname:user.lastname}});
                                 }).catch(err=>console.log(err));
                   // res.status(200).json({token,user:{username:user.name,lastname:user.lastname}});
                    }else{
                      res.status(400).json({mss:"پسورد اشتباه است"});
                    }


       }

}catch(err){
    res.status(500).json({mss:"خطا در سرور"});
  }






});
router.post('/tokenlogin',auth,(req,res)=>{
  console.log(req.header("xtoken"));
console.log("inside route test");
console.log(req.username);
res.status(200).json({username:req.user.name,lastname:req.user.lastname,email:req.user.email});

})

module.exports = router;