const express = require("express")
const mongoose1 = require("mongoose")
const mongoose = require("mongoose")
const cors = require("cors")
const {busmodel} = require("./model/bus")
const {usermodel} = require("./model/user")
const jwt =require("jsonwebtoken")

const bcrypt = require("bcryptjs")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/userkdb?retryWrites=true&w=majority&appName=Cluster0')
mongoose.connect('mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/busdb?retryWrites=true&w=majority&appName=Cluster0')


const generateHashedPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}
app.post("/signup",async(req,res)=>{
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    let user = new usermodel(input)
    user.save()
    res.json({Status:"success"})
    
})

app.post("/login",(req,res)=>{
    let input =req.body
    usermodel.find({"email":req.body.email}).then(
        (response)=>{
            if(response.length>0)
                {
                    let dbpassword =response[0].pass
                    console.log(dbpassword)
                    bcrypt.compare(input.pass,dbpassword,(error,isMatch)=>{
                        if (isMatch) {
                            
                            jwt.sign({email:input.email},"blog-app",{expiresIn:"1d"},
                                (error,token)=>{
                                if (error) {
                                    res.json({Status:"unable to create token"})
                                } else {
                                    res.json({Status:"success","userid":response[0]._id,"token":token})
                                }
                            })
                        } else {
                            res.json({Status:"incorrect password"})
                        }
                    })
                }
            else{
                res.json({Status:"user not found"})
            }
        }
    )
    })

    app.post("/viewusers",(req,res)=>{
        let token = req.headers["token"]
        jwt.verify(token,"blog-app",(error,decoded)=>{
            if (error) {
                res.json({Status:"unauthorized access"})
            } else {
                if(decoded)
                    {
                        usermodel.find().then(
                            (response)=>{
                                res.json(response)
                            }
                        ).catch()
                    }
            }
        })
        
    })
    
    app.post("/add",(req,res)=>{
        const input = req.body
        const employee = new employeemodel(input)
        employee.save()
        console.log(employee)
        res.json({status:"success"})
    
        
    })

    app.post("/search",(req,res)=>{
        const input = req.body
        employeemodel.find(input).then(
            (data)=>{
                res.json(data)
                
    
            }
        ).catch(
            (error)=>{
                res.json(error)
            }
        )
        
    
    
    })



app.listen(8088,()=>{
    console.log("server started")
})