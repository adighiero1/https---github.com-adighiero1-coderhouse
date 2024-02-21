import express from "express";
import Cart from "../cart.js";

const router = express.Router();
const cart = new Cart();

router.post("/", async (req, res) => {
    try {
        const thiscart = await cart.addCart();
        res.status(201).json(thiscart); // Respond with the created product
    } catch (error) {
        console.error("Error adding cart", error);
        res.status(500).send("Server error");
    }
});

router.get("/:cid", async (req,res)=>{
    try{
        const cid = parseInt(req.params.cid);
        const thiscart= await cart.getCartProducts(cid);
        if (thiscart) {
            res.json(thiscart);
        } else {
            res.status(404).send("Product not found");
        }
    }catch(error){
        console.error("Error fetching cart:", error);
        res.status(500).send("Internal server error");
    }
});

router.post("/:cid/product/:pid",async (req,res)=>{
    try{
        const cid=parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        const cartAddition= await cart.addProductToCart(cid,pid,1);
        if(cartAddition){
            res.json(cartAddition);
        }else{
            res.status(404).send("Cart not found");
        }

    }catch(error){
        console.error("Error fetching cart:", error);
        res.status(500).send("Internal server error");
    }
});

export default router;
