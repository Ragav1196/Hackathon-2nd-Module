import express from "express";
import {
  GetUsername,
  GetEmail,
  GenerateHash,
  AddUsers,
  GetAllLeads,
  AddLeads,
  GetLeadsById,
  UpdateLeadsById,
  DeleteLeadsById,
} from "./Functions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "./index.js";

const router = express.Router();

router.route("/register").post(async (req, res) => {
  const dataProvided = req.body;
  const usernameFrmDB = await GetUsername(dataProvided.name);
  const emailFrmDB = await GetEmail(dataProvided.email);

  if (usernameFrmDB && emailFrmDB) {
    res.status(400).send({ message: "Username and Email already exists" });
    return;
  }
  if (usernameFrmDB) {
    res.status(400).send({ message: "Username already exists" });
    return;
  }
  if (emailFrmDB) {
    res.status(400).send({ message: "User Email already exists" });
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
    res.status(400).send({ message: "Password pattern doesn't match" });
    return;
  }

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      dataProvided.email
    )
  ) {
    res.status(400).send({ message: "Email pattern doesn't match" });
    return;
  }

  const hashedPassword = await GenerateHash(dataProvided.password);

  const result = await AddUsers(
    dataProvided.name,
    hashedPassword,
    dataProvided.email,
    dataProvided.userType
  );
  res.send(result);
});

router.route("/login").post(async (req, res) => {
  const dataProvided = req.body;

  const DataFrmDB = await GetUsername(dataProvided.name);

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
      userType: DataFrmDB.userType,
    });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

router
  .route("/lead")
  .get(async (req, res) => {
    const leadData = await GetAllLeads();
    res.send(leadData);
  })
  .get(async (req, res) => {
    const totalLeads = await client
      .db("hackathonModule-2")
      .collection("login")
      .find({})
      .count();
    console.log(totalLeads);
    res.send(totalLeads);
  })
  .post(async (req, res) => {
    const data = req.body;

    const addLead = await AddLeads(data);

    res.send(addLead);
  });

router
  .route("/lead/:id")
  .get(async (req, res) => {
    const { id } = req.params;

    const leadData = await GetLeadsById(id);
    res.send(leadData);
  })
  .put(async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    const updateLead = await UpdateLeadsById(id, data);

    res.send(updateLead);
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    const deleteLeadData = await DeleteLeadsById(id);
    res.send(deleteLeadData);
  });

export const userRouter = router;
