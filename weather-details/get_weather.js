const app=require("express")
const Router=app.Router()
require("dotenv").config()

Router.post('/',async(req,res)=>{
     const place=req.body.latitude.toString() + ',' + req.body.longitude.toString()
const url=`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${place}&aqi=yes`
   const response_promise=await fetch(url)
   const response=await response_promise.json()
   
   res.status(200).json(response)
})
Router.post('/byplace',async(req,res)=>{
    const place=req.body.place
const url=`http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${place}&aqi=yes`
const response_promise=await fetch(url)
   const response=await response_promise.json()
   
   res.status(200).json(response)

})

module.exports=Router
