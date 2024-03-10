// Importing required modules
import express from "express"; // Import the Express framework
import cartsRouter from "./routes/carts.router.js"; // Import the carts router
import productsRouter from "./routes/products.router.js"; // Import the products router
import exphbs from "express-handlebars"; // Import the Express Handlebars module
import { Server } from "socket.io"; // Import the Socket.IO server
import viewsRouter from "./routes/views.router.js"; // Import the views router
import ProductManager from "./nextmain.js"; // Import the ProductManager class
import "./connect.js";
// Create an instance of ProductManager
const productmanager = new ProductManager();

// Create an Express application
const app = express();

// Set the port number
const PORT = 8080;

// Configure Handlebars as the template engine
app.engine("handlebars", exphbs.engine());
// Set the view engine to use Handlebars
app.set("view engine", "handlebars");
// Set the directory where the views are located
app.set("views", "./src/views");

// Serve static files from the 'public' directory
app.use(express.static("./src/public"));

// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Use the carts router for requests to '/carts'
app.use("/carts", cartsRouter);
// Use the products router for requests to '/products'
app.use("/products", productsRouter);
// Use the views router for requests to '/'
app.use("/", viewsRouter);

// Start the HTTP server and listen on the specified port
const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Create a Socket.IO server using the HTTP server
const io = new Server(httpServer);

// Socket.IO event handlers
io.on("connection", async (socket) => {
    console.log("client connected");

    // Emit the list of products to the client when connected
    socket.emit("products", await productmanager.getProducts());

    // Listen for 'deleteProduct' events from the client
    socket.on("deleteProduct", async (id) => {
        // Delete the product with the specified ID
        await productmanager.deleteProduct(id);
        // Broadcast the updated list of products to all clients
        io.sockets.emit("products", await productmanager.getProducts());
    });

    // Listen for 'addProduct' events from the client
    socket.on("addProduct", async (product) => {
        try {
            console.log("Adding product:", product);
            // Add the new product to the list
            await productmanager.addProduct(
                product.title,
                product.description,
                product.price,
                product.image,
                product.code,
                product.stock,
                product.category
            );
            // Broadcast the updated list of products to all clients
            io.sockets.emit("products", await productmanager.getProducts());
        } catch (error) {
            console.error("Error adding product:", error);
        }
    });
});