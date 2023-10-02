import { Router } from "express";
import userController from "../Controller/user.controller";
import { validateSignin, validateSignup } from "../Auth/validations";
import auth from "../Auth/auth";

export const userRoutes = Router();

userRoutes.get("/list", auth, userController.index);
userRoutes.post("/signup", validateSignup, userController.signup);
userRoutes.post("/signin", validateSignin, userController.signin);
userRoutes.post("/edit", validateSignin, userController.signin);
