// บทที่ 5 (ส่วนที่ 3): ค้นหาข้อมูล (Read)
// รันด้วย: npm run find   (ต้องรัน npm run insert ก่อน เพื่อให้มีข้อมูล)

const { connectDB, closeDB } = require("./db");

async function main() {
  try {
    const db = await connectDB();
    const students = db.collection("students");

    // ----- 1) find() = หาทั้งหมด -----
    // find() คืน "cursor" (ตัวชี้ข้อมูล) ต้องใช้ .toArray() แปลงเป็น array ก่อนใช้
    console.log("=== 1) find ทั้งหมด ===");
    const all = await students.find().toArray();
    console.log(all.map((s) => s.name));

    // ----- 2) find(filter) = หาตามเงื่อนไข (เหมือน .filter() ในบทที่ 3) -----
    console.log("\n=== 2) find ตามเงื่อนไข ===");
    const csStudents = await students.find({ major: "CS" }).toArray();
    console.log("สาย CS:", csStudents.map((s) => s.name));

    // ----- 3) findOne = หาตัวแรกที่ตรง (เหมือน .find() ในบทที่ 3) -----
    console.log("\n=== 3) findOne ===");
    const dan = await students.findOne({ name: "Dan" });
    console.log(dan);
    const nobody = await students.findOne({ name: "Zed" });
    console.log("หาไม่เจอได้:", nobody); // null

    // ----- 4) Query operators = เงื่อนไขแบบเปรียบเทียบ (ขึ้นต้นด้วย $) -----
    // $gt มากกว่า | $gte มากกว่าหรือเท่ากับ | $lt น้อยกว่า | $lte น้อยกว่าหรือเท่ากับ
    // $ne ไม่เท่ากับ | $in อยู่ในรายการ
    console.log("\n=== 4) operators ===");
    const passed = await students.find({ score: { $gte: 50 } }).toArray();
    console.log("สอบผ่าน (score >= 50):", passed.map((s) => s.name));

    const between = await students.find({ score: { $gte: 40, $lt: 80 } }).toArray();
    console.log("คะแนน 40-79:", between.map((s) => s.name));

    const some = await students.find({ name: { $in: ["Ann", "Eve"] } }).toArray();
    console.log("ชื่อ Ann หรือ Eve:", some.map((s) => s.name));

    // ใส่หลาย field ใน { } = ต้องตรงทุกเงื่อนไข (เหมือน && )
    const csPassed = await students.find({ major: "CS", score: { $gte: 50 } }).toArray();
    console.log("CS และสอบผ่าน:", csPassed.map((s) => s.name));

    // ----- 5) sort / limit / projection -----
    console.log("\n=== 5) sort / limit / projection ===");
    const top2 = await students
      .find()
      .sort({ score: -1 }) // -1 = มากไปน้อย, 1 = น้อยไปมาก
      .limit(2) // เอาแค่ 2 อันแรก
      .project({ _id: 0, name: 1, score: 1 }) // เลือกเฉพาะ field ที่อยากได้ (1 = เอา, 0 = ไม่เอา)
      .toArray();
    console.log("คะแนนสูงสุด 2 อันดับ:", top2);

    // ----- 6) countDocuments = นับจำนวน -----
    console.log("\n=== 6) countDocuments ===");
    const failedCount = await students.countDocuments({ score: { $lt: 50 } });
    console.log("จำนวนคนสอบตก:", failedCount);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  } finally {
    await closeDB();
  }
}

main();
