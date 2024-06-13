const mongoose = require("mongoose")
const schema = mongoose.Schema({
    "name":{type:String,required:true},
    "email":{type:String,required:true},
    "phoneno":{type:String,required:true},
    "gender":{type:String,required:true},
    "password":{type:String,required:true},
    "busname":{type:String,required:true},
    "route":{type:String,required:true},
    "busno":{type:Number,required:true},
    "drivername":{type:String,required:true}
})

let busmodel = mongoose.model("buses",schema)
module.exports = {busmodel}