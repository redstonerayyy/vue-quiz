import mongoose from "mongoose";
import { hashpassword, compare } from "./bcrypt.mjs";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

export async function storeUser(name, email, password) {
  let hash = await hashpassword(password);
  let newuser = new User({
    username: name,
    email: email,
    password: hash,
  });
  return await newuser.save();
}

export async function findUser(name) {
  return await User.find({ username: name });
}

export async function deleteUsers(name) {
  return await User.deleteMany({ username: name });
}

export async function connect(url) {
  await mongoose.connect(url);
}
