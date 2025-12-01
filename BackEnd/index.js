// RENDER DEBUG CHECK IMAGE FIX

require ("dotenv").config();
const express = require("express");
//const mongoose = require ("mongoose");
const cors = require("cors");
const productRoutes = require("./Routes/productRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const cartRouter = require("./Routes/cartRoutes");
const adminRouter = require("./Routes/adminRoutes");
const RunServer = require("./Database/connection");

const app = express();
app.use(cors());
app.use(express.json());


const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "Uploads")));


//ROUTEs+
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);

RunServer()


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
