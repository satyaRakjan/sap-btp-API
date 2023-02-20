require("dotenv").config();
const api = require("./routes/queue");
var bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const ngrok = require("ngrok");
var cors = require("cors");
const Queue = require("./data/queue.json");
app.use(express.json());
// const corsOptions = {
//   origin: "https://daae-101-109-242-76.ap.ngrok.io",
// };
// app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// const corsOptions = {
//   origin: "https://daae-101-109-242-76.ap.ngrok.io",
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.set("trust proxy", true);
// app.use("/api", api);

app.get("/queues", async (req, res) => {
  const queueNo = req.query.queueNo;
  var results;
  console.log(queueNo);
  console.log(Queue);
  if (typeof queueNo === "undefined") {
    // results = await collection.find({}).toArray();
    results = Queue;
  } else {
    results = Queue.find((element) => element.queueNo === queueNo);
    // let query = { queueNo: queueNo };
    // results = await collection.findOne(query);
  }

  res.send(results).status(200);
});

app.get("/queues/:id", async (req, res) => {
  const { id } = req.params;
  var result = Queue.find((element) => element.queueNo === id);
  if (typeof result === "undefined") {
    result = "Not Found";
  } else {
  }
  res.send(result).status(200);
  // let collection = await database.collection("queues");
  // let query = { queueNo: id };
  // let result = await collection.findOne(query);

  // if (!result) res.send("Not found").status(404);
  // else res.send(result).status(200);
});

app.post("/queues", async (req, res) => {
  const payload = req.body;
  Queue.push(payload);
  res.status(201).json(req.body + " : was Created");
  // let collection = await database.collection("queues");
  // let result = await collection.insertOne(newDocument);
  // res.send(result).status(204);
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
// ngrok.connect(
//   {
//     proto: "http",
//     addr: process.env.PORT,
//   },
//   (err, url) => {
//     if (err) {
//       console.error("Error while connecting Ngrok", err);
//       return new Error("Ngrok Failed");
//     }
//   }
// );
// module.exports = app;
