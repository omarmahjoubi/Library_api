// load express
const express = require("express") ;
const app = express() ;

// load body-parser
const bodyParser = require("body-parser") ;
app.use(bodyParser.json()) ;

// load mongoose
const mongoose = require("mongoose") ;

// connect to database
mongoose.connect("mongodb://admin:admin123@ds147985.mlab.com:47985/orders_database",() => {
    console.log("connected to database!") ;
}) ;

// load our model
require("./Order") ;
const Order = mongoose.model("Order") ;



app.listen(4000, () => {
    console.log("Up and running - Orders service!") ;
}) ;


// create a new order 
app.post('/order', (req,res) => {
    var newOrder = {
        CustomerID : mongoose.Types.ObjectId(req.body.CustomerID) ,
        BookID : mongoose.Types.ObjectId(req.body.BookID) ,
        InitialDate : req.body.InitialDate ,
        DeliveryDate : req.body.DeliveryDate
    } ;

    var order = new Order(newOrder) ;

    order.save().then(() => {
        res.send("Order created and saved to database!")
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;
})


// list all orders 
app.get('/orders',(req,res) => {

    Order.find().then((orders) => {
        res.json(orders) ;
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;

})

// home route 
app.get('/',(req,res) => {
    res.send("Welcome to the orders service!") ;
}) ;