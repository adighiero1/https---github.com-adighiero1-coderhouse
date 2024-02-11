// const fs = require("fs").promises;
import { promises as fs } from "fs";
import path from "path";

class ProductManager {
    constructor() {
        this.products = [];
        this.Id = 1;
        this.rutaArchivo = "C:/Users/Ale/Desktop/desafios/src/usuariosss.json";
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

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const currentProducts = await this.readProducts();
    
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Missing fields.");
                return null;
            } else if (currentProducts.some(product => product.code === code)) {
                console.error("Product with the same code already exists in the database.");
                return null;
            } else {
                // Find the highest id among existing products
                const highestId = currentProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
    
                const newProduct = {
                    id: highestId + 1, // Increment the highest id by 1
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                };
    
                currentProducts.push(newProduct);
                await this.saveProducts(currentProducts);
                return newProduct;
            }
        } catch (error) {
            console.log("Error creating product:", error);
            return null;
        }
    }
  
      async readProducts() {
          try {
              const content = await fs.readFile(this.rutaArchivo, "utf-8");
              return JSON.parse(content);
          } catch (error) {
              console.log("Error reading products:", error);
              return [];
          }
      }
  
      async saveProducts(productArray) {
          try {
              await fs.writeFile(this.rutaArchivo, JSON.stringify(productArray, null, 2));
          } catch (error) {
              console.log("Error saving products:", error);
          }
      }
  
      async getProducts() {
          try {
              const products = await this.readProducts();
              console.log("Products registered:", products);
              return products;
          } catch (error) {
              console.log("Error getting products:", error);
              return [];
          }
      }
  
      async getProductById(id) {
        try {
            const products = await this.readProducts();
            const product = products.find(product => product.id === id);
            if (product) {
                console.log(product);
                return product;
            } else {
                console.log("Product does not exist.");
                return null;
            }
        } catch (error) {
            console.error("Error getting product by ID:", error);
            return null;
        }
    }
  
    async updateProduct(id, fieldToUpdate, newValue) {
      try {
          const products = await this.readProducts();
          const index = products.findIndex(product => product.id === id);
  
          if (index !== -1) {
              // Check if the specified field exists in the product
              if (fieldToUpdate in products[index]) {
                  // Update the specified field with the new value
                  products[index][fieldToUpdate] = newValue;
                  await this.saveProducts(products);
                  console.log(`Product with ID ${id} updated successfully.`);
                  console.log(products[index]);
                  return products[index];
              } else {
                  console.error(`Field '${fieldToUpdate}' does not exist in product.`);
                  return null;
              }
          } else {
              console.error("Product not found for updating.");
              return null;
          }
      } catch (error) {
          console.error("Error updating product:", error);
          return null;
      }
  }
  
  async deleteProduct(id) {
    try {
      const products = await this.readProducts();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0]; // Remove the product at index and get the deleted product
        await this.saveProducts(products);
        console.log(`Product with ID ${id} deleted successfully.`);
        console.log(deletedProduct); // Log the deleted product
        return deletedProduct; // Return the deleted product
      } else {
        console.error("Product not found for deletion");
        return null;
      }
    } catch (error) {
      console.error("Error deleting product", error);
      return null;
    }
  }

  
}
export default ProductManager;

const productManager = new ProductManager();

// // productManager.addProduct("Laptop3", "Powerful laptop for professional use", 1200, "laptop.jpg", "LP0a01", 50);

// // productManager.getProductById(1);

// productManager.getProducts();