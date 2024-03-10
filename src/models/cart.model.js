import mongoose from "mongoose";

// Define the schema for the cart
const cartSchema = new mongoose.Schema({
    // Array of products in the cart, each containing a product ID and quantity
    products: [
        {
            // Reference to a product document in the "Product" collection
            product: {
                type: mongoose.Schema.Types.ObjectId,  // Type is ObjectId
                ref: "Product",  // Reference to the "Product" collection
                required: true  // Product ID is required
            },
            // Quantity of the product in the cart
            quantity: {
                type: Number,  // Type is Number
                required: true  // Quantity is required
            }
        }
    ]
});

// Create a model based on the cart schema
const cartModel = mongoose.model("carts", cartSchema);

// Export the cart model
export default cartModel;