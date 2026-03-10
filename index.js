import mongoose from "mongoose";
import express,{ urlencoded } from "express";
import cors from "cors";

//CORS - cross origin Resource sharing

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded());

mongoose
.connect("mongodb://localhost:27017/restaurant")
.then((ack)=>{
    if (ack) {
        console.log("connected");
    }
    })
.catch((err) =>{
    console.log("error",err);
});

// creating collection

//creating a validation schema

const orderSchema=new mongoose.Schema({
    orderName:String,
    qty:Number,
    location:String,
    contactNo:String
})

const orderCollection=new mongoose.model("orders",orderSchema)

//Route
app.get("/",(req, res)=>{
    res.send("Welcome to Node Express JS classes");
});

 app.get("/login",(req,res)=>{
    console.log("req sent",req.body);
 })

 app.get("/enquiry",(req,res)=>{
    console.log(
        "query params sent from FE",
       req.query.name,
       req.query.age,
       req.query.address 
    );
    res.send("Got query params thank you !");
 });

app.post("/place-order",(req,res)=>{
    const newOrder=req.body;
    orderCollection.findOne({orderName:req.body.orderName}).then((isOrderplaced)=>{

    })
});

app.listen(8000,()=>{
    console.log("Server running in port",8000)
});