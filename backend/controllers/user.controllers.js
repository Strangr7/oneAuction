// user registration

import User from "../models/users.models.js";
import UserProfile from "../models/userProfile.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { APIResponse } from "../utils/apiResponse.js";
import { generateRandomUsername } from "../utils/userName.utils.js";

// POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword } =
    req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    throw new apiError(400, "All required fields must be provided.");
  }

  // Password match check
  if (password !== confirmPassword) {
    throw new apiError(400, "passwords do not match");
  }

  //password complexity check
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new apiError(
      400,
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  //Genereate radom username if not provided
  const finalUsername =
    username || (await generateRandomUsername(firstName, lastName));

  // Check if email exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username: finalUsername }],
  });

  if (existingUser) {
    throw new apiError(
      409,
      existingUser.email === email
        ? "Email already in use"
        : "Username already in use"
    );
  }

  // Create new user
  const newUser = new User({
    email,
    username: finalUsername,
    password,
  });

  await newUser.save();

  // Create user profile with default avatar
  const newProfile = await UserProfile.create({
    firstName,
    lastName,
    user: newUser._id,
    avatarUrl: "https://example.com/default-avatar.png",
  });

  return res.status(201).json(
    new APIResponse(
      201,
      {
        user: {
          _id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
          profile: {
            firstName: newProfile.firstName,
            lastName: newProfile.lastName,
            phone: newProfile.phone,
            avatarUrl: newProfile.avatarUrl,
          },
        },
      },
      "User registered successfully"
    )
  );
});

export { registerUser };


// User login
// POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Validate required fields
  if (!emailOrUsername || !password) {
    throw new apiError(400, "Email/Username and password are required.");
  }

  // Find user by email or username
  const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }], });

  if (!user) {
    throw new apiError(401, "Invalid email/username or password.");
  }

  // Check if account is active
  if (user.status !== "active") {
    throw new apiError(403, "Account is not active. Please contact support.");
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new apiError(401, "Invalid email/username or password.");
  }

  // Fetch user profile
  const profile = await UserProfile.findOne({ user: user._id });

  // Optional: Update last login timestamp
  user.lastLogin = new Date();
  await user.save();

  // Send success response
  return res.status(200).json(
    new APIResponse(
      200,
      {
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          profile: {
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
            avatarUrl: profile.avatarUrl,
          },
        },
      },
      "Login successful"
    )
  );
});

export { loginUser };
