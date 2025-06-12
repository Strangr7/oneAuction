// user registration

import User from "../models/users.models.js";
import UserProfile from "../models/userProfile.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { APIResponse } from "../utils/apiResponse.js";

// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Password match check
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Check if email exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new apiError(409, "Email already in use");
  }

  // Create new user
  const newUser = await User.create({
    email,
    password,
  });

  // Create user profile with default avatar
  const newProfile = await UserProfile.create({
    firstName,
    lastName,
    user: newUser._id,
    avatarUrl: "https://example.com/default-avatar.png"
  });

  return res.status(201).json(
    new APIResponse(
      201,
      {
        user: {
          _id: newUser._id,
          email: newUser.email,
          role: newUser.role,
        },
      },
      "User registered successfully"
    )
  );
});

export { registerUser };
