// server.js = จุดเริ่มต้นของโปรแกรม: เชื่อมต่อ DB แล้วเปิด server
// รันด้วย: npm run dev

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

async function start() {
  // Mongoose จัดการการเชื่อมต่อให้ทั้งแอป ไม่ต้องส่ง collection ไปมาเอง
  await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
  console.log("✅ เชื่อมต่อ MongoDB แล้ว:", mongoose.connection.name);

  app.listen(PORT, () => {
    console.log(`🚀 API พร้อมที่ http://localhost:${PORT}/api/products`);
  });
}

start().catch((error) => {
  console.error("❌ เปิด server ไม่สำเร็จ:", error.message);
  process.exit(1);
});
