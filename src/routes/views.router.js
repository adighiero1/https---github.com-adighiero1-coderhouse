 // Import the express module
 import express from "express";
import ViewsController from "../controller/views.controller.js";
const viewsController= new ViewsController();
 import passport from "passport";
 import jwt from "jsonwebtoken";
 // Import the ProductManager class from "../nextmain.js"
 import ProductManager from "../nextmain.js";
 import Cart from "../cart.js"
 import ProductController from "../controller/product.controller.js";
 import Swal from "sweetalert2";
 // Create an instance of ProductManager
 const productManager = new ProductManager();
 const productController = new ProductController();
 const cartManager= new Cart();
 
 // Create an instance of an Express router
 const router = express.Router();
 
////////////////////////////////////////////////////////////////////////////////
 
//  router.get("/", async (req, res) => {

//      res.redirect("/login");//redirects to the login.
//   })
 
//  // Define a route for the realtimeproducts page ("/realtimeproducts")
//  router.get("/realtimeproducts", async (req, res) => {
//      // Render the "realTimeProducts" view with an empty array of products
//      res.render("realTimeProducts", { products: [] });
//  });
 
// //  router.get("/products", async (req, res) => {
// //      const { page = 1, limit = 2, sort, query } = req.query;
// //      const user = req.session.user; // Use user instead of userdetails
// //      console.log(user); // Ensure that user contains the correct properties
// //      try {
// //          const products = await productManager.getProducts({
// //              page: parseInt(page),
// //              limit: parseInt(limit),
// //              sort,
// //              query,
// //          });
 
// //          res.render("home", {
// //              products: products.docs,
// //              hasPrevPage: products.hasPrevPage,
// //              hasNextPage: products.hasNextPage,
// //              prevPage: products.prevPage,
// //              nextPage: products.nextPage,
// //              currentPage: products.page,
// //              totalPages: products.totalPages,
// //              user: user // Pass user instead of userdetails
// //          });
// //      } catch (error) {
// //          console.error("Error fetching products:", error);
// //          res.status(500).send("Internal Server Error");
// //      }
// //  });

// router.get("/productss", passport.authenticate('jwt', { session: false }), async (req, res) => {
 
//     try {
//         const products = await productController.getProducts({ limit, page, sort, query });
//         res.render("home", {
//             products: products.docs,
//             hasPrevPage: products.hasPrevPage,
//             hasNextPage: products.hasNextPage,
//             prevPage: products.prevPage,
//             nextPage: products.nextPage,
//             currentPage: products.page,
//             totalPages: products.totalPages,
//             user: req.user // Passport sets the user in req.user
//         });
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


 
//  router.get("/cart/:cid", async (req, res) => {
//      try {
//          const cartId = req.params.cid;
//          const cartProducts = await cartManager.getCartProducts(cartId);
 
//          // Fetch the product details for each item in the cart
//          const productsWithDetails = await Promise.all(cartProducts.map(async (item) => {
//              const product = await productManager.getProductById(item.product);
//              return { product, quantity: item.quantity };
//          }));
 
//          res.render("cart", { products: productsWithDetails });
//      } catch (error) {
//          console.error("Error fetching cart products", error);
//          res.status(500).send("Internal Server Error");
//      }
//  });
 
 
//  router.get("/register", (req, res) => {
//      res.render("register");
//  })
 
//  router.get("/login", (req, res) => {
//      res.render("login");
//  })
 
 
//  router.get("/profile", passport.authenticate("jwt", {session:false}), (req, res) => {
//     console.log(req.user);
//      res.render("profile", {user: req.user});
//  })
 
 
// router.post("/logout", (req, res) => {
//     res.clearCookie("your_cookie_name_here");
//     res.redirect("/login");
//   })
//  // Define a route for t
 
//  // Export the router to be used in other files
//  export default router;
 



 ////////////////////////////////////////////////////////////////////////////////////////////

 router.get("/login",viewsController.login);
 router.get("/register",viewsController.register);
 router.get("/profile", passport.authenticate("jwt", { session: false }), viewsController.profile);
 router.get("/products",viewsController.getProducts);
 router.get("/realtimeproducts",viewsController.realtimeproducts);
 router.get("/home",viewsController.home);

 export default router;