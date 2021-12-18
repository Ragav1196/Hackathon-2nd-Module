import express from "express";
import { GetUsers, GenerateHash, AddUsers } from "./Functions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router()


router.route("/register").post (async (req, res) => {
    const dataProvided = req.body;
    const DataFrmDB = await GetUsers(dataProvided.name);
    if (DataFrmDB) {
      res.status(400).send({ message: "Username already exists" });
      return;
    }
  
    if (dataProvided.password.length < 8) {
      res.status(400).send({ message: "Password must be longer" });
      return;
    }
  
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(
        dataProvided.password
      )
    ) {
      res.status(400).send({ message: "Password pattern doesnt match" });
      return;
    }
  
    const hashedPassword = await GenerateHash(dataProvided.password);
  
    const result = await AddUsers(
      dataProvided.name,
      dataProvided.password,
      hashedPassword,
      dataProvided.email
    );
    res.send(result);
  });


router.route("/login").post(async (req, res) => {
    const dataProvided = req.body;
  
    const DataFrmDB = await GetUsers(dataProvided.name);
  
    if (!DataFrmDB) {
      res.status(400).send({ message: "Invalid credentials" });
      return;
    }
  
    const storedPassword = DataFrmDB.password;
  
    const isPasswordMatch = await bcrypt.compare(
      dataProvided.password,
      storedPassword
    );
  
    if (isPasswordMatch) {
      const token = jwt.sign({ id: DataFrmDB._id }, process.env.SECRET_KEY);
  
      res.send({
        message: "Successfull login",
        token: token,
        name: DataFrmDB.name,
      });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  });

  export const userRouter = router