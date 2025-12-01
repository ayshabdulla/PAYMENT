const Stripe = require("stripe");
const Product = require("../Models/product");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//POST /api/payment/checkout
exports.createCheckoutSession = async (req, res) => {
    try {
        const { cartItems } = req.body; //Array: [{ productId, quantity }]

        //Fetch product details from DB
        const line_items = await Promise.all(
            cartItems.map(async(item) => {
                const product = await Product.findById(item.productId);

                if(!product) throw new Error("Product not found");

                return{
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: product.name,
                            description: product.description,
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: item.quantity,
                };
            })
        );

        //Create Stripe Checkout session
        const session =await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.status(200).json({ url: session.url });
    } catch (err) {
        console.error("Stripe error:", err.message);
        res.status(500).json({ error: "Payment session creation failed" });
    }
};

//Cash On Delivery Controller
exports.cashOnDelivery = async (req, res) => {
    try {
        const { cartItems, user } = req.body;

        //basic validation
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is Empty" });
        }

        //You cam save order to DB here if needed
        //For now, just respond success

        res.status(200).json({
            status: "success",
            message: "Order placed successfully with Cash on Delivery",
            orderDetails: {
                user,
                cartItems,
                paymentMethod: "COD",
            },
        });
    } catch (error) {
        console.error("COD Error:", err.message);
        res.status(500).json({ error: "Failed to place COD order "});
    }
};


