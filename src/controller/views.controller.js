import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";
import CartService from "../services/cartservice.js";

import UserController from "../controller/user.controller.js";
const userController= new UserController();
const cartService = new CartService();

class ViewsController{
    async getProducts(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;
    
            const products = await productService.getProducts({ page, limit, skip });
            const { docs: productos, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage, prevLink, nextLink } = products;
    
            const cartId = req.user.cart.toString();
    
            res.render("products", {
                productos,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                currentPage: page,
                totalPages,
                cartId,
                prevLink,
                nextLink
            });
        } catch (error) {
            console.error("Error rendering products", error);
            res.status(500).json({ error: "Internal Server Error" });
        }

        
    }

    async login(req, res) {
        res.render("login");
    }
    
    async realtimeproducts(req, res) {
        try{
            res.render("realTimeProducts");
        }catch(error){
            console.log("error logging realtime products", error);
            res.status(500).json({error:"Internal Server Error"});
        }
    }
    async chat(req, res) {
        res.render("chat");
    }

    async home(req, res) {
        res.render("home");
    }

    async register(req, res) {
        res.render("register");
    }

    async profile(req, res) {
        try {
            res.render("profile", { user: req.user });
        } catch (error) {
            console.error("Error rendering profile", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default ViewsController;