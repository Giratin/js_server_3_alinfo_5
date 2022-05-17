const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    image: String
}, {
    timestamps: true
});


const Product = mongoose.model("product", productSchema);


module.exports = { Product }