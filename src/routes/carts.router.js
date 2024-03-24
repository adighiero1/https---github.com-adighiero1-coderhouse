// import express from "express";
// import Cart from "../cart.js";

// const router = express.Router();
// const cart = new Cart();

// router.post("/", async (req, res) => {
//     try {
//         const thiscart = await cart.addCart();
//         res.status(201).json(thiscart); // Respond with the created product
//     } catch (error) {
//         console.error("Error adding cart", error);
//         res.status(500).send("Server error");
//     }
// });

// router.get("/:cid", async (req,res)=>{
//     try{
//         const cid = parseInt(req.params.cid);
//         const thiscart= await cart.getCartProducts(cid);
//         if (thiscart) {
//             res.json(thiscart);
//         } else {
//             res.status(404).send("Product not found");
//         }
//     }catch(error){
//         console.error("Error fetching cart:", error);
//         res.status(500).send("Internal server error");
//     }
// });

// router.post("/:cid/product/:pid",async (req,res)=>{
//     try{
//         const cid=parseInt(req.params.cid);
//         const pid = parseInt(req.params.pid);
//         const cartAddition= await cart.addProductToCart(cid,pid,1);
//         if(cartAddition){
//             res.json(cartAddition);
//         }else{
//             res.status(404).send("Cart not found");
//         }

//     }catch(error){
//         console.error("Error fetching cart:", error);
//         res.status(500).send("Internal server error");
//     }
// });

// export default router;

import express from "express";
import Cart from "../cart.js";

const router = express.Router();
const cart = new Cart();

router.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit) || 10;
    let page = parseInt(req.query.page) || 1;
    let sort = req.query.sort === "asc" ? "asc" : req.query.sort === "desc" ? "desc" : null;
    let query = req.query.query || "";

    try {
        const products = await productManager.getProducts();

        // Apply query filter
        let filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        // Apply sorting
        if (sort === "asc") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "desc") {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        res.json(paginatedProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal server error");
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const thiscart = await cart.getCartProducts(cid);
        if (thiscart) {
            res.json(thiscart);
        } else {
            res.status(404).send("Cart not found");
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).send("Internal server error");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cartAddition = await cart.addProductToCart(cid, pid, 1);
        if (cartAddition) {
            res.json(cartAddition);
        } else {
            res.status(404).send("Cart not found");
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send("Internal server error");
    }
});
//added method for second submission
router.delete("/:cid/product/:pid", async (req, res) => {//DELETE api/carts/:cid/products/:pid 
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const cartDeletion = await cart.deleteProductFromCart(cid, pid);
        if (cartDeletion) {
            res.status(200).json({ message: "Product deleted from cart successfully" });
        } else {
            res.status(404).json({ error: "Cart or product not found" });
        }
    } catch (error) {
        console.error("Error deleting product from cart.", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put("/:cid", async (req, res) => {//PUT api/carts/:cid
    try {
        const cid = req.params.cid;
        const updatedProducts = req.body; // Assuming the request body contains the updated array of products
        const updatedCart = await cart.updateCart(cid, updatedProducts);
        res.status(200).json(updatedCart); // Respond with the updated cart
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).send("Internal server error");
    }
});

router.put("/:cid/products/:pid", async (req, res) => {//PUT api/carts/:cid/products/:pid 
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const quantity = req.body.quantity; // Assuming the new quantity is passed in the request body

        const cartUpdate = await cart.updateProductQuantity(cid, pid, quantity);
        if (cartUpdate) {
            res.status(200).json({ message: "Product quantity updated successfully" });
        } else {
            res.status(404).json({ error: "Cart or product not found" });
        }
    } catch (error) {
        console.error("Error updating product quantity in cart.", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/:cid", async (req, res) => {//DELETE api/carts/:cid deberá 
    try {
        const cid = req.params.cid;
        const cartDeletion = await cart.deleteAllProductsFromCart(cid);
        if (cartDeletion) {
            res.status(200).json({ message: "All products deleted from cart successfully" });
        } else {
            res.status(404).json({ error: "Cart not found" });
        }
    } catch (error) {
        console.error("Error deleting all products from cart.", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;
