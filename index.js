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

app.use(bodyParser.urlencoded({ extended: false }));
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

function getDate(params) {
  const today = new Date();
  const yyyy = today.getFullYear();
  var result;
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (params === "createQ") {
    result = yyyy + mm + dd;
  } else if (params === "date") {
    result = dd + "/" + mm + "/" + yyyy;
  } else if (params === "time") {
    result = today.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return result;
}

app.get("/queues", async (req, res) => {
  let results;

  const { queueNo = null, date = null } = req.query;
  if (queueNo && date) {
    results = Queue.filter(
      (element) => element.queueNo == queueNo && element.date == date
    );
  } else {
    if (date && date.length > 0) {
      formatDate = date.replaceAll("%2F", "/");
      console.log(formatDate);
      results = Queue.filter((element) => element.date == formatDate);
    } else if (queueNo && queueNo.length > 0) {
      results = Queue.filter((element) => element.queueNo == queueNo);
    } else {
      results = Queue;
    }
  }

  res.send(results).status(200);
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

app.put("/queues/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  var result = Queue.find((element) => element.queueNo === id);
  if (typeof result === "undefined") {
    result = "Not Found";
  } else {
    for (const [key, value] of Object.entries(payload)) {
      if (key == "inspection") {
        Object.entries(value).forEach(([key2, value2]) => {
          result[key][key2] = value2;
          // console.log(`${key2} ${value2}`);
        });
      } else if (key == "weight") {
        Object.entries(value).forEach(([key2, value2]) => {
          if (key2 == "dateTimeIn" || key2 == "dateTimeOut") {
            result[key][key2] = getDate("date") + " " + getDate("time");
          } else if (key2 == "date") {
            result[key][key2] = getDate("date");
          } else {
            result[key][key2] = value2;
          }
        });
      } else if (key == "PO") {
        result[key] = value;
      }
      // console.log(`${key}: ${value}`);
    }
  }

  res.send(getDate("date")).status(200);
  // let collection = await database.collection("queues");
  // let query = { queueNo: id };
  // let result = await collection.findOne(query);

  // if (!result) res.send("Not found").status(404);
  // else res.send(result).status(200);
});

app.post("/queues", async (req, res) => {
  const payload = req.body;
  var getLastDigit = Queue[Queue.length - 1].queueDigit;
  var number = Number(getLastDigit) + 1;
  var paddedNumber = number.toString().padStart(4, "0");

  // A-20230201-0010
  var reunQueueNumber = "A-" + getDate("createQ") + "-" + paddedNumber;
  payload.queueNo = reunQueueNumber;
  payload.queueDigit = paddedNumber;
  payload.date = getDate("date");
  payload.dateTime = getDate("time");
  // console.log(test);
  Queue.push(payload);
  // res.status(201).json(req.body + " : was Created");
  // let collection = await database.collection("queues");
  // let result = await collection.insertOne(newDocument);
  res.send(payload).status(204);
});

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
