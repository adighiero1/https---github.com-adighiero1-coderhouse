// import { io } from "socket.io-client";
// import ProductService from "../../services/productservices.js";
// const productService = new ProductService();
// //forget the messager for now.




// class SocketManager{
    
//     constructor(httpServer){
//         this.io= io(httpServer);
//         this.initSocketEvents();
//     }
// async initSocketEvents(){


    
//     this.io.on("connection", async (socket) => {
//         console.log("client connected");
//         socket.on("products", async () => {
//             const products = await productService.getProducts();
//             socket.emit("products", products);
//         });
//         socket.on("addProduct", async (product) => {
//             await productService.addProduct(product);
//             const products = await productService.getProducts();
//             socket.emit("products", products);
//         });
//         socket.on("updateProduct", async (product) => {
//             await productService.updateProduct(product);
//             const products = await productService.getProducts();
//             socket.emit("products", products);
//         });
//         socket.on("deleteProduct", async (id) => {
//             await productService.deleteProduct(id);
//             const products = await productService.getProducts();
//             socket.emit("products", products);
//         });
//     });
// }



// }


// console.log("connected");




// export default SocketManager;

// import { io } from "socket.io-client";
// import ProductService from "../../services/productservices.js";
// const productService = new ProductService();

// class SocketManager {
//     constructor(httpServer) {
//         this.io = io(httpServer);
//         this.initSocketEvents();
//     }

//     async initSocketEvents() {
//         console.log("Initializing socket events...");
//         this.io.on("connection", async (socket) => {
//             console.log("Client connected");
//             socket.on("products", async () => {
//                 const products = await productService.getProducts();
//                 socket.emit("products", products);
//             });
//             socket.on("addProduct", async (product) => {
//                 await productService.addProduct(product);
//                 const products = await productService.getProducts();
//                 socket.emit("products", products);
//             });
//             socket.on("updateProduct", async (product) => {
//                 await productService.updateProduct(product);
//                 const products = await productService.getProducts();
//                 socket.emit("products", products);
//             });
//             socket.on("deleteProduct", async (id) => {
//                 await productService.deleteProduct(id);
//                 const products = await productService.getProducts();
//                 socket.emit("products", products);
//             });
//         });
//     }
// }

// // Export the SocketManager instance
// export default SocketManager;

// Import ProductService
// import { io } from "socket.io-client";
// import ProductService from "../../services/productservices.js";

// // Create a new instance of ProductService
// const productService = new ProductService();

// // Log a message to indicate that the script is connected
// console.log("connected");

// // Create a socket connection
// const socket = io();

// // Listen for the "products" event from the server and call printProducts with the received data
// socket.on("products", (data) => {
//     printProducts(data);
// });

// // Function to render products on the client side
// const printProducts = async (products) => {
//     // Get the container element where products will be displayed
//     const productContainer = document.getElementById("productContainer");
//     // Clear the container
//     productContainer.innerHTML = "";

//     // Loop through each product and create a card element for it
//     products.forEach(item => {
//         const card = document.createElement("div");
//         card.classList.add("card");

//         // Set the inner HTML of the card with product information
//         card.innerHTML = ` 
//             <p> Product ID: ${item.id} </p>
//             <p> Product: ${item.title} </p>
//             <p> Price: ${item.price} </p>
//             <button> Delete </button>
//         `;

//         // Append the card to the product container
//         productContainer.appendChild(card);

//         // Add event listener to the delete button to delete the product
//         card.querySelector("button").addEventListener("click", () => {
//             deleteProduct(item.id);
//         });
//     });
// };

// // Function to add a product
// const addProduct = () => {
//     // Create a product object with values from input fields
//     const product = {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         price: document.getElementById("price").value,
//         image: document.getElementById("image").value,
//         code: document.getElementById("code").value,
//         stock: document.getElementById("stock").value,
//         category: document.getElementById("category").value,
//         status: document.getElementById("status").value === "true"
//     };
//     // Log the product being sent
//     console.log("Sending product:", product);
//     // Emit an "addProduct" event with the product data
//     socket.emit("addProduct", product);
// };

