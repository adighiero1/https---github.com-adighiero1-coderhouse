
// Import the express module
import express from "express";

// Import the ProductManager class from "../nextmain.js"
import ProductManager from "../nextmain.js";
import Cart from "../cart.js"

import Swal from "sweetalert2";
// Create an instance of ProductManager
const productManager = new ProductManager();
const cartManager= new Cart();

// Create an instance of an Express router
const router = express.Router();

// Define a route for the home page ("/")
// router.get("/", async (req, res) => {
//     try {
//         // Retrieve products using the getProducts method of the ProductManager instance
//         const products = await productManager.getProducts();
//         // Render the "home" view with the retrieved products
//         res.render("home", { products: products });
//     } catch (error) {
//         // Log an error if there's an issue retrieving products
//         console.log("error retrieving products", error);
//         // Send a 500 Internal Server Error response with a JSON error message
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


router.get("/", async (req, res) => {
    res.render("chat");
 })

// Define a route for the realtimeproducts page ("/realtimeproducts")
router.get("/realtimeproducts", async (req, res) => {
    // Render the "realTimeProducts" view with an empty array of products
    res.render("realTimeProducts", { products: [] });
});

router.get("/products", async (req, res) => {
    const { page = 1, limit = 2, sort, query } = req.query;

    try {
        const products = await productManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit),
            sort,
            query,
        });

        res.render("home", {
            products: products.docs,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/cart/:cid", async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cartProducts = await cartManager.getCartProducts(cartId);

        // Fetch the product details for each item in the cart
        const productsWithDetails = await Promise.all(cartProducts.map(async (item) => {
            const product = await productManager.getProductById(item.product);
            return { product, quantity: item.quantity };
        }));

        res.render("cart", { products: productsWithDetails });
    } catch (error) {
        console.error("Error fetching cart products", error);
        res.status(500).send("Internal Server Error");
    }
});

// Define a route for t

// Export the router to be used in other files
export default router;
