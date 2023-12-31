const express=require("express");
const mongoose=require("mongoose")
const Datamodel=require("./model/data.model")

const app=express();
const cors=require("cors")
require("dotenv").config();

app.use(cors())



app.get('/getdata',async(req,res)=>{
    let {filter,filterValue} = req.query
    console.log("filter",filter,filterValue)
    let obj={}
    if(filter && filterValue){
        obj[filter]=filterValue
    }
    try{
        const data=await Datamodel.find(obj);
        res.send(data);
    }catch(err){
        res.send({"error":err})
    }

})

const connect = mongoose.connect(`${process.env.mongoURL}`)

app.listen(8800,async()=>{
    try{
        connect
        console.log("connected to server")
    }catch(err){
        console.log(err)
    }
})