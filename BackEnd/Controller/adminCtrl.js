const jwt = require("jsonwebtoken");

//FIXED ADMIN CREDENTIALS
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

//LOGIN ONLY
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    //check credentials
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    //create token
    const token =jwt.sign(
        { email: ADMIN_EMAIL },
        "Shoo!",
        { expiresIn: "1d" }
    );

    return res.json({
        message: "Login successful",
        token,
    });
};