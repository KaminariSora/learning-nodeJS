// บทที่ 3: Functions และ Array methods
// รันไฟล์นี้ด้วยคำสั่ง: node 03-array-methods/lesson.js

// ข้อมูลตัวอย่าง: array ของ object (หน้าตาเหมือนข้อมูลที่ได้จาก API)
const products = [
  { id: 1, name: "Notebook", price: 25000, category: "it", inStock: true },
  { id: 2, name: "Mouse", price: 450, category: "it", inStock: true },
  { id: 3, name: "Desk", price: 3200, category: "furniture", inStock: false },
  { id: 4, name: "Chair", price: 1800, category: "furniture", inStock: true },
  { id: 5, name: "Keyboard", price: 1200, category: "it", inStock: false },
];

// ----- 1) ทบทวน: 3 วิธีเขียนฟังก์ชัน -----
function addVat(price) {           // function ปกติ
  return price * 1.07;
}
const addVat2 = function (price) { // function expression (เก็บไว้ในตัวแปร)
  return price * 1.07;
};
const addVat3 = (price) => price * 1.07; // arrow function (ย่อสุด)

console.log("=== 1) ฟังก์ชัน ===");
console.log(addVat(100), addVat2(100), addVat3(100)); // ได้เท่ากันหมด

// ----- 2) forEach = วนทำอะไรสักอย่างกับทุกตัว (ไม่คืนค่า) -----
console.log("\n=== 2) forEach ===");
products.forEach((p) => {
  console.log(`- ${p.name}: ${p.price} บาท`);
});

// ----- 3) map = แปลงทุกตัว ได้ array ใหม่ "จำนวนเท่าเดิม" -----
console.log("\n=== 3) map ===");
const names = products.map((p) => p.name);
console.log(names); // [ 'Notebook', 'Mouse', 'Desk', 'Chair', 'Keyboard' ]

const withVat = products.map((p) => ({ name: p.name, priceWithVat: p.price * 1.07 }));
// หมายเหตุ: ถ้าจะ return object แบบย่อ ต้องครอบด้วย ( ) ไม่งั้น JS คิดว่า { } คือตัวฟังก์ชัน
console.log(withVat);

// ----- 4) filter = กรอง ได้ array ใหม่ "เฉพาะตัวที่ผ่านเงื่อนไข" -----
console.log("\n=== 4) filter ===");
const inStock = products.filter((p) => p.inStock);
console.log("มีของ:", inStock.map((p) => p.name));

const cheap = products.filter((p) => p.price < 2000);
console.log("ราคาต่ำกว่า 2000:", cheap.map((p) => p.name));

// ----- 5) find = หา "ตัวแรก" ที่ตรงเงื่อนไข ได้ object ตัวเดียว (ไม่ใช่ array) -----
console.log("\n=== 5) find ===");
const desk = products.find((p) => p.id === 3);
console.log(desk);
const notFound = products.find((p) => p.id === 99);
console.log(notFound); // undefined (หาไม่เจอ)

// ----- 6) some / every = ถามว่า "มีบางตัว" / "ทุกตัว" ไหม ได้ true/false -----
console.log("\n=== 6) some / every ===");
console.log("มีของหมดบ้างไหม:", products.some((p) => !p.inStock));      // true
console.log("ทุกชิ้นราคาเกิน 100 ไหม:", products.every((p) => p.price > 100)); // true

// ----- 7) reduce = รวมทุกตัวให้เหลือค่าเดียว (เช่น ผลรวม) -----
console.log("\n=== 7) reduce ===");
// reduce((ตัวสะสม, ตัวปัจจุบัน) => ค่าสะสมใหม่, ค่าเริ่มต้น)
const total = products.reduce((sum, p) => sum + p.price, 0);
console.log("ราคารวมทั้งหมด:", total);
// รอบ 1: sum=0     + 25000 = 25000
// รอบ 2: sum=25000 + 450   = 25450
// ... ไปเรื่อยๆ จนครบ

// ----- 8) ต่อกันเป็นสาย (chaining) -----
console.log("\n=== 8) chaining ===");
// "ราคารวมของสินค้าหมวด it ที่มีของ"
const itTotal = products
  .filter((p) => p.category === "it")
  .filter((p) => p.inStock)
  .reduce((sum, p) => sum + p.price, 0);
console.log("ราคารวมสินค้า it ที่มีของ:", itTotal); // 25000 + 450 = 25450

// ----- 9) sort = เรียงลำดับ (ระวัง: แก้ array เดิม!) -----
console.log("\n=== 9) sort ===");
// ใช้ [...products] คัดลอกก่อน จะได้ไม่ไปแก้ array ต้นฉบับ
const byPrice = [...products].sort((a, b) => a.price - b.price); // น้อย -> มาก
console.log(byPrice.map((p) => `${p.name} (${p.price})`));

// ----- สรุปเลือกใช้ตัวไหน -----
// อยากแปลงทุกตัว         -> map     (ได้ array จำนวนเท่าเดิม)
// อยากกรองบางตัว         -> filter  (ได้ array ที่สั้นลง)
// อยากหาตัวเดียว          -> find    (ได้ object หรือ undefined)
// อยากถามใช่/ไม่ใช่       -> some / every (ได้ true/false)
// อยากรวมเป็นค่าเดียว     -> reduce  (ได้ค่าอะไรก็ได้ เช่น ตัวเลข)
// อยากแค่วนทำอะไรสักอย่าง -> forEach (ไม่คืนค่า)
