import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import error from "../utils/error.js";
dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    let token = req?.headers?.authorization;

    if (!token) {
      throw error("Unauthorized Access", 401);
    }
    token = token?.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // const user = await User.findById(decoded._id);

    // if (!user) {
    //   throw error("Unauthorized Access", 401);
    // }
    // req.user = user;
    // next();
  } catch (e) {
    console.log('auth');
    return res.status(401).json({ message: "Unauthorized Access" });
  }
};

export { authenticate };
