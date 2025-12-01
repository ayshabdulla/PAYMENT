//models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String, //stored fileman //multer package
});
module.exports = mongoose.model('Product',ProductSchema);