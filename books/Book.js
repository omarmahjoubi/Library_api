// load mongoose
const mongoose = require("mongoose") ;

// Book model
mongoose.model("Book", {
    // title, author , numberOfPages , publisher

    title : {
        type : String ,
        require : true 
    },

    author :  {
        type : String ,
        require : true 
    },

    numberOfPages : {
        type : Number ,
        require : false
    },

    publisher : {
        type : String , 
        require : false
    }

})
