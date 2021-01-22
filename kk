MONGO_URL=mongodb+srv://alisohrabi:alisohrabi12@alicluster.fcc6j.mongodb.net/shoping?retryWrites=true&w=majority;
router.post("/login",async(req, res) => {
  try{
 const {email,password}=req.body;
const user= await User.findOne({email:email});
console.log(user);


if (!user){
  res.status(400).json({mss:"this user name dosent exist"});
}else{

  const ismtach=await bcrypt.compare(password,user.password);
if (ismatch){
const token=jwt.sign(user._id.toHexString(),'secret');
console.log(token);
res.json({mss:"ok loged in"})


}else{
  res.status(400).json({mss:"this password is wrong"});


}


}

}catch(err){
    res.status(500).json({mss:"server error"});
  }
//console.log(hashedpass);
  //console.log(password);





});