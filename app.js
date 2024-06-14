const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {busmodel} = require("./model/bus")
const bcrypt = require("bcryptjs")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/cinemadb?retryWrites=true&w=majority&appName=Cluster0')


const generateHashedPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}
app.post("/signup",async(req,res)=>{
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    let bus = new busmodel(input)
    bus.save()
    res.json({"status":"success"})
    
})

app.listen(8088,()=>{
    console.log("server started")
})