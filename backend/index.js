const express=require("express");
const mongoose=require("mongoose")
const app=express();
const cors=require("cors")
require("dotenv").config();

app.use(cors())

const schema=new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
})
const Datamodel=mongoose.model("data",schema);

app.get('/getdata',async(req,res)=>{
    try{
        const data=await Datamodel.find();
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