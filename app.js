const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {busmodel} = require("./model/bus")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/cinemadb?retryWrites=true&w=majority&appName=Cluster0')

app.post("/signup",(req,res)=>{
    res.json({"status":"success"})
    
})

app.listen(8088,()=>{
    console.log("server started")
})