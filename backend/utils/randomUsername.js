import User from "../models/users.models.js";
import { apiError } from "./apiError.js";

// Cool names for auction-style users
const coolAuctionNames = [
  "bidmaster", "sniper", "hammerdeal", "quickbid", "vaultking",
  "dealhunter", "goldstrike", "fastbid", "auctioneer", "topbidder",
  "coinflipper", "lotwinner", "artseeker", "rarehunter", "bidblazer"
];

const generateRandomUsername = async () => {
  const maxAttempts = 10;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const name = coolAuctionNames[Math.floor(Math.random() * coolAuctionNames.length)];
    const suffix = Math.floor(10 + Math.random() * 90);
    const username = `${name}_${suffix}`;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return username;
    }
  }

  throw new apiError(500, "Unable to generate a unique username after multiple attempts");
};

export { generateRandomUsername };
