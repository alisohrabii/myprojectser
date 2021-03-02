const jwt=require('jsonwebtoken');
const config = require("../config/keys");
const User = require('../model/users');


const auth=async(req,res,next)=>{

 try{
        
        
        const token=req.header("xtoken");

        console.log(token);
        try{
            const verified= await jwt.verify(token,config.secret);       
            console.log(verified);
            if(verified!=null){
                console.log('verified correctlly')
                 User.findOne({"_id":verified.id,"token":token}).then(user=>{
                            
                    
                            if (user){
                                 
                 
                                req.user=user;
                            
                               
                                  next(); 
                            }else{
                                
                                res.status(400).json({mss:'لطفا ابتدا وارد شوید'})}


                           }).catch(err=>{
                            res.status(400).json({mss:'لطفا ابتدا وارد شوید'});
                            });
                
            }else{res.status(400).res.json({mss:'not valid token sorry boy'})}
        }catch{res.status(400).json({mss:"wrong auth"})};
  }catch(err){
        console.log(err);
        res.status(500).json({mss:"server error"} );
             }


}
module.exports=auth;