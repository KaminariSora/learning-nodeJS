// module เชื่อมต่อ MongoDB (เหมือนบทที่ 5)
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

async function connectDB() {
  await client.connect();
  return client.db(process.env.DB_NAME);
}

async function closeDB() {
  await client.close();
}

module.exports = { connectDB, closeDB };
