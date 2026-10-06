// บทที่ 7 (ส่วนที่ 1): Mongoose พื้นฐาน (สคริปต์ ยังไม่มี server)
// รันด้วย: npm run basics
//
// Mongoose = library ที่ครอบ MongoDB driver (บทที่ 5) อีกชั้น เพิ่มความสามารถ:
//   - Schema: กำหนดหน้าตาข้อมูล + ตรวจข้อมูลอัตโนมัติ
//   - Model: สั่งงาน collection ได้สั้นลง
//   - แปลง id string <-> ObjectId ให้เอง

const mongoose = require("mongoose");
const Product = require("./src/models/Product");

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
    console.log("✅ เชื่อมต่อแล้ว");

    await Product.deleteMany({}); // ล้างข้อมูลเก่า (ใช้เหมือน driver ปกติ)

    // ----- 1) create = เพิ่มข้อมูล (ไม่ต้องเรียก .collection() เอง) -----
    console.log("\n=== 1) create ===");
    const mouse = await Product.create({ name: "  Mouse  ", price: 450, category: "it" });
    console.log(mouse);
    // สังเกต: name ถูก trim, มี stock: 0 (default), createdAt / updatedAt ให้เอง

    await Product.create([
      { name: "Notebook", price: 25000, category: "it", stock: 5 },
      { name: "Chair", price: 1800, category: "furniture", stock: 12 },
    ]);

    // ----- 2) Validation = ข้อมูลผิดกฎ จะบันทึกไม่ได้ -----
    console.log("\n=== 2) validation ===");
    try {
      await Product.create({ name: "X", price: -50, category: "food" });
    } catch (error) {
      console.log("บันทึกไม่ได้:", error.name);
      for (const field in error.errors) {
        console.log(`  - ${field}: ${error.errors[field].message}`);
      }
    }

    // field ที่ไม่อยู่ใน Schema จะถูกตัดทิ้ง (strict mode)
    const desk = await Product.create({ name: "Desk", price: 3200, isAdmin: true });
    console.log("field ที่ไม่มีใน Schema ถูกตัด -> isAdmin:", desk.isAdmin); // undefined

    // ----- 3) find / findOne / findById -----
    console.log("\n=== 3) find ===");
    const itProducts = await Product.find({ category: "it" }); // ไม่ต้อง .toArray()
    console.log("it:", itProducts.map((p) => p.name));

    const cheap = await Product.find({ price: { $lt: 2000 } }).select("name price -_id"); // select = project
    console.log("ราคา < 2000:", cheap);

    // findById รับ string ได้เลย ไม่ต้อง new ObjectId(...)
    const found = await Product.findById(mouse._id.toString());
    console.log("findById:", found.name);

    // ----- 4) update -----
    console.log("\n=== 4) update ===");
    const updated = await Product.findByIdAndUpdate(
      mouse._id,
      { $inc: { stock: 10 } },
      { returnDocument: "after", runValidators: true }
    );
    console.log("Mouse stock:", updated.stock);

    // อีกวิธี: แก้ที่ object แล้ว .save() (ตรวจ validation ให้เสมอ)
    found.price = 390;
    await found.save();
    console.log("Mouse price:", found.price);

    // ----- 5) delete -----
    console.log("\n=== 5) delete ===");
    await Product.findByIdAndDelete(desk._id);
    console.log("เหลือ:", await Product.countDocuments(), "ชิ้น");
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

main();
