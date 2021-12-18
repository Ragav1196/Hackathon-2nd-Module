import express from "express";
import { MongoClient } from "mongodb";
import cors from "cors";
import { userRouter } from "./Users.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function CreateConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo DB Connected");
  return client;
}
export const client = await CreateConnection();

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("HELLO");
});


app.use("/", userRouter);

app.listen(PORT, () => {
  console.log("Server Started");
});
