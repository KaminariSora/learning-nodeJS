// บทที่ 6 (ส่วนที่ 3): REST API + MongoDB (รวมทุกอย่างที่เรียนมา)
// รันด้วย: npm run api   แล้วทดสอบด้วย: npm run client (เปิดอีก terminal)
//
// เหมือนส่วนที่ 2 ทุกอย่าง แต่เปลี่ยนจาก array เป็น MongoDB -> ข้อมูลไม่หายเมื่อปิด server

const express = require("express");
const { ObjectId } = require("mongodb");
const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let products; // collection จะถูกกำหนดค่าหลังเชื่อมต่อ DB สำเร็จ (ดูฟังก์ชัน start)

// ----- ฟังก์ชันช่วย: แปลง id จาก URL เป็น ObjectId -----
// _id ใน MongoDB เป็น ObjectId ไม่ใช่ string ต้องแปลงก่อนค้นหา
// ถ้า id ผิดรูปแบบ (เช่น "abc") คืน null
function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

// ----- GET ทั้งหมด (รองรับการกรองด้วย query เช่น ?category=it) -----
app.get("/api/products", async (req, res) => {
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  const result = await products.find(filter).toArray();
  res.json(result);
});

// ----- GET ชิ้นเดียว -----
app.get("/api/products/:id", async (req, res) => {
  const id = toObjectId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "รูปแบบ id ไม่ถูกต้อง" });
  }

  const product = await products.findOne({ _id: id });
  if (!product) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }
  res.json(product);
});

// ----- POST เพิ่มใหม่ -----
app.post("/api/products", async (req, res) => {
  const { name, price, category, stock } = req.body;

  if (!name || typeof price !== "number") {
    return res.status(400).json({ error: "ต้องมี name และ price (ตัวเลข)" });
  }

  // เลือกเฉพาะ field ที่อนุญาต ไม่เอา req.body ไปใส่ตรงๆ
  // (กันผู้ใช้แอบส่ง field แปลกๆ เข้ามา)
  const newProduct = { name, price, category: category || "other", stock: stock ?? 0 };
  const result = await products.insertOne(newProduct);

  res.status(201).json({ _id: result.insertedId, ...newProduct });
});

// ----- PATCH แก้บางส่วน -----
app.patch("/api/products/:id", async (req, res) => {
  const id = toObjectId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "รูปแบบ id ไม่ถูกต้อง" });
  }

  // สร้าง object สำหรับ $set เฉพาะ field ที่อนุญาตและส่งมาจริง
  const allowed = ["name", "price", "category", "stock"];
  const updates = {};
  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "ไม่มีข้อมูลให้แก้ไข" });
  }

  // returnDocument: "after" = คืนข้อมูลหลังแก้แล้ว
  const updated = await products.findOneAndUpdate(
    { _id: id },
    { $set: updates },
    { returnDocument: "after" }
  );
  if (!updated) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }
  res.json(updated);
});

// ----- DELETE ลบ -----
app.delete("/api/products/:id", async (req, res) => {
  const id = toObjectId(req.params.id);
  if (!id) {
    return res.status(400).json({ error: "รูปแบบ id ไม่ถูกต้อง" });
  }

  const result = await products.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }
  res.status(204).end();
});

// ----- 404: ไม่มี route ตรง -----
app.use((req, res) => {
  res.status(404).json({ error: `ไม่พบ ${req.method} ${req.url}` });
});

// ----- Error handler: มี 4 parameter (err อยู่ตัวแรก) -----
// Express 5 จะส่ง error จาก async route มาที่นี่ให้อัตโนมัติ ไม่ต้อง try/catch ทุก route
app.use((err, req, res, next) => {
  console.error("💥", err);
  res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
});

// ----- เริ่มทำงาน: เชื่อมต่อ DB ให้เสร็จก่อน แล้วค่อยเปิด server -----
async function start() {
  const db = await connectDB();
  products = db.collection("products");

  // ใส่ข้อมูลตัวอย่างถ้ายังว่าง
  if ((await products.countDocuments()) === 0) {
    await products.insertMany([
      { name: "Notebook", price: 25000, category: "it", stock: 5 },
      { name: "Mouse", price: 450, category: "it", stock: 30 },
      { name: "Chair", price: 1800, category: "furniture", stock: 12 },
    ]);
    console.log("📦 ใส่ข้อมูลตัวอย่างแล้ว");
  }

  app.listen(PORT, () => {
    console.log(`🚀 API พร้อมที่ http://localhost:${PORT}/api/products`);
  });
}

start().catch((error) => {
  console.error("❌ เปิด server ไม่สำเร็จ:", error.message);
  process.exit(1);
});
