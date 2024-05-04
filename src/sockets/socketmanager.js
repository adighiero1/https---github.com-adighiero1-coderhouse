// import { Server as SocketIOServer, Socket } from 'socket.io';
// import ProductService from "../services/productservices.js";
// //message Model

// const productService = new ProductService();
// class SocketManager{
// constructor(httpServer,socket){
// this.io=socket(httpServer);
// this.initSocketEvents();
// }

// async initSocketEvents() {
//     this.io.on("connection", async (socket) => {
//         console.log("a client has connected");
        
//         socket.emit("products", await productService.getProducts() );

//         socket.on("deleteProduct", async (id) => {
//             await productService.deleteProduct(id);
//             this.emitUpdatedProducts(socket);
//         });

//         socket.on("addProduct", async (product) => {
//             await productService.addProduct(product);
//             this.emitUpdatedProducts(socket);
//         });

//         // socket.on("message", async (data) => {
//         //     await MessageModel.create(data);
//         //     const messages = await MessageModel.find();
//         //     socket.emit("message", messages);
//         // });

       
//     });

   
// }


// async emitUpdatedProducts(socket){
//     socket.emit("products", await productService.getProducts());
// }






// }

// export default SocketManager;

// import {Server} from 'socket.io';
// import ProductService from "../services/productservices.js";
// //message Model

// const productService = new ProductService();

// class SocketManager {
//     constructor(httpServer, socket) {
//         this.io = socket; // Assign the socket parameter to io
//         this.initSocketEvents();
//         console.log(this.io);
//     }

//     async initSocketEvents() {
//         this.io.on("connection", async (socket) => {
//             console.log("a client has connected");

//             socket.emit("products", await productService.getProducts());

//             socket.on("deleteProduct", async (id) => {
//                 await productService.deleteProduct(id);
//                 this.emitUpdatedProducts(socket);
//             });

//             socket.on("addProduct", async (product) => {
//                 await productService.addProduct(product);
//                 this.emitUpdatedProducts(socket);
//             });

//             // ... (rest of your event handlers)
//         });
//     }

//     async emitUpdatedProducts(socket) {
//         socket.emit("products", await productService.getProducts());
//     }
// }

// export default SocketManager;

import { Server } from "socket.io";
import ProductService from "../services/productservices.js";

const productService = new ProductService();

class SocketManager {
    constructor(httpServer) {
        if (!httpServer) {
            throw new Error('HTTP server is required');
        }
        
        this.io = new Server(httpServer);
        this.initSocketEvents();
    }

    initSocketEvents() {
        if (!this.io) {
            throw new Error('Socket.IO server is not initialized');
        }

        this.io.on("connection", async (socket) => {
            console.log("a client has connected");
            
            socket.emit("products", await productService.getProducts());

            socket.on("deleteProduct", async (id) => {
                await productService.deleteProduct(id);
                this.emitUpdatedProducts(socket);
            });

            socket.on("addProduct", async (product) => {
                await productService.addProduct(product);
                this.emitUpdatedProducts(socket);
            });
        });
    }

    async emitUpdatedProducts(socket) {
        if (!socket) {
            throw new Error('Socket is required');
        }

        socket.emit("products", await productService.getProducts());
    }
}

export default SocketManager;
