import bcrypt from "bcrypt";
const saltRounds = 10;

export async function hashpassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

export function compare(password, hash, callback) {
  bcrypt.compare(password, hash, callback);
}