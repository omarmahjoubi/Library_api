// load express
const express = require("express") ;
const app = express() ;

// load body-parser
const bodyParser = require("body-parser") ;
app.use(bodyParser.json()) ;

// load mongoose
const mongoose = require("mongoose") ;

// load axios 
const axios = require("axios") ;

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

// list one order by his id
app.get('/order/:id', (req,res) => {

    Order.findById(req.params.id).then((order) => {
        if (order) {
            axios.get("http://localhost:5000/customer/" + order.CustomerID).then((response) => {
                var orderObject = { customerName : response.data.name , bookTitle : '' } ;

                axios.get("http://localhost:8000/book/" + order.BookID).then((response) => {
                    orderObject.bookTitle = response.data.title ; 
                    res.json(orderObject) ;
                })
            }) ;
        } else {
            res.send("Invalid ID!") ;
        }
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;

}) ;

// delete an order 
app.delete('/order/:id',(req,res) => {

    Order.findOneAndDelete(req.params.id).then(() => {
        res.send("Order deleted!") ;
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;

}) ;

// home route 
app.get('/',(req,res) => {
    res.send("Welcome to the orders service!") ;
}) ;