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
    
    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) {
                console.error("Cart not found.");
                return null;
            }
            const productIndex = cart.products.findIndex(product => product.product.toString() === pid.toString());
            if (productIndex !== -1) {
                // Remove the product at the found index
                cart.products.splice(productIndex, 1);
                // Save the cart to update the changes
                await cart.save();
                return cart.products;
            } else {
                console.error("Product not found in cart.");
                return null;
            }
        } catch (error) {
            console.error("Error deleting product from cart.", error);
            return null;
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            // Find the cart by its ID
            const cart = await CartModel.findById(cartId);
    
            if (!cart) {
                throw new Error('Cart not found');
            }
    
            // Update the products array in the cart with the new array of products
            cart.products = updatedProducts;
    
            // Mark the 'products' field as modified to ensure Mongoose saves it
            cart.markModified('products');
    
            // Save the updated cart
            await cart.save();
    
            // Return the updated cart
            return cart;
        } catch (error) {
            console.error('Error updating cart in the manager', error);
            throw error;
        }
    }
//2nd pre-entrega PUT api/carts/:cid/products/:pid 
    async updateProductQuantity(cid, pid, newQuantity) {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) {
                console.error("Cart not found.");
                return null;
            }
    
            const productIndex = cart.products.findIndex(product => product.product.toString() === pid.toString());
            if (productIndex !== -1) {
                // Product found in cart, update quantity
                cart.products[productIndex].quantity = newQuantity;
                await cart.save();
                return cart.products;
            } else {
                console.error("Product not found in cart.");
                return null;
            }
        } catch (error) {
            console.error("Error updating product quantity in cart.", error);
            return null;
        }
    }
//segunda pre-entrega delete all from cart api/carts/:cid
    async deleteAllProductsFromCart(cid) {
        try {
            const cart = await CartModel.findById(cid);
            if (!cart) {
                console.error("Cart not found.");
                return null;
            }
            // Remove all products from the cart
            cart.products = [];
            // Save the cart to update the changes
            await cart.save();
            return cart.products;
        } catch (error) {
            console.error("Error deleting all products from cart.", error);
            return null;
        }
    }


}

export default Cart;
