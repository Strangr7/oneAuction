import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controllers.js";

const router = Router();

//unprotected routes
router.post("/register",registerUser);
router.post("/login",loginUser);

//protected routes

export default router;