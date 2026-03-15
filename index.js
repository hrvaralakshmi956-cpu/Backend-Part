import mongoose from "mongoose";
import express, { urlencoded } from "express";
import cors from "cors";

//CORS - cross origin Resource sharing

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded());

mongoose
    .connect("mongodb://localhost:27017/restaurant")
    .then((ack) => {
        if (ack) {
            console.log("connected");
        }
    })
    .catch((err) => {
        console.log("error", err);
    });

// creating collection

//creating a validation schema

const orderSchema = new mongoose.Schema({
    orderName: String,
    qty: Number,
    location: String,
    contactNo: String
})

const orderCollection = new mongoose.model("orders", orderSchema);

//menu collection creation flow

const menuSchema = new mongoose.Schema({
    menuName: String,
    price: Number,
    stock: Number
});
const menuCollection = new mongoose.model("menu", menuSchema);

// storing products
const productSchema=new mongoose.Schema({
    category:String,
    price:Number,
    rating:{rate:Number, count:Number},
    description:String,
    image:String,
    title:String,
    id:Number
})

const productCollection = new mongoose.model("product-cart",productSchema);

//storing products

app.post("/addToCart",(req,res)=>{
  productCollection.findOne({title:req.body.title}).then((alreadyAddedToCart)=>{
  if(alreadyAddedToCart)
  {
    res.send("Products is already added to Cart");
  }
  else{
    const newCartItem=productCollection(req.body);
    newCartItem.save().then((isSaveSuccess)=>{
        if (isSaveSuccess) {
            res.send("Item Added To Cart");
        }
        else {
            res.send("Failed To Add Item to Cart")
        }
        
    }).catch((exerror)=>{
        console.log(exerror);
        res.send("An error occured ! please try again!")
    });
  }
  }).catch((exe) => {
   console.log(exe);
   res.send("unable to add products to cart at the moment")
});
})

app.post("/add-menu", (req, res) => {
    menuCollection.findOne({ menuName: req.body.menuName }).then((isMenuPresent) => {
        if (isMenuPresent) {
            res.send("Menu is already created! please use it");
        }
        else {
            const newMenu = menuCollection(req.body);
            newMenu.save().then((isMenuCreated) => {
                if (isMenuCreated) {
                    res.send("Menu Createdd successfully");
                }
                else {
                    res.send("Error in Creating the Menu please try after some time")
                }
            }).catch((err) => {
                console.log(err)
            });
        }
    }).catch(() => { })
})

//Route
app.get("/", (req, res) => {
    res.send("Welcome to Node Express JS classes");
});

app.get("/login", (req, res) => {
    console.log("req sent", req.body);
})

app.get("/enquiry", (req, res) => {
    console.log(
        "query params sent from FE",
        req.query.name,
        req.query.age,
        req.query.address
    );
    res.send("Got query params thank you !");
});

app.post("/place-order", (req, res) => {
    console.log("order req", req.body);
    orderCollection
        .findOne({ orderName: req.body.orderName })
        .then((isOrderplaced) => {
            if (isOrderplaced) {
                res.send("Order is already placed!");
            } else {
                const newOrder = orderCollection(req.body);
                newOrder
                    .save()
                    .then((isSaveSuccess) => {
                        if (isSaveSuccess) {
                            res.send("Order placed Thank you!");
                        }
                        else {
                            res.send("Failed to place an Order! please try again")
                        }
                    }).catch((exe) => {
                        console.log(exe);
                    });
            }
        });
});

// to view all the orders placed

app.get("/my-orders", async (req, res) => {
    const allOrders = await orderCollection.find();
    console.log("my orders", allOrders);
    res.send(allOrders);
});

app.get("/cartItems", async (req, res) => {
    const allOrders = await productCollection.find();
    console.log("All cart Itmes", allOrders);
    res.send(allOrders);
});

// Route to update existing Records

app.put("/update-menu", async (req, res) => {
    try {
        const isMenuUpdated = await menuCollection.findOneAndUpdate(
            { menuName: req.body.menuName },//filter
            req.body,
            { returnDocument: true },
        );

        if (isMenuUpdated) {
            res.send("menu Updated Successfully");
        }
        else{
            res.send("Error in Menu Updation  Process");

        }
    } catch (error) {
        console.log("err",error);
        res.send("Error in updating!")
    }
});

app.put("/update-order",async(req,res)=>{
     try {
        const isOrderUpdateSuccess= await orderCollection.findOneAndUpdate(
           {orderName:req.body.orderName},
           req.body,
           {returnDocument: true}
        );
        if(isOrderUpdateSuccess)
        {
          res.send("Order has been updated");
        }else{
            res.send("Error in updation");
        }

     } catch (error) {
        console.log("error",error);
        res.send("internal error! please try again!")
     }
})

app.delete("/delete-order", async (req,res)=>{
  try {
    const isOrderDeleted=await orderCollection.findOneAndDelete({
    orderName:req.body.orderName
    });
    if(isOrderDeleted)
    {
        res.send("Order deleted Successflly!")
    }  
    else{
        res.send("Orderr not found")
    } 
    }catch (error) {
      res.send("Internal Server error! please try again later")
  }   
});

app.delete("/delete-menu",async (req,res)=>{
    try{
    const ismenuDeleted=await menuCollection.findOneAndDelete({
     menuName:req.body.menuName
    });
    if(ismenuDeleted)
    {
        res.send("menu deleted Successfully!")
    }
    else{
        res.send("menu not found")
    }
    } catch (error) {
        res.send("Internal Server error! please try again later")
    }

});


app.listen(8000, () => {
    console.log("Server running in port", 8000)
});

