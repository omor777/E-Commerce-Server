import bcrypt from "bcryptjs";
import { registerService } from "../service/auth.js";
import { findUserByProperty } from "../service/user.js";
import error from "../utils/error.js";
const registerController = async (req, res, next) => {
  const { name, email, password, address } = req.body;
  if (!name) {
    res.status(400).json({ message: "name is required" });
  }
  if (!email) {
    res.status(400).json({ message: "email is required" });
  }
  if (!password) {
    res.status(400).json({ message: "password is required" });
  }

  try {
    await registerService({ name, email, password, address });

    res.status(201).json({ message: "registration successful" });
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByProperty("email", email).lean();
    if (!user) {
      throw error("Invalid Credential", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw error("Invalid Credential", 401);
    }

    delete user.password;
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export { loginController, registerController };
