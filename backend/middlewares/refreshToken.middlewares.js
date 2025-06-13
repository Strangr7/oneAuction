import jwt from "jsonwebtoken";
import User from "../models/users.models.js";
import { APIResponse } from "../utils/apiResponse.js";
import logger from "../utils/logger.js";

export const refreshAccessTokenMiddleware = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json(new APIResponse(401, null, "Refresh token is required"));
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(401)
        .json(new APIResponse(401, null, "Invalid refresh token"));
    }

    const newAccessToken = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    req.newAccessToken = newAccessToken;
    next();
  } catch (error) {
    logger.error("Refresh token verification failed", error);
    return res
      .status(403)
      .json(new APIResponse(403, null, "Invalid or expired refresh token"));
  }
};