// // Function to delete a product
// const deleteProduct = (id) => {
//     // Emit a "deleteProduct" event with the product ID to delete
//     socket.emit("deleteProduct", id);
// };




// // Optionally, log a message to indicate that the file was loaded
// console.log("Main.js loaded.");


import { io } from "socket.io-client";
import ProductService from "../../services/productservices.js";

// Create a new instance of ProductService
const productService = new ProductService();

// Log a message to indicate that the script is connected
console.log("connected");

// Create a socket connection
const socket = io();

// Listen for the "products" event from the server and call printProducts with the received data
socket.on("products", (data) => {
    printProducts(data);
});

// Function to render products on the client side
const printProducts = async (products) => {
    // Get the container element where products will be displayed
    const productContainer = document.getElementById("productContainer");
    // Clear the container
    productContainer.innerHTML = "";

    // Loop through each product and create a card element for it
    products.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Set the inner HTML of the card with product information
        card.innerHTML = ` 
            <p> Product ID: ${item.id} </p>
            <p> Product: ${item.title} </p>
            <p> Price: ${item.price} </p>
            <button> Delete </button>
        `;

        // Append the card to the product container
        productContainer.appendChild(card);

        // Add event listener to the delete button to delete the product
        card.querySelector("button").addEventListener("click", () => {
            deleteProduct(item.id);
        });
    });
};

// Function to add a product
const addProduct = async () => {
    // Create a product object with values from input fields
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        image: document.getElementById("image").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    // Log the product being sent
    console.log("Sending product:", product);

    try {
        // Add the product using the ProductService
        await productService.addProduct(product);
        // Emit an "addProduct" event with the product data
        socket.emit("addProduct", product);
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

// Function to delete a product
const deleteProduct = async (id) => {
    try {
        // Delete the product using the ProductService
        await productService.deleteProduct(id);
        // Emit a "deleteProduct" event with the product ID to delete
        socket.emit("deleteProduct", id);
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

// Optionally, log a message to indicate that the file was loaded
console.log("Main.js loaded.");




















// productService= new ProductService();

// Log a message to indicate that the script is connected
// console.log("connected");

// const socketManager= new SocketManager(io);

// Create a socket connection
// const socket = io();

// Listen for the "products" event from the server and call printProducts with the received data
// socket.on("productss", (data) => {
//     printProducts(data);
// });

// // Function to render products on the client side
// const printProducts = (products) => {
//     // Get the container element where products will be displayed
//     const productContainer = document.getElementById("productContainer");
//     // Clear the container
//     productContainer.innerHTML = "";

//     // Loop through each product and create a card element for it
//     products.forEach(item => {
//         const card = document.createElement("div");
//         card.classList.add("card");

//         // Set the inner HTML of the card with product information
//         card.innerHTML = ` 
//             <p> Product ID: ${item.id} </p>
//             <p> Product: ${item.title} </p>
//             <p> Price: ${item.price} </p>
//             <button> Delete </button>
//         `;

//         // Append the card to the product container
//         productContainer.appendChild(card);

//         // Add event listener to the delete button to delete the product
//         card.querySelector("button").addEventListener("click", () => {
//             deleteProduct(item.id);
//         });
//     });
// };

// // Function to add a product
// const addProduct = () => {
//     // Create a product object with values from input fields
//     const product = {
//         title: document.getElementById("title").value,
//         description: document.getElementById("description").value,
//         price: document.getElementById("price").value,
//         image: document.getElementById("image").value,
//         code: document.getElementById("code").value,
//         stock: document.getElementById("stock").value,
//         category: document.getElementById("category").value,
//         status: document.getElementById("status").value === "true"
//     };
//     // Log the product being sent
//     console.log("Sending product:", product);
//     // Emit an "addProduct" event with the product data
//     socket.emit("addProduct", product);
// };

// // Function to delete a product
// const deleteProduct = (id) => {
//     // Emit a "deleteProduct" event with the product ID to delete
//     socket.emit("deleteProduct", id);
// };







