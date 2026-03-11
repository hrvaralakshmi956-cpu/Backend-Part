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

// to view all the menus placed

app.get("/my-menus", async (req,res) =>{
    const allMenus = await menuCollection.find();
    console.log("My Menus",allMenus);
    res.send(allMenus);
});

app.listen(8000, () => {
    console.log("Server running in port", 8000)
});