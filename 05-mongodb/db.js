// module สำหรับเชื่อมต่อ MongoDB (ใช้ความรู้จากบทที่ 4)
// ทุกไฟล์บทเรียนจะ require ไฟล์นี้ไปใช้ ไม่ต้องเขียนโค้ดเชื่อมต่อซ้ำ

const { MongoClient } = require("mongodb");

// อ่านค่าจากไฟล์ .env (โหลดเข้ามาด้วย node --env-file=.env ดูใน package.json)
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("ไม่พบ MONGODB_URI ให้รันผ่าน npm run ... หรือใส่ --env-file=.env");
}

// client = ตัวกลางที่คุยกับ MongoDB server
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect(); // เชื่อมต่อ (ใช้เวลา จึงต้อง await)
  return client.db(dbName); // เลือก database ที่จะใช้
}

async function closeDB() {
  await client.close(); // ปิดการเชื่อมต่อ ไม่งั้นโปรแกรมจะค้างไม่จบ
}

module.exports = { connectDB, closeDB };
