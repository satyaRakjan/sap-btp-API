const { MongoClient } = require("mongodb");
require("dotenv").config();

const connectionString = process.env.MONGO_HOST || "";

const client = new MongoClient(connectionString);
const db = client.db("btp");
// let conn;
// try {
//   conn = await client.connect();
// } catch (e) {
//   console.error(e);
// }

// let db = conn.db("btp");

export default db;
