import bcrypt from "bcryptjs";
import { createUser, findUserByProperty } from "./user.js";
import error from "../utils/error.js";
const registerService = async ({ name, email, password, address }) => {
  const user = await findUserByProperty("email", email);

  if (user) {
   throw error('user already exist',400)
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createUser({ name, email, password: hash, address });
};

export { registerService };
