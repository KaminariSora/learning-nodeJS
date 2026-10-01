// บทที่ 5 (ส่วนที่ 1): เชื่อมต่อ MongoDB
// รันด้วย: npm run connect

const { connectDB, closeDB } = require("./db");

async function main() {
  try {
    const db = await connectDB();
    console.log("✅ เชื่อมต่อ MongoDB สำเร็จ");
    console.log("ใช้ database:", db.databaseName);

    // ping = ถาม server ว่า "ยังอยู่ไหม" ถ้าตอบ { ok: 1 } แปลว่าใช้งานได้
    const result = await db.command({ ping: 1 });
    console.log("ping:", result);

    // ดูว่าใน database นี้มี collection อะไรบ้าง (ครั้งแรกจะว่าง [])
    const collections = await db.listCollections().toArray();
    console.log("collections:", collections.map((c) => c.name));
  } catch (error) {
    // มักเกิดเมื่อ MongoDB server ไม่ได้เปิดอยู่ หรือ URI ผิด
    console.log("❌ เชื่อมต่อไม่สำเร็จ:", error.message);
  } finally {
    // finally = ทำเสมอ ไม่ว่าจะสำเร็จหรือ error -> เหมาะกับการปิด connection
    await closeDB();
  }
}

main();
