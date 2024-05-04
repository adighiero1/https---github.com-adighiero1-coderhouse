import CartService from "../services/cartservice.js";
const cartService = new CartService();




class CartController {
    async addCart(req, res) {
        try {
            const newCart = await cartService.addCart();
            res.json(newCart);
        } catch (error) {
            res.status(500).send("Error creating cart");
        }
    }

    async getCartProducts(req, res) {
        const cartId = req.params.cartId;
        try {
            const cart = await cartService.getCartProducts(cartId);
            if (!cart) {
                return res.status(404).json({ error: "Cart not found" });
            }
            res.json(cart);
        } catch (error) {
            res.status(500).send("Error fetching cart products");
        }
    }

    async addProductToCart(req, res) {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const quantity = req.body.quantity || 1;
        try {
            const cart = await cartService.addProductToCart(cartId, productId, quantity);
            res.json(cart);
        } catch (error) {
            res.status(500).send("Error adding product to cart");
        }
    }// check this one again

    // async deleteProductFromCart(req, res) {
    //     const cartId = req.params.cartId;
    //     const productId = req.params.productId;
    //     try {
    //         const cart = await cartService.deleteProductFromCart(cartId, productId);
    //         res.json(cart);
    //     } catch (error) {
    //         res.status(500).send("Error deleting product from cart");
    //     }
    // }

    async deleteProductFromCart(req, res) {
        const cartId = req.params.cartId;
        const productId = req.params.productId;

        try {
            const cart = await cartService.deleteProductFromCart(cartId, productId);
            if (!cart) {
                return res.status(404).json({ error: 'Cart not found' });
            }
            return res.json(cart);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error deleting product from cart' });
        }
    }

    async updateCart(req, res) {
        const cartId = req.params.cartId;
        const updatedProducts = req.body;
        try {
            const cart = await cartService.updateCart(cartId, updatedProducts);
            res.json(cart);
        } catch (error) {
            res.status(500).send("Error updating cart");
        }
    }

    async updateProductQuantity(req, res) {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const newQuantity = req.body.quantity;
        try {
            const cart = await cartService.updateProductQuantity(cartId, productId, newQuantity);
            res.json(cart);
        } catch (error) {
            res.status(500).send("Error updating product quantity in cart");
        }
    }

    async deleteAllProductsFromCart(req, res) {
        const cartId = req.params.cartId;
        try {
            const cart = await cartService.deleteAllProductsFromCart(cartId);
            res.json(cart);
        } catch (error) {
            res.status(500).send("Error deleting all products from cart");
        }
    }
}

export default CartController;
