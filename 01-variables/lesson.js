// บทที่ 1: ตัวแปร (Variables)
// รันไฟล์นี้ด้วยคำสั่ง: node 01-variables/lesson.js

// ----- 1) การประกาศตัวแปร -----
// const = ค่าคงที่ กำหนดค่าใหม่ไม่ได้ (ควรใช้เป็นค่าเริ่มต้นเสมอ)
const name = "Nonthacha";

// let = ตัวแปรที่เปลี่ยนค่าได้
let age = 20;
age = 21; // ได้ เพราะเป็น let

// name = "Bob"; // ❌ Error: Assignment to constant variable.

// var = แบบเก่า ไม่แนะนำให้ใช้แล้ว (scope แปลก ทำให้เกิดบั๊กง่าย)

console.log("ชื่อ:", name);
console.log("อายุ:", age);

// ----- 2) ชนิดข้อมูลพื้นฐาน (Primitive types) -----
const text = "สวัสดี";      // string  (ข้อความ)
const count = 42;           // number  (ตัวเลข ทั้งจำนวนเต็มและทศนิยม)
const price = 99.5;         // number
const isStudent = true;     // boolean (true / false)
let nothing = null;         // null    (ตั้งใจว่า "ไม่มีค่า")
let notSet;                 // undefined (ยังไม่ได้กำหนดค่า)

// typeof ใช้ดูชนิดข้อมูล
console.log(typeof text);      // string
console.log(typeof count);     // number
console.log(typeof price);     // number
console.log(typeof isStudent); // boolean
console.log(typeof nothing);   // object  <- เป็นบั๊กเก่าของ JS ต้องจำไว้
console.log(typeof notSet);    // undefined

// ----- 3) Template string (ใช้ backtick ` `) -----
// แทรกตัวแปรในข้อความด้วย ${...}
console.log(`ฉันชื่อ ${name} อายุ ${age} ปี`);
console.log(`ปีหน้าจะอายุ ${age + 1} ปี`);

// ----- 4) const กับ object / array -----
// const ห้าม "กำหนดค่าใหม่" แต่ยังแก้ "ข้างใน" ได้
const fruits = ["apple", "banana"];
fruits.push("mango");          // ได้
// fruits = ["orange"];        // ❌ Error
console.log(fruits);

const user = { name: "Ann", age: 25 };
user.age = 26;                 // ได้
console.log(user);
