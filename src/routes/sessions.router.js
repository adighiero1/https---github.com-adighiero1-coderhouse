import express from "express";
const router = express.Router(); 
import UserModel from "../models/user.model.js";

// sessions.router.js

// router.post("/register", async (req, res) => {
//     const { first_name, last_name, email, password, age } = req.body;

//     try {
//         // Check if the email is already registered
//         const existingUser = await UserModel.findOne({ email: email });
//         if (existingUser) {
//             return res.status(400).send("The email is already in use");
//         }

//         // Create a new user
//         const newUser = await UserModel.create({ first_name, last_name, email, password, age });

//         // Set the session variables
//         req.session.login = true;
//         req.session.user = { ...newUser._doc };

//         // Redirect to the profile page
//         res.redirect("/profile");
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// });


// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const usuario = await UserModel.findOne({ email: email });
//         if (usuario) {
//             if (usuario.password === password) {
//                 req.session.login = true;
//                 req.session.user = {
//                     email: usuario.email,
//                     age: usuario.age,
//                     first_name: usuario.first_name,
//                     last_name: usuario.last_name
//                 }
//                 console.log("Login successful for email:", email);
//                 res.redirect("/products"); // Redirect to the products page
//             } else {
//                 console.log("Incorrect password for email:", email);
//                 res.status(401).send("Contraseña no válida");
//             }

//         } else {
//             console.log("User not found for email:", email);
//             res.status(404).send("Usuario no encontrado");
//         }
//     } catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// });

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send("The email is already in use");
        }

        // Check if the email is for an admin
        const isAdmin = email.includes("adminCoder@coder.com");

        // Skip saving admin users to the database
        if (isAdmin) {
            // Redirect to the admin profile page
            req.session.login = true;
            req.session.user = {
                email,
                age,
                first_name,
                last_name,
                isAdmin
            };
            return res.redirect("/profile");
        } else {
            // Create a new user
            const newUser = await UserModel.create({ first_name, last_name, email, password, age });

            // Set the session variables
            req.session.login = true;
            req.session.user = { 
                email, 
                age, 
                first_name, 
                last_name,
                isAdmin
            };

            // Redirect to the regular profile page
            res.redirect("/profile");
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Server Error");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await UserModel.findOne({ email: email });
        if (usuario) {
            if (usuario.password === password) {
                // Check if the email is for an admin
                const isAdmin = email.includes("adminCoder@coder.com");

                req.session.login = true;
                req.session.user = {
                    email: usuario.email,
                    age: usuario.age,
                    first_name: usuario.first_name,
                    last_name: usuario.last_name,
                    isAdmin
                }

                console.log("Login successful for email:", email);
                if (isAdmin) {
                    res.redirect("/profile");
                } else {
                    res.redirect("/products");
                }
            } else {
                console.log("Incorrect password for email:", email);
                res.status(401).send("Contraseña no válida");
            }
        } else {
            console.log("User not found for email:", email);
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error interno del servidor");
    }
});





// Logout
router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Internal Server Error");
            }
            res.redirect("/login");
        });
    } else {
        res.redirect("/login");
    }
});

export default router;