// บทที่ 6 (ส่วนที่ 1): Express พื้นฐาน
// รันด้วย: npm run hello  แล้วเปิดเบราว์เซอร์ไปที่ http://localhost:3000
// หยุด server: กด Ctrl + C ใน terminal

const express = require("express");

const app = express(); // สร้างแอป (ตัว server)
const PORT = process.env.PORT || 3000;

// ----- 1) Middleware = ฟังก์ชันที่ทำงาน "ก่อน" ถึง route ทุกครั้ง -----
// ตัวอย่าง: log ทุก request ที่เข้ามา
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // ไปต่อที่ middleware หรือ route ถัดไป (ถ้าลืม request จะค้าง!)
});

// ----- 2) Route = "ถ้ามีคนเรียก METHOD + PATH นี้ ให้ทำอะไร" -----
// app.get(path, (req, res) => { ... })
//   req (request)  = ข้อมูลที่ผู้ใช้ส่งมา
//   res (response) = ใช้ตอบกลับไปหาผู้ใช้
app.get("/", (req, res) => {
  res.send("สวัสดีจาก Express! 👋"); // ตอบเป็นข้อความ
});

// res.json() = ตอบเป็น JSON (ใช้บ่อยที่สุดสำหรับ API)
app.get("/about", (req, res) => {
  res.json({ name: "My First API", version: "1.0.0" });
});

// ----- 3) Route parameter (:ชื่อ) = ส่วนของ URL ที่เปลี่ยนได้ -----
// ลองเปิด: http://localhost:3000/hello/Ann
app.get("/hello/:name", (req, res) => {
  const name = req.params.name; // ดึงค่าจาก URL
  res.json({ message: `สวัสดี ${name}` });
});

// ----- 4) Query string (?key=value) = ตัวเลือกเพิ่มเติม มักใช้ค้นหา/กรอง -----
// ลองเปิด: http://localhost:3000/search?q=notebook&limit=5
app.get("/search", (req, res) => {
  const { q, limit } = req.query; // ค่าจาก query เป็น string เสมอ
  res.json({ keyword: q, limit: Number(limit) || 10 });
});

// ----- 5) Status code = รหัสบอกผลลัพธ์ -----
// ลองเปิด: http://localhost:3000/secret
app.get("/secret", (req, res) => {
  res.status(403).json({ error: "ไม่มีสิทธิ์เข้าถึง" });
});

// ----- 6) 404 = ไม่มี route ไหนตรงเลย (ต้องวางไว้ล่างสุด) -----
app.use((req, res) => {
  res.status(404).json({ error: `ไม่พบ ${req.method} ${req.url}` });
});

// ----- เปิด server รอรับ request -----
app.listen(PORT, () => {
  console.log(`🚀 Server พร้อมแล้วที่ http://localhost:${PORT}`);
});
