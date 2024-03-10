import { promises as fs } from "fs";
import productModel from "./models/product.model.js";

class ProductManager {
    async addProduct(title, description, price, thumbnail, code, stock, category) {
        try {
            const currentProduct = await productModel.findOne({ code });
            if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
                console.log("Missing fields.");
                return null;
            } else if (currentProduct) {
                console.error("Product already exists");
                return null;
            } else {
                const newProduct = new productModel({
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    category,
                    status: true
                });
                await newProduct.save();
                return newProduct;
            }
        } catch (error) {
            console.log("Error creating product:", error);
            return null;
        }
    }

    async getProducts() {
        try {
            const productos = await productModel.find(); 
            return productos;
        } catch (error) {
            console.log("Error fetching products", error); 
            throw error; 
        }
    }


    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            if (!product) {
                console.log("The product was not found!");
                return null;
            }
            return product;
        } catch (error) {
            console.error("Error using the ID:", error);
            return null;
        }
    }

    async updateProduct(id, fieldToUpdate, newValue) {
        try {
            const product = await productModel.findById(id);
            if (!product) {
                console.error("Product not found for updating.");
                return null;
            }
            if (fieldToUpdate in product.schema.paths) {
                product[fieldToUpdate] = newValue;
                await product.save();
                console.log(`Product with ID ${id} updated successfully.`);
                console.log(product);
                return product;
            } else {
                console.error(`Field '${fieldToUpdate}' does not exist in product.`);
                return null;
            }
        } catch (error) {
            console.error("Error updating product:", error);
            return null;
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id);
            if (!deletedProduct) {
                console.error("Product not found for deletion");
                return null;
            }
            console.log(`Product with ID ${id} deleted successfully.`);
            console.log(deletedProduct);
            return deletedProduct;
        } catch (error) {
            console.error("Error deleting product", error);
            return null;
        }
    }
}

export default ProductManager;
