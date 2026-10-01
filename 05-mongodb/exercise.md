# แบบฝึกหัดบทที่ 5: MongoDB

สร้างไฟล์ `exercise.js` ในโฟลเดอร์ `05-mongodb/` แล้วเพิ่ม script นี้ใน `package.json`

```json
"exercise": "node --env-file=.env exercise.js"
```

รันด้วย `npm run exercise` (ต้องอยู่ในโฟลเดอร์ `05-mongodb`)

ใช้ collection ใหม่ชื่อ `products` (ไม่ต้องไปยุ่งกับ `students`)
ใช้โครงเดียวกับไฟล์บทเรียน: `require("./db")` + `try / catch / finally`

## ข้อ 1: เพิ่มข้อมูล
ลบข้อมูลเก่าใน `products` ทิ้งก่อน แล้วใช้ `insertMany` เพิ่มสินค้าเหล่านี้

| name | price | category | stock |
|---|---|---|---|
| Notebook | 25000 | it | 5 |
| Mouse | 450 | it | 30 |
| Desk | 3200 | furniture | 0 |
| Chair | 1800 | furniture | 12 |
| Keyboard | 1200 | it | 0 |

แสดง `insertedCount` ผลที่ควรได้: `5`

## ข้อ 2: ค้นหา
- หาสินค้าหมวด `it` ทั้งหมด แสดงแค่ชื่อ → `[ 'Notebook', 'Mouse', 'Keyboard' ]`
- หาสินค้าที่ราคาต่ำกว่า 2000 → `[ 'Mouse', 'Chair', 'Keyboard' ]`
- หาสินค้าที่ของหมด (`stock` เท่ากับ 0) → `[ 'Desk', 'Keyboard' ]`

## ข้อ 3: เรียงลำดับ
หาสินค้าที่แพงที่สุด 1 ชิ้น (ใช้ `sort` + `limit`) แสดงแค่ `name` กับ `price`
ผลที่ควรได้: `[ { name: 'Notebook', price: 25000 } ]`

## ข้อ 4: แก้ไข
- ขาย Mouse ไป 3 ชิ้น (ใช้ `$inc` ลด stock) → stock ที่เหลือควรเป็น `27`
- ลดราคาสินค้าหมวด `furniture` ทุกชิ้นให้มี field `onSale: true` (ใช้ `updateMany`)
  → `modifiedCount` ควรเป็น `2`

## ข้อ 5: ลบ
ลบสินค้าที่ของหมดทั้งหมด (`stock` เท่ากับ 0) แล้วนับจำนวนสินค้าที่เหลือด้วย `countDocuments`
ผลที่ควรได้: ลบไป `2` เหลือ `3`

## ข้อ 6 (ท้าทาย): ใช้ร่วมกับ fetch
ดึงข้อมูลจาก `https://jsonplaceholder.typicode.com/users`
แล้วบันทึกลง collection `users` เฉพาะ field `name`, `email`, `city` (อยู่ใน `address.city`)
จากนั้นค้นหาคนที่อยู่เมือง `"Gwenborough"`

- ใบ้: ใช้ `map` แปลงข้อมูลก่อน `insertMany`
- ผลที่ควรได้: `Leanne Graham`
