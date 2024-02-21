import ProductManager from "./nextmain.js";



import { promises as fs } from "fs";
import path from "path";

class Cart {
    constructor() {
        this.carts = [];
        this.rutaArchivo = "./carritos.json";
        this.initializeFile(); // Call the method to initialize the file
    }

    async initializeFile() {
        try {
            // Check if the file exists
            await fs.access(this.rutaArchivo);
        } catch (error) {
            // If the file doesn't exist, create it with an empty array
            await fs.writeFile(this.rutaArchivo, "[]");
            console.log(`File ${this.rutaArchivo} created successfully.`);
        }
    }

    async readCarts() {
        try {
            const content = await fs.readFile(this.rutaArchivo, "utf-8");
            return JSON.parse(content);
        } catch (error) {
            console.log("Error reading carts:", error);
            return [];
        }
    }

    async saveCarts(cartArray) {
        try {
            await fs.writeFile(this.rutaArchivo, JSON.stringify(cartArray, null, 2));
        } catch (error) {
            console.log("Error saving carts:", error);
        }
    }

    async addCart() {
        try {
            const currentCarts = await this.readCarts();

            const newCart = {
                id: this.generateCartId(),
                products: []
            };

            currentCarts.push(newCart);
            await this.saveCarts(currentCarts);
            return newCart;
        } catch (error) {
            console.log("Error creating cart:", error);
            return null;
        }
    }

    generateCartId() {
        // Generate a unique ID for the cart
        // This is a basic example, you may want to use a more robust method
        return Math.floor(Math.random() * 1000);
    }

    // async getCartProducts(cid) {
    //     try {
    //         const currentCarts = await this.readCarts();
    //         console.log("Current carts:", currentCarts);
    //         const cart = currentCarts.find(cart => cart.id === cid);
    //         console.log("Found cart:", cart);
    //         return cart ? cart.products : [];
    //     } catch (error) {
    //         console.log("Error getting cart products:", error);
    //         return [];
    //     }
    // }

    async getCartProducts(cid) {
        try {
            const currentCarts = await this.readCarts();
            const cart = currentCarts.find(cart => cart.id === cid);
            console.log(cart.products)
            return cart ? cart.products : [];
            
        } catch (error) {
            console.log("Error getting cart products:", error);
            return [];
        }
    }


    // async addProductToCart(cid, pid, quantity) {
    //     try {
    //         const currentCarts = await this.readCarts();
    //         const cartIndex = currentCarts.findIndex(cart => cart.id === cid);
    
    //         if (cartIndex !== -1) {
    //             const product = await productManager.getProductById(pid);
    
    //             if (product) {
    //                 const productIndex = currentCarts[cartIndex].products.findIndex(product => product.id === pid);
    
    //                 if (productIndex !== -1) {
    //                     // Product already exists in cart, update quantity
    //                     currentCarts[cartIndex].products[productIndex].quantity += quantity;
    //                 } else {
    //                     // Product doesn't exist in cart, add it
    //                     currentCarts[cartIndex].products.push({ id: pid, quantity });
    //                 }
    
    //                 await this.saveCarts(currentCarts);
    //                 return currentCarts[cartIndex].products;
    //             } else {
    //                 console.error("Product not found.");
    //                 return null;
    //             }
    //         } else {
    //             console.error("Product not found");
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //         return null;
    //     }
    // }

    async addProductToCart(cid, pid, quantity) {
        try {
            const currentCarts = await this.readCarts();
            const cartIndex = currentCarts.findIndex(cart => cart.id === cid);
    
            if (cartIndex !== -1) {
                const productIndex = currentCarts[cartIndex].products.findIndex(product => product.id === pid);
    
                if (productIndex !== -1) {
                    // Check if stock is available
                    const product = await productManager.getProductById(pid);
                    if (product && product.stock >= quantity) {
                        // Product already exists in cart, update quantity
                        currentCarts[cartIndex].products[productIndex].quantity += quantity;
    
                        // Decrease the stock count
                        await productManager.updateProduct(pid, 'stock', product.stock - quantity);
    
                        await this.saveCarts(currentCarts);
                        return currentCarts[cartIndex].products;
                    } else {
                        console.error("Product out of stock.");
                        return null;
                    }
                } else {
                    // Product doesn't exist in cart, add it
                    currentCarts[cartIndex].products.push({ id: pid, quantity });
    
                    // Decrease the stock count
                    await productManager.updateProduct(pid, 'stock', product.stock - quantity);
    
                    await this.saveCarts(currentCarts);
                    return currentCarts[cartIndex].products;
                }
            } else {
                console.error("Cart not found.");
                return null;
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            return null;
        }
    }
    

    
}

export default Cart;

const productManager = new ProductManager();

// const cart2= new Cart();

// // cart2.addCart();


// // const cart2= new Cart();

// // cart.addCart();

// // cart.addProductToCart(844,1,10);

// cart2.getCartProducts(49);