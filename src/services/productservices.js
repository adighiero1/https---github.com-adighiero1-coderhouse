


import ProductModel from "../models/product.model.js";
class ProductService {
    

    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
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
    
            const products = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);
    
            
    
            const totalProducts = await ProductModel.countDocuments(queryOptions);
           
            const totalPages = Math.ceil(totalProducts / limit);
           
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;
    
            return { //remember to maybe add the prev link and next link
                docs: totalProducts,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            console.log("Error fetching products", error);
            throw error;
        }
    }


    async getProductById(productId) {
        try {
            const product = await ProductModel.findById(productId);
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

    async addProduct(productData) {
        try {
            const newProduct = new ProductModel(productData);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.log("Error creating product:", error);
            return null;
        }
    }

    async updateProduct(productId, updatedData) {
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                console.error("Product not found for updating.");
                return null;
            }

            Object.keys(updatedData).forEach(key => {
                product[key] = updatedData[key];
            });

            await product.save();
            console.log(`Product with ID ${productId} updated successfully.`);
            return product;
        } catch (error) {
            console.error("Error updating product:", error);
            return null;
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(productId);
            if (!deletedProduct) {
                console.error("Product not found for deletion");
                return null;
            }
            console.log(`Product with ID ${productId} deleted successfully.`);
            return deletedProduct;
        } catch (error) {
            console.error("Error deleting product", error);
            return null;
        }
    }
}

export default ProductService;
