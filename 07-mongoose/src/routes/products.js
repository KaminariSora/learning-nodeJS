// Router = กลุ่มของ route ที่เกี่ยวกับเรื่องเดียวกัน แยกไว้ในไฟล์ของตัวเอง
// ไฟล์นี้ดูแลเฉพาะ /api/products (ไปผูกกับ path ใน app.js)
//
// เทียบกับบทที่ 6: สั้นลงมาก เพราะ
//   - ไม่ต้องแปลง ObjectId เอง (Mongoose แปลงให้)
//   - ไม่ต้อง if ตรวจข้อมูลเอง (Schema ตรวจให้)
//   - ไม่ต้อง whitelist field เอง (field ที่ไม่อยู่ใน Schema ถูกตัดทิ้งให้)
//   - error ทั้งหมดไปรวมที่ error handler ใน app.js

const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// path ในนี้ "ต่อท้าย" path ที่ผูกไว้ใน app.js
// "/" ในนี้ = /api/products และ "/:id" = /api/products/:id

// ----- GET ทั้งหมด (กรองด้วย ?category=it ได้) -----
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

// ----- GET ชิ้นเดียว -----
router.get("/:id", async (req, res) => {
  // findById รับ id เป็น string ได้เลย ถ้ารูปแบบผิด จะ throw CastError (ไปที่ error handler)
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }
  res.json(product);
});

// ----- POST เพิ่มใหม่ -----
router.post("/", async (req, res) => {
  // create = สร้าง + ตรวจตาม Schema + บันทึก
  // ถ้าข้อมูลผิดกฎ จะ throw ValidationError (ไปที่ error handler -> 400)
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// ----- PATCH แก้บางส่วน -----
router.patch("/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after", // คืนข้อมูลหลังแก้
    runValidators: true, // ⚠️ ต้องใส่ ไม่งั้นตอน update จะไม่ตรวจกฎใน Schema
  });
  if (!product) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }
  res.json(product);
});

// ----- DELETE ลบ -----
router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }
  res.status(204).end();
});

module.exports = router;
