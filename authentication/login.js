const app=require("express")
const Router=app.Router()
const jwt=require("jsonwebtoken")
const connection=require("../mysql_connection")
const bcrypt=require("bcrypt")

Router.post('/',async(req,res)=>{
    const {email,password}=req.body

    try{
    const select=await connection.query("SELECT password FROM users WHERE email=?",[email])
    
    if(select[0].length===1){
        const original_password=select[0][0].password
        const ismatch=await bcrypt.compare(password,original_password)
        if(ismatch){
          
         const name=await connection.query("SELECT firstname FROM users WHERE email=?",[email])
           const token= jwt.sign({email:email,name:name[0][0].firstname},"weatheraxos",{expiresIn:"10d"})
           return res.status(200).json({loggin:true,messege:"sign in successfull",token:token,name:name[0][0].firstname})
        }
    }
    
    return res.status(401).json({messege:"email or password is invalid"})
    
  }
  catch(err){
    
    res.status(505).json({messege:"internal server error occured plese try again later"})
  }

})

module.exports=Router