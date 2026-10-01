# แบบฝึกหัดบทที่ 4: Modules

สร้างไฟล์ทั้งหมดไว้ในโฟลเดอร์ `04-modules/exercise/` นี้ แล้วรันด้วย:

```
node 04-modules/exercise/app.js
```

## ข้อ 1: สร้าง module ของตัวเอง (CommonJS)
สร้างไฟล์ `price-utils.js` ที่มีฟังก์ชัน 3 ตัว แล้ว export ออกไปด้วย `module.exports`

- `addVat(price)` คืนราคารวม VAT 7% เช่น `addVat(100)` ได้ `107`
- `applyDiscount(price, percent)` คืนราคาหลังหักส่วนลด เช่น `applyDiscount(1000, 10)` ได้ `900`
- `formatBaht(price)` คืนข้อความ เช่น `formatBaht(1500)` ได้ `"1,500 บาท"`
  - ใบ้: `price.toLocaleString()` จะใส่ลูกน้ำให้

## ข้อ 2: เรียกใช้ module
สร้างไฟล์ `app.js` แล้ว `require` ฟังก์ชันจาก `price-utils.js` (ใช้ destructuring)
จากนั้นคำนวณราคาของ Notebook ราคา 25,000 บาท ลด 10% แล้วบวก VAT

ผลที่ควรได้: `24,075 บาท`

## ข้อ 3: แยกข้อมูลออกเป็นอีก module
สร้างไฟล์ `products.js` ที่ export array สินค้านี้ออกไป

```js
[
  { name: "Notebook", price: 25000 },
  { name: "Mouse", price: 450 },
  { name: "Chair", price: 1800 },
]
```

แล้วใน `app.js` ให้ `require` เข้ามา และใช้ `map` + ฟังก์ชันจาก `price-utils.js`
แสดงราคารวม VAT ของทุกชิ้น

ผลที่ควรได้:
```
Notebook: 26,750 บาท
Mouse: 481.5 บาท
Chair: 1,926 บาท
```

## ข้อ 4: ใช้ built-in module
ใน `app.js` ใช้ `path` แสดง path เต็มของไฟล์ `products.js`
- ใบ้: `path.join(__dirname, "products.js")`

## ข้อ 5 (ท้าทาย): แปลงเป็น ES Modules
คัดลอกทั้ง 3 ไฟล์ไปไว้ในโฟลเดอร์ใหม่ `04-modules/exercise-esm/`
แล้วแก้ให้ใช้ `import` / `export` แทน

- อย่าลืมสร้าง `package.json` ที่มี `"type": "module"`
- อย่าลืมใส่ `.js` ท้ายชื่อไฟล์ตอน import
- `__dirname` จะใช้ไม่ได้ ต้องเปลี่ยนเป็นอะไร?
