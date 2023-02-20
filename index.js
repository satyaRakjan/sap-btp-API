require("dotenv").config();
const { MongoClient } = require("mongodb");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
var cors = require("cors");
// const db = require("./db/queue.js");

// const Queues = require("./data/queue.json");
// const mongoose = require("mongoose");
// const Queue = require("./model/queue");

// Replace the uri string with your connection string.
const uri = process.env.MONGO_HOST;
const client = new MongoClient(uri);
const database = client.db("btp");
// const queues = database.collection("queues");

// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost:27017/node-api-101";
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB error", err);
// });

app.use(express.json());
app.use(cors());

app.get("/queues", async (req, res) => {
  let collection = await database.collection("queues");
  let results = await collection.find({}).toArray();
  // const queues = await Queue.find({});
  res.send(results).status(200);
});

app.get("/queues/:id", async (req, res) => {
  // const { id } = req.params;
  // const query = { queueNo: id };
  // try {
  //   const queues = await Queue.findOne(query);
  //   res.json(queues);
  // } catch (error) {
  //   res.status(400).json(error);
  // }
  const { id } = req.params;
  let collection = await database.collection("queues");
  let query = { queueNo: id };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

app.post("/queues", async (req, res) => {
  let collection = await database.collection("queues");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);

  // const payload = req.body;
  // try {
  //   const queues = new Queue(payload);
  //   await queues.save();
  //   res.status(201).end();
  // } catch (error) {
  //   res.status(400).json(error);
  // }
});

// async function getll(req, res) {
//   try {
//     const database = client.db("btp");
//     const queues = database.collection("queues");
//     // Query for a movie that has the title 'Back to the Future'
//     // const query = { queueNo: "A-1002221209-0010" };
//     // const movie = await queues.findOne(query);
//     const getData = await queues.find().toArray();
//     res.json(getData);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// async function getbyID(req, res, params) {
//   try {
//     console.log("try");
//     const database = client.db("btp");
//     const queues = database.collection("queues");
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { queueNo: params };
//     const getData = await queues.findOne(query);
//     res.json(getData);
//   } catch (error) {
//     console.log("error");
//     res.status(400).json(error);
//     await client.close();
//   } finally {
//     console.log("finally");
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// app.use(express.json());
// app.get("/queues", async (req, res) => {
//   getll(req, res);
// });
// app.get("/queues/:id", async (req, res) => {
//   const { id } = req.params;
//   getbyID(req, res, id);
// });

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

module.exports = app;
