import ProductManager from "./nextmain.js";

import cartModel from "./models/cart.model.js"

import { promises as fs } from "fs";





import CartModel from "./models/cart.model.js";

class Cart {
    constructor() {
        this.rutaArchivo = "./carritos.json";
        this.initializeFile(); // Call the method to initialize the file
    }

    async initializeFile() {
        try {
            // No need for this method when using Mongoose
        } catch (error) {
            console.log("Error initializing file:", error);
        }
    }

    async readCarts() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log("Error reading carts:", error);
            return [];
        }
    }

    async saveCarts(cartArray) {
        try {
            // No need for this method when using Mongoose
        } catch (error) {
            console.log("Error saving carts:", error);
        }
    }

    async addCart() {
        try {
            const newCart = new CartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error creating cart:", error);
            return null;
        }
    }

    async getCartProducts(cid) {
        try {
            return (await CartModel.findById(cid))?.products || [];
        } catch (error) {
            console.log("Error getting cart products:", error);
            return [];
        }
    }

    // async addProductToCart(cid, pid, quantity) {
    //     try {
    //         const cart = await CartModel.findById(cid);
    //         if (!cart) {
    //             console.error("Cart not found.");
    //             return null;
    //         }

    //         const productIndex = cart.products.findIndex(product => product.product.toString() === pid);
    //         if (productIndex !== -1) {
    //             // Product already exists in cart, update quantity
    //             cart.products[productIndex].quantity += quantity;
    //         } else {
    //             // Product doesn't exist in cart, add it
    //             cart.products.push({ product: pid, quantity });
    //         }

    //         await cart.save();
    //         return cart.products;
    //     } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //         return null;
    //     }
    // }

    // async addProductToCart(cid, pid, quantity) {
    //     try {
    //         const cart = await CartModel.findById(cid);
    //         if (!cart) {
    //             console.error("Cart not found.");
    //             return null;
    //         }
    
    //         const productIndex = cart.products.findIndex(product => product.product.toString() === pid.toString());
    //         if (productIndex !== -1) {
    //             // Product already exists in cart, update quantity
    //             cart.products[productIndex].quantity += quantity;
    //         } else {
    //             // Product doesn't exist in cart, add it
    //             cart.products.push({ product: pid, quantity });
    //         }
    
    //         await cart.save();
    //         return cart.products;
    //     } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //         return null;
    //     }
    // }
    // async addProductToCart(cid, pid, quantity) {
    //     try {
    //         const cart = await CartModel.findById(cid);
    //         if (!cart) {
    //             console.error("Cart not found.");
    //             return null;
    //         }
    
    //         const productIndex = cart.products.findIndex(product => product.product.toString() === pid.toString());
    //         if (productIndex !== -1) {
    //             // Product already exists in cart, update quantity
    //             cart.products[productIndex].quantity += quantity;
    //         } else {
    //             // Product doesn't exist in cart, add it
    //             cart.products.push({ product: pid.toString(), quantity });
    //         }
    
    //         await cart.save();
    //         return cart.products;
    //     } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //         return null;
    //     }
    // }
    
    // async addProductToCart(cid, pid, quantity) {
    //     try {
    //         const cart = await CartModel.findById(cid.toString());
    //         if (!cart) {
    //             console.error("Cart not found.");
    //             return null;
    //         }
    
    //         const productIndex = cart.products.findIndex(product => product.product.toString() === pid.toString());
    //         if (productIndex !== -1) {
    //             // Product already exists in cart, update quantity
    //             cart.products[productIndex].quantity += quantity;
    //         } else {
    //             // Product doesn't exist in cart, add it
    //             cart.products.push({ product: pid.toString(), quantity });
    //         }
    
    //         await cart.save();
    //         return cart.products;
    //     } catch (error) {
    //         console.error("Error adding product to cart:", error);
    //         return null;
    //     }
    // }
    
    async addProductToCart(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) {
                console.error("Cart not found.");
                return null;
            }
    
            const productIndex = cart.products.findIndex(product => product.product.toString() === pid.toString());
            if (productIndex !== -1) {
                // Product already exists in cart, update quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Product doesn't exist in cart, add it
                cart.products.push({ product: pid.toString(), quantity });
            }
    
            await cart.save();
            return cart.products;
        } catch (error) {
            console.error("Error adding product to cart:", error);
            return null;
        }
    }
    


}

export default Cart;
