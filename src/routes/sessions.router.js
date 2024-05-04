// import express from "express";
// const router = express.Router(); 
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
// import passport from "passport";
import CartModel from "../models/cart.model.js";
import Cart from "../cart.js";
import express from 'express';
const router = express.Router();

import passport from 'passport';
import jwt from "jsonwebtoken";
import UserController from "../controller/user.controller.js";
const userController= new UserController();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/logout", userController.logoutUser);

export default router;