import User from "../models/user.models.js";

const createUser = async ({ name, email, password, address }) => {
  const user = new User({ name, email, password, address });
  return user.save();
};

const findUserByProperty = (key, value) => {
  
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

export { createUser, findUserByProperty };
