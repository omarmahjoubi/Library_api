// load express
const express = require("express") ;
const app = express() ;

// load mongoose
const mongoose = require("mongoose") ;

// load body-parser
const bodyParser = require("body-parser") ;
app.use(bodyParser.json()) ;

//connect to database
mongoose.connect("mongodb://admin:admin123@ds042459.mlab.com:42459/customers_database",() => {
    console.log("connected to database") ;
}) ;

// load our model
require('./Customer') ;
const Customer = mongoose.model("Customer") ;

app.listen('5000',() => {
    console.log("Up and running - Customers service !") ;
}) ;

// add a new customer
app.post('/customer',(req,res) => {

    var newCustomer = {
        name : req.body.name ,
        age : req.body.age ,
        address : req.body.address
    } ;

    var customer = new Customer(newCustomer) ;

    customer.save().then(() =>{
        res.send("Customer created and saved to database!") ;
    }).catch((err) ={
        if (err) {
            throw err ;
        }
    }) ;

}) ;

// list all customers 
app.get('/customers', (req,res) => {

    Customer.find().then((customers) => {
        res.json(customers) ;
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;

})

//  list on customer by his id
app.get('/customer/:id',(req,res) => {

    Customer.findById(req.params.id).then((customer) => {
        if (customer) {
            res.json(customer) ;
        } else {
            res.send("Invalid ID!") ;
        }
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;

})

// delete one customer
app.delete('/customer/:id',(req,res) => {

    Customer.findOneAndDelete(req.params.id).then(()=> {
        res.send("customer deleted!") ;
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;

})

// home route
app.get("/", (req,res) => {
    res.send("Welcome to customers service!") ;
}) ;