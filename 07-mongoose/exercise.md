# แบบฝึกหัดบทที่ 7: ทำ Todo API ใหม่ด้วย Mongoose

ทำโจทย์ Todo API จากบทที่ 6 อีกครั้ง แต่คราวนี้ใช้ Mongoose และโครงสร้างแบบในบทนี้
เพิ่มไฟล์ลงในโปรเจกต์ `07-mongoose` นี้เลย (ใช้ `app.js`, `server.js` ตัวเดิม)

```
src/
├── models/
│   ├── Product.js
│   └── Todo.js        ← ข้อ 1 สร้างใหม่
├── routes/
│   ├── products.js
│   └── todos.js       ← ข้อ 2 สร้างใหม่
├── app.js             ← ข้อ 3 เพิ่ม 2 บรรทัด
└── server.js
```

## ข้อ 1: สร้าง Model `Todo`
ไฟล์ `src/models/Todo.js` ใช้ `Product.js` เป็นต้นแบบ

| field | ชนิด | กฎ |
|---|---|---|
| `title` | String | ต้องมี, trim, ยาวไม่เกิน 100 ตัวอักษร (`maxlength`) |
| `done` | Boolean | default เป็น `false` |

เปิด `timestamps: true` ด้วย

## ข้อ 2: สร้าง Router
ไฟล์ `src/routes/todos.js` ใช้ `routes/products.js` เป็นต้นแบบ ให้มีครบ 5 route

| METHOD | PATH | สำเร็จ |
|---|---|---|
| GET | `/` | 200 |
| GET | `/:id` | 200 (ไม่พบ → 404) |
| POST | `/` | 201 |
| PATCH | `/:id` | 200 (ไม่พบ → 404) |
| DELETE | `/:id` | 204 (ไม่พบ → 404) |

## ข้อ 3: ผูก Router เข้ากับแอป
ใน `src/app.js` ให้ `require` router ของ todos แล้วผูกกับ path `/api/todos`
(ดูบรรทัดที่เป็น comment ไว้ใน app.js)

## ข้อ 4: กรองด้วย query
`GET /api/todos?done=true` และ `?done=false`

- ใบ้: `req.query.done` เป็น string ต้องแปลงเป็น boolean ก่อน
  เช่น `filter.done = req.query.done === "true"`

## ข้อ 5: ทดสอบด้วย Postman
ทดสอบให้ครบทุกกรณี และจดว่าได้ status อะไร

1. POST `{ "title": "อ่านหนังสือ" }` → 201 และมี `done: false`
2. POST `{ }` → 400
3. POST `{ "title": "   " }` (มีแต่ช่องว่าง) → ได้อะไร? ทำไม?
4. PATCH `{ "done": true }` → 200
5. PATCH `{ "done": "maybe" }` → 400
6. GET `/api/todos/abc` → 400
7. GET `/api/todos?done=true` → ได้เฉพาะงานที่เสร็จ
8. DELETE → 204 แล้ว GET id เดิม → 404

## ข้อ 6 (คิด): เทียบกับบทที่ 6
เทียบโค้ด `routes/todos.js` กับ `todo-api.js` ในบทที่ 6
- โค้ดส่วนไหนที่หายไปบ้าง? ใครทำหน้าที่นั้นแทน?
- ข้อ 3 ในข้อ 5 ได้ผลแบบนี้เพราะกฎข้อไหนใน Schema?
