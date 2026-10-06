// app.js = ตั้งค่า Express (middleware + route + error handler)
// แยกจาก server.js เพื่อให้ไฟล์นี้ทำหน้าที่เดียว: "แอปทำอะไรได้บ้าง"

const express = require("express");
const productRoutes = require("./routes/products");

const app = express();

// ----- middleware -----
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ----- routes -----
// ผูก router เข้ากับ path: ทุก route ใน products.js จะขึ้นต้นด้วย /api/products
app.use("/api/products", productRoutes);
// ถ้ามีเรื่องอื่นเพิ่ม ก็เพิ่มบรรทัดแบบนี้ เช่น
// app.use("/api/todos", todoRoutes);

// ----- 404 -----
app.use((req, res) => {
  res.status(404).json({ error: `ไม่พบ ${req.method} ${req.url}` });
});

// ----- error handler: รวมการจัดการ error ไว้ที่เดียว -----
app.use((err, req, res, next) => {
  // id ผิดรูปแบบ (เช่น /api/products/abc)
  if (err.name === "CastError") {
    return res.status(400).json({ error: `รูปแบบ ${err.path} ไม่ถูกต้อง` });
  }

  // ข้อมูลผิดกฎใน Schema -> รวมข้อความ error ทุก field ส่งกลับไป
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ error: "ข้อมูลไม่ถูกต้อง", details: errors });
  }

  // อื่นๆ = server พัง
  console.error("💥", err);
  res.status(500).json({ error: "เกิดข้อผิดพลาดในระบบ" });
});

module.exports = app;
