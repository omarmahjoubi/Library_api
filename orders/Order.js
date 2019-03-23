// load mongoose 
const mongoose =  require("mongoose") ;

mongoose.model("Order", {

    CustomerID : {
        type : mongoose.SchemaTypes.ObjectId ,
        require  : true 
    },

    BookID : {
        type : mongoose.SchemaTypes.ObjectId,
        require : true
    },

    InitialDate  : {
        type : Date ,
        require : true
    },

    DeliveryDate :  {
        type : Date ,
        require : true
    }

})