
// import CartModel from "../models/cart.model.js";
// import Cart from "../cart.js";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";

// //Me traigo el Modelo y las funciones de Bcrypt
// import UserModel from "../models/user.model.js";
// import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

// //Importamos la estrategia de GitHub: 
// import GitHubStrategy from "passport-github2";


// const initializePassport = () => {
//     //Creamos la estrategia para el Registro de usuarios: 
//     passport.use("register", new LocalStrategy({
//         //Le digo que quiero acceder al objeto request. 
//         passReqToCallback: true,
//         usernameField: "email",
//         //Le digo que el campo para el usuario será el email. 
//     }, async (req, username, password, done) => {
//         const { first_name, last_name, email, age } = req.body;

//         try {
//             //Verificamos si ya existe un registro con ese mail. 
//             let user = await UserModel.findOne({ email });
//             if (user) return done(null, false);
//             const newCart = await CartModel.create({ products: [] });
//             //Si no existe, voy a crear un registro para el nuevo usuario: 

//             let newUser = {
//                 first_name,
//                 last_name,
//                 email,
//                 age,
//                 password: createHash(password),
//                 cartID: newCart._id 
//             }

//             //Lo guardamos en la BD: 
//             let result = await UserModel.create(newUser);
//             return done(null, result);
//         } catch (error) {
//             return done(error);
//         }
//     }))
//     //Creamos la estrategia para el Login de Usuarios: 

//     passport.use("login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//         try {
//             //Primero verifico si existe un usuario con ese email: 
//             const user = await UserModel.findOne({ email });
//             if (!user) {
//                 console.log("Este usuario no existeeee ehhhh rescatateeee barrilete");
//                 return done(null, false);
//             }

//             //Si existe verifico la contraseña:
//             if (!isValidPassword(password, user)) return done(null, false);

//             return done(null, user);
//         } catch (error) {
//             return done(error);
//         }
//     }))

//     //Serializar usuarios: 

//     passport.serializeUser((user, done) => {
//         done(null, user._id);
//     })

//     passport.deserializeUser(async (id, done) => {
//         let user = await UserModel.findById({_id:id});
//         done(null, user);
//     })

//     //Acá trabajamos con la estrategia de GitHub: 

//     //Instalamos: npm i passport-github2

//     passport.use("github", new GitHubStrategy({
//         clientID:"Iv1.c27064b9d23e7f55",
//         clientSecret: "b54bc86337b7f94e0dec336468a956eeeb2e12ae",
//         callbackURL: "http://localhost:8080/api/sessions/githubcallback"
//     }, async (accessToken, refreshToken, profile, done) => {
//         //Una buena idea para chequear que todo funciona bien es mostrar por consola el perfil: 
//         //console.log("Perfil del usuario:", profile);
//         try {
//             let user = await UserModel.findOne({email:profile._json.email});

//             if(!user) {
//                 let newUser = {
//                     first_name: profile._json.name,
//                     last_name: "Lastname",
//                     age: 30,
//                     email: profile._json.email,
//                     password: "Thispassword",
//                 }
//                 let result = await UserModel.create(newUser);
//                 done(null, result);
//             } else {
//                 done(null, user);
//             }
//         } catch (error) {
//             return done(error);
//         }
//     }))
// }


// export default initializePassport; 


////////////////////////////////////////////////////////////////////////////////////////////////////



import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import passport from 'passport';
// import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
// import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['your_cookie_name_here'];
    }
    return token;
};

const initializePassport = () => {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "your_jwt_secret_key_here",
  };

  passport.use('jwt', new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      console.log(jwt_payload);
      const user = await UserModel.findOne({email:jwt_payload.email});
      console.log(user);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }));
};

export default initializePassport;