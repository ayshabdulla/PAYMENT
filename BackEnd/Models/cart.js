const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // actual product reference
        ref: "Product", //refers to Product model
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

module.exports = mongoose.model("Cart", CartSchema);