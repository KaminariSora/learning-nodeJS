// แบบฝึกหัดบทที่ 1: ตัวแปร
// เขียนโค้ดตามโจทย์ แล้วรันด้วย: node 01-variables/exercise.js

// ข้อ 1: สร้างตัวแปร productName (ชื่อสินค้า) และ productPrice (ราคา)
//        โดยเลือกใช้ const หรือ let ให้เหมาะสม
const productName = "Notebook";
const productPrice = 299.99;
const isAvailable = true;

// ข้อ 2: สร้างตัวแปร stock = 10 แล้วขายไป 3 ชิ้น (ลดค่า stock ลง)
//        แล้ว console.log ค่า stock ที่เหลือ
let stock = 10;
stock -= 3;
console.log("สินค้าที่เหลือ:", stock);

// ข้อ 3: ใช้ template string พิมพ์ข้อความนี้ออกมา
//        "สินค้า <ชื่อ> ราคา <ราคา> บาท เหลือ <stock> ชิ้น"
console.log(`สินค้า ${productName} ราคา ${productPrice} บาท เหลือ ${stock} ชิ้น`);

// ข้อ 4: ใช้ typeof พิมพ์ชนิดข้อมูลของ productName, productPrice
//        และตัวแปร boolean ชื่อ isAvailable
console.log("ชนิดข้อมูลของ productName:", typeof productName);
console.log("ชนิดข้อมูลของ productPrice:", typeof productPrice);
console.log("ชนิดข้อมูลของ isAvailable:", typeof isAvailable);

// ข้อ 5 (คิดก่อนรัน): โค้ดด้านล่างนี้จะ Error หรือไม่? เพราะอะไร?
//        ลองเอา comment ออกแล้วรันดูเพื่อตรวจคำตอบ
const scores = [80, 90];
scores.push(100);
console.log(scores);
// scores = [];