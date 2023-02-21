//A-{ปีเดือนวัน}-(running 4ตัว  ex 0010,0020 )
//A-20230201-0010
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
app.use(
  cors({
    credentials: true,
  })
);
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
  // var queueData = Queue;
  let results;
  // const queueNo = req.query.queueNo;
  // const date = req.query.date;

  // for (const [key, value] of Object.entries(req.query)) {
  //   console.log(`${key}: ${value}`);
  // }
  // results = Queue.find((element) => element.queueNo == queueNo);
  // results = Queue.filter((element) => element.date == date);
  const { queueNo = null, date = null } = req.query;
  if (queueNo && date) {
    results = Queue.find(
      (element) => element.queueNo == queueNo && element.date == date
    );
  } else {
    if (date && date.length > 0) {
      formatDate = date.replaceAll("%2F", "/");
      console.log(formatDate);
      results = Queue.filter((element) => element.date == formatDate);
    } else if (queueNo && queueNo.length > 0) {
      results = Queue.find((element) => element.queueNo == queueNo);
    } else {
      results = Queue;
    }
  }

  // if (queueNo) {
  //   results = Queue.find((element) => element.queueNo == queueNo || element.date == date);
  //   // if (typeof queueNo !== "undefined") {
  //   // } else {
  //   //   if (typeof date !== "undefined") {
  //   //     results = Queue.filter((element) => element.date == date);
  //   //     console.log("date");
  //   //   }
  //   // }
  // } else {
  //   if (date) {
  //     results = Queue.filter((element) => element.date == date);
  //   } else {
  //     results = Queue;
  //   }
  // }
  res.send(results).status(200);
  // for (const [key, value] of Object.entries(req.query)) {
  //   console.log(`${key}: ${value.length}`);
  // }
  // if (queueNo === "undefined" && date === "undefined") {
  //   results = Queue;
  // } else {
  //   console.log(queueNo);
  //   console.log(date);
  // }
  // res.send(results).status(200);
  // for (const [key, value] of Object.entries(query)) {
  //   // if (typeof value !== "undefined") {
  //   // } else { }
  //   // console.log(value);
  //   Object.entries(value).forEach(([key2, value2]) => {
  //     if (typeof value2 !== "undefined") {
  //       if (value2.length > 0) {
  //         Queue.find((element) => element[key2] == value2);
  //         res.send(Queue).status(200);
  //       }
  //     }
  //   });
  // }

  // console.log(queueNo.length);
  // console.log(queueNo);

  // if (typeof queueNo === "undefined") {
  //   // results = await collection.find({}).toArray();
  //   results = Queue;
  // } else {
  //   results = Queue.find((element) => element.queueNo === queueNo);
  //   // let query = { queueNo: queueNo };
  //   // results = await collection.findOne(query);
  // }
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
