import express from "express";
import ProductManager from "../nextmain.js";
import mongoose from "mongoose";
const router = express.Router();
const productManager = new ProductManager();

// router.get("/", async(req,res)=>{
//     let limit= parseInt(req.query.limit);
//     try{
//         const products=await productManager.getProducts();
//         if(limit){
//             let listproducts=products.slice(0,limit);
//             res.json(listproducts);
//         }
//         else{
//             res.json(products);
//         }

//     }
//     catch (error){
//         console.error("Error fetching products:", error);
//         res.status(500).send("Internal server error");
//     }
// });

router.get("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = await productManager.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Product not found");
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).send("Internal server error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, category } = req.body;
        const product = await productManager.addProduct(title, description, price, thumbnail, code, stock, category);
        res.status(201).json(product); // Respond with the created product
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).send("Server error");
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const { title, description, price, thumbnail, code, stock, category } = req.body;

        if (title) {
            await productManager.updateProduct(pid, 'title', title);
        }
        if (description) {
            await productManager.updateProduct(pid, 'description', description);
        }
        if (price) {
            await productManager.updateProduct(pid, 'price', price);
        }
        if (thumbnail) {
            await productManager.updateProduct(pid, 'thumbnail', thumbnail);
        }
        if (code) {
            await productManager.updateProduct(pid, 'code', code);
        }
        if (stock) {
            await productManager.updateProduct(pid, 'stock', stock);
        }
        if (category) {
            await productManager.updateProduct(pid, 'category', category);
        }

        res.status(200).json(await productManager.getProductById(pid));
    } catch (error) {
        console.error("Error editing product:", error);
        res.status(500).send("Server error");
    }
});

router.delete("/:pid", async (req, res) => {
    try {
        const pid = req.params.pid;
        if (!mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).send("Invalid product ID");
        }

        const product = await productManager.deleteProduct(pid);
        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Server error");
    }
});

export default router;
