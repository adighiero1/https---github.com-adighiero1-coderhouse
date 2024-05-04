// import UserService from "../services/userservices.js";
// import UserModel from "../models/user.model.js";
// import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
// // import passport from "passport";
// import CartModel from "../models/cart.model.js";
// import Cart from "../cart.js";
// import express from 'express';
// import passport from 'passport';
// import jwt from "jsonwebtoken";
// const userService= new UserService();

// class UserController{

// async registerUser(req,res){

// const{first_name,last_name,email,password,age}=req.body;



// try{

//     const thisUser= await userService.findUser(email);
// if(thisUser){
//     return res.status("The user already exists");
// }
// const newCart = await CartModel.create({ products: [] });
// const userData={
//     first_name,
//     last_name,
//     email,
//     password,
//     age,
//     cartID: newCart._id,
// }
// await userService.createUser(userData);
// console.log(userData);
// }
// catch(error){
//     console.log(error);
// }

// }


// }

// export default UserController;

import UserService from "../services/userservices.js";
import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import CartModel from "../models/cart.model.js";
import Cart from "../cart.js";
import express from 'express';
import passport from 'passport';
import jwt from "jsonwebtoken";

const userService = new UserService();

class UserController {
  async registerUser(req, res) {
    const { first_name, last_name, email, password, age } = req.body;

    try {
      const thisUser = await userService.findUser(email);
      if (thisUser) {
        return res.status(400).send('The user already exists');
      }

      const newCart = await CartModel.create({ products: [] });
      const userData = {
        first_name,
        last_name,
        email,
        password:createHash(password),
        age,
        cartID: newCart._id,
      };
      await userService.createUser(userData);
      const token= jwt.sign({email},"your_jwt_secret_key_here",{expiresIn:"1h"});
        res.cookie("your_cookie_name_here",token,{
    maxAge: 3600000, //1 houe
    httpOnly: true
  })
   res.redirect("/profile");
     
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
   
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    try {
      const user = await userService.findUser(email);
      if (!user || !isValidPassword(password, user)) {
        return res.status(401).send("Invalid email or password");
      }

      const token = jwt.sign({ email: user.email, role: user.role }, "your_jwt_secret_key_here", { expiresIn: "1h" });
      res.cookie("your_cookie_name_here", token, { maxAge: 3600000, httpOnly: true });
      res.redirect("/profile");
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
  async logoutUser(req, res) {
    res.clearCookie("your_cookie_name_here");
    res.redirect("/login");
  }
}

export default UserController;
