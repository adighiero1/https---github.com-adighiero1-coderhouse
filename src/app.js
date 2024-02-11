import ProductManager from "./nextmain.js";

import express from "express";

const productManager = new ProductManager();
const app = express();
const PORT = 8080;
// productManager.getProducts();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/products", async(req,res)=>{
let limit= parseInt(req.query.limit);
    try{
   const products=await productManager.getProducts();
   if(limit){
    let listproducts=products.slice(0,limit);
    res.json(listproducts);
   }
   else{
    res.json(products)}

    }
    catch (error){
        console.error("Error fetching products:", error);
        res.status(500).send("Internal server error");
    }
})

app.get("/products/:pid", async (req, res) => {
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
//listening
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
