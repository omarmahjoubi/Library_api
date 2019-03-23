// load express
const express = require("express") ;
const app = express() ; 


//load body-parser
const bodyParser = require("body-parser") ;
app.use(bodyParser.json());

// load mongoose
const mongoose = require("mongoose") ;

// load the model
require("./Book");
const Book = mongoose.model("Book") ;

// connect 
mongoose.connect("mongodb://admin:admin123@ds121636.mlab.com:21636/books_database",() => {
    console.log("Database is connected!");
});

// start server
app.listen(8000, () => {
    console.log("up and running ! -- this is our book service");
});


// create func
app.post('/book',(req,res) => {
    // This is out create func
    var newBook =  {
        title : req.body.title ,
        author : req.body.author ,
        numberOfPages : req.body.numberOfPages ,
        publisher : req.body.publisher
    }
    
    // Create a new book
    var book = new Book(newBook) ;
    
    // save book to database
    book.save().then(() => {
        console.log("new book cretaed and saved to database!") ;
    }).catch((err) => {
        if(err) {
            throw err ;
        }
    });

    res.send("A new book created and saved to database with success!");
});

// list all the books
app.get('/books',(req,res) => {
    Book.find().then((books) => {
        res.json(books) ;
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;
}) ;

// list one book by his id
app.get("/book/:id", (req,res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book) ;
        } else {
            res.sendStatus(404) ;
        }
    }).catch((err) => {
        if (err) {
            throw err ;
        }
    }) ;
}) ;

// delete one book
app.delete('/book/:id',(req,res) => {
    Book.findOneAndDelete(req.params.id).then(() => {
        res.send("Book deleted with success!") ;
    }).catch((err) => {
        if (err) {
            throw err ; 
        }
    }) ;
}); 
app.get('/',(req,res) => {
    res.send("This is our main endpoint") ;
}) ;