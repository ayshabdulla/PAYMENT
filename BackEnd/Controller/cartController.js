const Cart = require("../Models/cart");
const Product = require("../Models/product");

//ADD TO CART
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        //check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        } 

        //check if product already in cart
        const existingItem = await Cart.findOne({ productId });
        if (existingItem) {
            existingItem.quantity += quantity || 1;
            await existingItem.save();
            return res.json({ message: "Cart updated", cartItem: existingItem });
        }

        //Create new cart item
        const cartItem = new Cart({
            productId,
            quantity: quantity || 1,
        });
        
        await cartItem.save();
        res.json({ message: "Added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get All Cart Items (with product details)
exports.getCartItems = async (req, res) => {
    try {
        const items = await Cart.find().populate("productId"); //gets product name, price, image
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};