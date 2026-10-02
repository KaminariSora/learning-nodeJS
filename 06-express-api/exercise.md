# แบบฝึกหัดบทที่ 6: REST API ด้วย Express + MongoDB

สร้าง API สำหรับ **รายการงาน (Todo)** ในไฟล์ใหม่ `todo-api.js`
แล้วเพิ่ม script ใน `package.json`:

```json
"todo": "node --watch --env-file=.env todo-api.js"
```

ใช้ [3-api-mongo.js](3-api-mongo.js) เป็นต้นแบบ แต่ใช้ collection ชื่อ `todos`
ข้อมูลแต่ละงานมีหน้าตาแบบนี้:

```js
{ _id: ObjectId("..."), title: "อ่านหนังสือ", done: false }
```

## ข้อ 1: GET /api/todos
คืนงานทั้งหมด (ถ้ายังไม่มีงาน ให้คืน `[]`)

## ข้อ 2: POST /api/todos
- รับ `{ "title": "..." }` แล้วบันทึก โดยตั้ง `done: false` ให้อัตโนมัติ
- ถ้าไม่มี `title` หรือ `title` เป็นข้อความว่าง → `400`
- สำเร็จ → `201` พร้อมงานที่เพิ่งสร้าง (มี `_id`)

## ข้อ 3: GET /api/todos/:id
- id ผิดรูปแบบ → `400`
- ไม่พบ → `404`
- พบ → `200` พร้อมข้อมูลงาน

## ข้อ 4: PATCH /api/todos/:id
แก้ไขได้เฉพาะ `title` และ `done`
- ถ้าส่ง `done` มาแต่ไม่ใช่ `true` / `false` → `400`
- ไม่พบ → `404`

## ข้อ 5: DELETE /api/todos/:id
- ลบสำเร็จ → `204`
- ไม่พบ → `404`

## ข้อ 6: กรองด้วย query
`GET /api/todos?done=true` คืนเฉพาะงานที่เสร็จแล้ว
`GET /api/todos?done=false` คืนเฉพาะงานที่ยังไม่เสร็จ

- ใบ้: ค่าจาก `req.query` เป็น **string** เสมอ `"true"` ไม่เท่ากับ `true`

## ข้อ 7: ทดสอบ
คัดลอก [client.js](client.js) เป็น `todo-client.js` แล้วแก้ให้ทดสอบ API ของคุณครบทุกข้อ
รวมถึงกรณีที่ควรได้ `400` และ `404`

## ข้อ 8 (ท้าทาย): แยกไฟล์ด้วย Router
เมื่อ API ใหญ่ขึ้น ไม่ควรเขียนทุกอย่างในไฟล์เดียว
ลองค้นหาเรื่อง `express.Router()` แล้วแยก route ของ todos ไปไว้ในไฟล์ `routes/todos.js`
(ใช้ความรู้เรื่อง module จากบทที่ 4)
