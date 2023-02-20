require("dotenv").config();
const api = require("./routes/queue");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
var cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api", api);

// app.get("/queues", async (req, res) => {
//   let collection = await database.collection("queues");
//   let results = await collection.find({}).toArray();
//   res.send(results).status(200);
// });

// app.get("/queues/:id", async (req, res) => {

//   const { id } = req.params;
//   let collection = await database.collection("queues");
//   let query = { queueNo: id };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// app.post("/queues", async (req, res) => {
//   let collection = await database.collection("queues");
//   let newDocument = req.body;
//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});

module.exports = app;
