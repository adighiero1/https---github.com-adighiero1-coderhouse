import cartModel from "../models/cart.model.js";

class CartService{

    async addCart() {
        try {
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error("Error");
        }
    }

    async getCartProducts(cartId) {
        try {
            console.log(cartId);
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                console.error("Cart not found.");
                return null;
            }
            return cart;
        } catch (error) {
            throw new Error("Error");
        }
    }

   
    
    async addProductToCart(cartId, productId, quantity=1) {//might need to change quantity to 1
        try {
            const cart = await this.getCartProducts(cartId);
            const productexists=cart.products.find(item => item.product._id.toString() === productId);
            if (productexists) {
                productexists.quantity+=quantity;
            }else{
                cart.products.push({product:productId,quantity});
            }
            cart.markModified("products");
           
    
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error("Error");
        }
    }
    
    async deleteProductFromCart(cartId, productId) {
        try {
            const cart= await cartModel.findById(cartId);
            if(!cart){
                throw new Error("Cart not found");
            }
            cart.products= cart.products.filter(item => item.product._id.toString() !== productId);
            await cart.save();
            return cart;
        } catch (error) {
          throw new Error("Error");
        }
    }

    async updateCart(cartId, updatedProducts) {
        try {
            // Find the cart by its ID
            const cart = await cartModel.findById(cartId);
    
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
    async updateProductQuantity(cid, productId, newQuantity) {
        try {
            console.log("Cart ID:", cid);
            console.log("Product ID:", productId);
            console.log("New Quantity:", newQuantity);
            const cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error("Cart not found");
                
            }
    //item vs cart?
            // const productIndex = cart.products.findIndex(product => product.product.toString() === pid.toString());
            const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId);
            console.log('Product index:', productIndex);
            console.log('Cart products:', cart.products);
            if (productIndex !== -1) {
                // Product found in cart, update quantity
                cart.products[productIndex].quantity = newQuantity;
                cart.markModified('products');
                await cart.save();
                return cart;
            } else {
                throw new Error('Producto no encontrado en el carrito');
            }
        } catch (error) {
            throw new Error("Error al actualizar las cantidades");
        }
    }

    async deleteAllProductsFromCart(cartId) {
        try {
            const cart = await cartModel.findByIdAndUpdate(
                cartId,
                {products:[]},
                {new:true}
            );
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw new Error("Error");
        }
    }
}

export default CartService; 