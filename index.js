const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("db connected");
    }
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "twig");
app.use("/", require("./routes/contacts.route"));


app.listen(PORT, ()=>{
    console.log(`server is running ont port ${PORT}`);
})