// บทที่ 5 (ส่วนที่ 4): แก้ไขและลบข้อมูล (Update / Delete)
// รันด้วย: npm run update   (รัน npm run insert ก่อน เพื่อรีเซ็ตข้อมูล)

const { connectDB, closeDB } = require("./db");

async function main() {
  try {
    const db = await connectDB();
    const students = db.collection("students");

    // ----- 1) updateOne = แก้ document แรกที่ตรงเงื่อนไข -----
    // updateOne(ตัวกรอง, สิ่งที่จะแก้)
    // ต้องใช้ $set ระบุ field ที่จะแก้ (ถ้าไม่ใส่ $set จะ error)
    console.log("=== 1) updateOne + $set ===");
    const r1 = await students.updateOne({ name: "Bob" }, { $set: { score: 55 } });
    console.log("ตรงเงื่อนไข:", r1.matchedCount, "| แก้ไปจริง:", r1.modifiedCount);
    console.log(await students.findOne({ name: "Bob" }));

    // $set กับ field ที่ยังไม่มี = เพิ่ม field ใหม่ให้
    await students.updateOne({ name: "Bob" }, { $set: { email: "bob@school.com" } });

    // ----- 2) $inc = บวก/ลบค่าตัวเลข (ไม่ต้องอ่านค่าเดิมมาก่อน) -----
    console.log("\n=== 2) $inc ===");
    await students.updateOne({ name: "Eve" }, { $inc: { score: 10 } }); // +10
    console.log(await students.findOne({ name: "Eve" }, { projection: { _id: 0, name: 1, score: 1 } }));

    // ----- 3) updateMany = แก้ทุก document ที่ตรงเงื่อนไข -----
    console.log("\n=== 3) updateMany ===");
    const r3 = await students.updateMany({ major: "CS" }, { $set: { faculty: "Science" } });
    console.log("แก้ไป", r3.modifiedCount, "คน");

    // ----- 4) deleteOne = ลบ document แรกที่ตรงเงื่อนไข -----
    console.log("\n=== 4) deleteOne ===");
    const r4 = await students.deleteOne({ name: "Dan" });
    console.log("ลบไป", r4.deletedCount, "คน");

    // ----- 5) deleteMany = ลบทุก document ที่ตรงเงื่อนไข -----
    // ⚠️ deleteMany({}) ที่ตัวกรองว่าง = ลบทั้งหมด! ระวังให้ดี
    console.log("\n=== 5) deleteMany ===");
    const r5 = await students.deleteMany({ score: { $lt: 50 } });
    console.log("ลบคนที่คะแนนต่ำกว่า 50 ไป", r5.deletedCount, "คน");

    // ----- ดูผลลัพธ์สุดท้าย -----
    console.log("\n=== ข้อมูลที่เหลือ ===");
    const remaining = await students.find().project({ _id: 0 }).toArray();
    console.log(remaining);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  } finally {
    await closeDB();
  }
}

main();
