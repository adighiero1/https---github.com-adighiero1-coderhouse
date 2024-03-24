import { promises as fs } from "fs";
import productModel from "./models/product.model.js";
import mongoose from "mongoose";

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
// // old get products
//     async getProducts({ skip = 0, limit = 2 }) {
//         try {
//           // Use Mongoose find() with optional chaining and default values
//           const productos = await productModel.find({}, { skip: skip?.valueOf() || 0, limit: limit?.valueOf() || 2 });
//           return productos;
//         } catch (error) {
//           console.log("Error fetching products", error);
//           throw error; // Re-throw the error for proper handling
//         }
//       }

// async getProducts({ limit = 2, page = 1, sort, query } = {}) {
//     try {
//         const skip = (page - 1) * limit;

//         let queryOptions = {};

//         if (query) {
//             queryOptions = { category: query };
//         }

//         const sortOptions = {};
//         if (sort) {
//             if (sort === 'asc' || sort === 'desc') {
//                 sortOptions.price = sort === 'asc' ? 1 : -1;
//             }
//         }

//         const products = await productModel
//             .find(queryOptions)
//             .sort(sortOptions)
//             .skip(skip)
//             .limit(limit);

//         const totalProducts = await productModel.countDocuments(queryOptions);

//         const totalPages = Math.ceil(totalProducts / limit);
//         const hasPrevPage = page > 1;
//         const hasNextPage = page < totalPages;

//         const baseUrl = `/products?limit=${limit}&sort=${sort}&query=${query}`;

//         return {
//             docs: products,
//             totalPages,
//             prevPage: hasPrevPage ? page - 1 : null,
//             nextPage: hasNextPage ? page + 1 : null,
//             page,
//             hasPrevPage,
//             hasNextPage,
//             prevLink: hasPrevPage ? `${baseUrl}&page=${page - 1}` : null,
//             nextLink: hasNextPage ? `${baseUrl}&page=${page + 1}` : null,
//         };
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         throw error;
//     }
// }

async getProducts({ limit = 2, page = 1, sort, query } = {}) {
    try {
        const skip = (page - 1) * limit;

        let queryOptions = {};
        if (query) {
            queryOptions = { category: query };
        }

        const sortOptions = {};
        if (sort) {
            if (sort === 'asc' || sort === 'desc') {
                sortOptions.price = sort === 'asc' ? 1 : -1;
            }
        }

        const products = await productModel
            .find(queryOptions)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const totalProducts = await productModel.countDocuments(queryOptions);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        return {
            docs: products,
            totalPages,
            hasPrevPage,
            hasNextPage,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page,
        };
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
            const deletedProduct = await productModel.findByIdAndDelete(mongoose.Types.ObjectId.createFromHexString(id));
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
