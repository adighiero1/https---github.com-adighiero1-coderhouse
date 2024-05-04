

import ProductService from "../services/productservices.js";
const productService = new ProductService();

class ProductController {
    async getProducts(req, res) {
        
        try {
            let { limit=10, page=1, sort, query } = req.query;
            const products = await productService.getProducts({  page,
                limit,
                sort,
                query, });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: "Error fetching products", error: error.message });
        }
    }

    async getProductById(req, res) {
        const productId = req.params.pid;
        const product = await productService.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }

    async addProduct(req, res) {
        const productData = req.body;
        const newProduct = await productService.addProduct(productData);
        if (newProduct) {
            res.status(201).json({ message: "Product created successfully", product: newProduct });
        } else {
            res.status(400).json({ message: "Failed to create product" });
        }
    }

    async updateProduct(req, res) {
        const productId = req.params.pid;
        const updatedData = req.body;
        const updatedProduct = await productService.updateProduct(productId, updatedData);
        if (updatedProduct) {
            res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
        } else {
            res.status(404).json({ message: "Product not found or field does not exist" });
        }
    }

    async deleteProduct(req, res) {
        const productId = req.params.pid;
        const deletedProduct = await productService.deleteProduct(productId);
        if (deletedProduct) {
            res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    }
}

export default ProductController;
