// บทที่ 6 (ส่วนที่ 2): REST API แบบเก็บข้อมูลใน array (ยังไม่ใช้ database)
// รันด้วย: npm run memory   แล้วทดสอบด้วย: npm run client (เปิดอีก terminal)
//
// REST API = รูปแบบมาตรฐานในการออกแบบ URL + HTTP method
//
//   METHOD   PATH                 ความหมาย            status เมื่อสำเร็จ
//   GET      /api/products        ดูทั้งหมด            200 OK
//   GET      /api/products/:id    ดูชิ้นเดียว          200 OK
//   POST     /api/products        เพิ่มใหม่            201 Created
//   PATCH    /api/products/:id    แก้บางส่วน           200 OK
//   DELETE   /api/products/:id    ลบ                  204 No Content
//
// สังเกต: PATH ใช้คำนาม (products) ส่วน "การกระทำ" บอกด้วย METHOD

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware แปลง JSON ที่ผู้ใช้ส่งมา (body) ให้เป็น object ใน req.body
// ถ้าไม่มีบรรทัดนี้ req.body จะเป็น undefined
app.use(express.json());

// "ฐานข้อมูล" ชั่วคราว (หายหมดเมื่อปิด server)
let products = [
  { id: 1, name: "Notebook", price: 25000 },
  { id: 2, name: "Mouse", price: 450 },
];
let nextId = 3;

// ----- GET ทั้งหมด -----
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ----- GET ชิ้นเดียว -----
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id); // params เป็น string ต้องแปลงเป็นตัวเลขก่อน
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "ไม่พบสินค้า" }); // return = จบตรงนี้ ไม่ทำบรรทัดถัดไป
  }
  res.json(product);
});

// ----- POST เพิ่มใหม่ -----
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  // validate = ตรวจข้อมูลก่อนบันทึก ห้ามเชื่อข้อมูลจากผู้ใช้
  if (!name || typeof price !== "number") {
    return res.status(400).json({ error: "ต้องมี name และ price (ตัวเลข)" });
  }

  const newProduct = { id: nextId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ----- PATCH แก้บางส่วน -----
app.patch("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }

  // แก้เฉพาะ field ที่ส่งมา
  if (req.body.name !== undefined) product.name = req.body.name;
  if (req.body.price !== undefined) product.price = req.body.price;
  res.json(product);
});

// ----- DELETE ลบ -----
app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = products.some((p) => p.id === id);
  if (!exists) {
    return res.status(404).json({ error: "ไม่พบสินค้า" });
  }

  products = products.filter((p) => p.id !== id);
  res.status(204).end(); // 204 = สำเร็จแต่ไม่มีข้อมูลส่งกลับ
});

app.listen(PORT, () => {
  console.log(`🚀 Memory API พร้อมที่ http://localhost:${PORT}/api/products`);
});
