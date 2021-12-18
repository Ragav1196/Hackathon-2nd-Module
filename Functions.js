import bcrypt from "bcrypt";
import { client } from "./index.js";

function GetUsername(name) {
  return client
    .db("hackathonModule-2")
    .collection("login")
    .findOne({ name: name})
}

function GetEmail(email) {
  return client
    .db("hackathonModule-2")
    .collection("login")
    .findOne({ email: email})
}

async function GenerateHash(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

function AddUsers(name, password, hashedPassword, email) {
  return client
    .db("hackathonModule-2")
    .collection("login")
    .insertMany([{ name, password: hashedPassword, email }]);
}

export { GetUsername, GetEmail, GenerateHash, AddUsers };
