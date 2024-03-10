
// Import the express module
import express from "express";

// Import the ProductManager class from "../nextmain.js"
import ProductManager from "../nextmain.js";

// Create an instance of ProductManager
const productManager = new ProductManager();

// Create an instance of an Express router
const router = express.Router();

// Define a route for the home page ("/")
router.get("/", async (req, res) => {
    try {
        // Retrieve products using the getProducts method of the ProductManager instance
        const products = await productManager.getProducts();
        // Render the "home" view with the retrieved products
        res.render("home", { products: products });
    } catch (error) {
        // Log an error if there's an issue retrieving products
        console.log("error retrieving products", error);
        // Send a 500 Internal Server Error response with a JSON error message
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Define a route for the realtimeproducts page ("/realtimeproducts")
router.get("/realtimeproducts", async (req, res) => {
    // Render the "realTimeProducts" view with an empty array of products
    res.render("realTimeProducts", { products: [] });
});

// Export the router to be used in other files
export default router;
