const app=require("express")
const Router=app.Router()
const jwt=require("jsonwebtoken")

Router.post('/',async (req,res)=>{
    const token=req.headers.authorization.split(' ')[1]
    jwt.verify(token,`weatheraxos`,(error,decoded)=>{
        console.log('wef')
        if(error){
            
            return res.status(401).json({success:false});
            
        }
        else{
            
            return res.status(200).json({success:true,name:decoded.name})
        }
    
    })
})
module.exports=Router
