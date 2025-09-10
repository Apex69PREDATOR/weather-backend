const app=require("express")
const Router=app.Router()
const jwt=require("jsonwebtoken")
require("dotenv").config()

Router.post('/',async (req,res)=>{
    const token=req.headers.authorization.split(' ')[1]
    jwt.verify(token,process.env.JWT_PRIVATE_KEY,(error,decoded)=>{
        if(error){
            
            return res.status(401).json({success:false});
            
        }
        else{
            
            return res.status(200).json({success:true,name:decoded.name})
        }
    
    })
})
module.exports=Router
