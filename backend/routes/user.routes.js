import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";

const router = Router();

//unprotected routes
router.post("/register",registerUser);

//protected routes

export default router;