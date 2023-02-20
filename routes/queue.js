require("dotenv").config();
const { MongoClient } = require("mongodb");
const express = require("express");
const app = express();
const router = express.Router();

const uri = process.env.MONGO_HOST;
const client = new MongoClient(uri);
const database = client.db("btp");

async function run(req, res) {
  try {
    const collection = database.collection("queues");
    const result = await collection.find({}).toArray();
    console.log(result);
    res.send(result).status(200);
  } finally {
    await client.close();
  }
}

router.get("/queues", async (req, res) => {
  //   let collection = await database.collection("queues");
  //   let results = await collection.find({}).toArray();
  // const queues = await Queue.find({});

  run(req, res);
});

router.get("/queues/:id", async (req, res) => {
  const { id } = req.params;
  let collection = await database.collection("queues");
  let query = { queueNo: id };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/queues", async (req, res) => {
  let collection = await database.collection("queues");
  let newDocument = req.body;
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

module.exports = router;
