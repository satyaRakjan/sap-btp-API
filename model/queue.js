const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const queueSchema = new Schema({
  queueNo: String,
  Truckcode: String,
  TruckType: String,
  date: String,
  dateTime: String,
  sequence: String,
  vendor: { vendorCode: String, vendorlDes: String },
  material: { materialCode: String, matertialDes: String, DesEng: String },
  inspection: { type: Array, default: [] },
  weight: {
    truckWeightID: String,
    weightIn: String,
    weightOut: String,
    weightSummary: String,
    dateTimeIn: String,
    dateTimeOut: String,
  },
});

const QueueModel = mongoose.model("Queue", queueSchema);

module.exports = QueueModel;
