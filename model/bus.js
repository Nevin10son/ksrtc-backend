const mongoose = require("mongoose")


const schema1 = mongoose.Schema({
    "busname":{type:String,required:true},
    "route":{type:String,required:true},
    "busno":{type:Number,required:true},
    "drivername":{type:String,required:true}
})


let busmodel = mongoose.model("buses",schema)
module.exports = {busmodel}

