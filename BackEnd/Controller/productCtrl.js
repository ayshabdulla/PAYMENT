const Product = require("../Models/product");

//@desc  Add a new product with image
//@route POST /api/products/add
exports.addProduct = async (req, res) =>{
    try {
        const { name, price } = req.body;
        // /uploads/171345812345.png  (example)
        // if no image uploaded -> imagePath =""
        const imagePath = req.file ? `/uploads/${req.file.filename}`:"";

        const product = new Product({
            name,
            price,
            image: imagePath,
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create product" });
    }
};

//desc  Get all products
//@route GET /api/products
exports.getAllProducts = async (req, res) => {
    try {
       const products = await Product.find().sort({ createdAt: -1 });
       res.json(products); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.deleteProduct = async(req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};