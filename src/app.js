

import express from "express";
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./nextmain.js";

const productmanager= new ProductManager();
const app = express();
const PORT = 8080;

//configuring handlebars

app.engine("handlebars", exphbs.engine());
//this line above configures the handlebars engine

// we are telling express when they see ".handlebars" to render with the plantillas engine.

app.set ("view engine", "handlebars");
//here above we are telling the engine to use handlebars

app.set ("views","./src/views");
//here we are telling it where to find the handlebar files
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/carts", cartsRouter);
app.use("/products", productsRouter);



app.use("/",viewsRouter);

const httpServer= app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


const io= new Server(httpServer);

io.on("connection",async(socket)=>{
    console.log("client connected");
    socket.emit("products",await productmanager.getProducts());

    socket.on("deleteProduct", async (id) => {
        await productmanager.deleteProduct(id);
        io.sockets.emit("products", await productmanager.getProducts());
    });

    socket.on("addProduct", async (product) => {
        try {
            console.log("Adding product:", product);
            await productmanager.addProduct(product.title, product.description, product.price, product.image, product.code, product.stock, product.category);
            io.sockets.emit("products", await productmanager.getProducts());
        } catch (error) {
            console.error("Error adding product:", error);
        }
    });
});
