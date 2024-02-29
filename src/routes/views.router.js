

import express from "express";
import ProductManager from "../nextmain.js";

const productManager = new ProductManager();
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render("home", { products: products });
    } catch (error) {
        console.log("error retrieving products", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", { products: [] });
});

export default router;
