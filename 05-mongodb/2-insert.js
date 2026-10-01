// บทที่ 5 (ส่วนที่ 2): เพิ่มข้อมูล (Create)
// รันด้วย: npm run insert

const { connectDB, closeDB } = require("./db");

async function main() {
  try {
    const db = await connectDB();

    // collection = เหมือน "ตาราง" ถ้ายังไม่มี MongoDB จะสร้างให้เองตอนเพิ่มข้อมูลครั้งแรก
    const students = db.collection("students");

    // ลบข้อมูลเก่าทิ้งก่อน เพื่อให้รันไฟล์นี้ซ้ำได้โดยข้อมูลไม่ซ้ำกัน
    await students.deleteMany({});

    // ----- 1) insertOne = เพิ่มทีละ 1 document -----
    console.log("=== 1) insertOne ===");
    const result = await students.insertOne({
      name: "Ann",
      score: 85,
      major: "CS",
    });
    // MongoDB สร้าง _id ให้อัตโนมัติ (เป็น ObjectId ไม่ซ้ำกันแน่นอน)
    console.log("เพิ่มแล้ว _id:", result.insertedId);

    // ----- 2) insertMany = เพิ่มหลาย document พร้อมกัน (ส่งเป็น array) -----
    console.log("\n=== 2) insertMany ===");
    const manyResult = await students.insertMany([
      { name: "Bob", score: 42, major: "IT" },
      { name: "Cherry", score: 73, major: "CS" },
      { name: "Dan", score: 91, major: "IT" },
      // document แต่ละตัวมี field ไม่เหมือนกันก็ได้ (MongoDB ยืดหยุ่น ไม่บังคับ schema)
      { name: "Eve", score: 38, major: "CS", hobbies: ["game", "music"] },
    ]);
    console.log("เพิ่มแล้ว", manyResult.insertedCount, "คน");

    // ----- 3) ดูข้อมูลทั้งหมดที่เพิ่มไป -----
    console.log("\n=== 3) ข้อมูลใน collection ===");
    const all = await students.find().toArray();
    console.log(all);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  } finally {
    await closeDB();
  }
}

main();
