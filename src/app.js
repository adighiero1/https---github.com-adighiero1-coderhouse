// Importing required modules
import express from "express"; // Import the Express framework
import cartsRouter from "./routes/carts.router.js"; // Import the carts router
import productsRouter from "./routes/products.router.js"; // Import the products router
import exphbs from "express-handlebars"; // Import the Express Handlebars module
import { Server } from "socket.io"; // Import the Socket.IO server
import viewsRouter from "./routes/views.router.js"; // Import the views router
import ProductManager from "./nextmain.js"; // Import the ProductManager class
import "./connect.js";
import messageModel from "./models/message.model.js";
import Swal from "sweetalert2";
import cookieParser from "cookie-parser";
import session from "express-session";
import FileStore  from "session-file-store";
import sessionsRouter from "./routes/sessions.router.js";
import MongoStore from "connect-mongo";
const fileStore = FileStore(session);
// Create an instance of ProductManager
const productmanager = new ProductManager();

// Create an Express application
const app = express();

// Set the port number
const PORT = 8080;

// Configure Handlebars as the template engine
app.engine("handlebars", exphbs.engine({
    runtimeOptions:{
        allowProtoMethodsByDefault:true,
        allowProtoPropertiesByDefault:true,
    }
}));
// Set the view engine to use Handlebars
app.set("view engine", "handlebars");
// Set the directory where the views are located
app.set("views", "./src/views");
const mypassword= "cocoandzeus"
app.use(session({
    secret:"cocoandzeus",
    resave: true,
    

    saveUninitialized: true,
  
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://dighieroalejandro:Cure707buy!@codercluster.jnomixr.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=CoderCluster", ttl: 100
    })
}))


// Serve static files from the 'public' directory
app.use(express.static("./src/public"));
app.use(cookieParser(mypassword));
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
app.use("/products",viewsRouter);
app.use("/api/sessions", sessionsRouter);
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

    socket.on("message", async (data) => {
        try {
            console.log("Received message:", data);
            // Save the message to the database
            await messageModel.create(data);
            // Emit the message to all clients, including the sender
            io.emit("message", data);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });
});