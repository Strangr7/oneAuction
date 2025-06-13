import { Router } from "express";
import { registerUser, loginUser, userLogOut } from "../controllers/user.controllers.js";
import { refreshAccessTokenMiddleware } from "../middlewares/refreshToken.middlewares.js";

const router = Router();

//unprotected routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//protected routes
router.post("/logout",userLogOut)
router.get("/refresh-token", refreshAccessTokenMiddleware, (req, res) => {
  return res.status(200).json({
    accessToken: req.newAccessToken,
  });
});

export default router;
