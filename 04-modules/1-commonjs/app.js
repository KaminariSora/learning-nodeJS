// บทที่ 4 (ส่วนที่ 1): Modules แบบ CommonJS
// รันด้วย: node 04-modules/1-commonjs/app.js

// ----- 1) require module ของเราเอง -----
// ต้องขึ้นต้นด้วย ./ (แปลว่า "ไฟล์ในโฟลเดอร์เดียวกัน") ไม่ต้องใส่ .js ก็ได้
const gradeUtils = require("./grade-utils");

console.log("=== 1) require ทั้งก้อน ===");
console.log(gradeUtils); // { getGrade: [Function], isPassed: [Function], average: [Function] }
console.log(gradeUtils.getGrade(85)); // A

// ----- 2) ดึงมาเฉพาะที่ใช้ ด้วย destructuring (นิยมกว่า) -----
const { getGrade, average } = require("./grade-utils");

console.log("\n=== 2) destructuring ===");
console.log(getGrade(72));            // B
console.log(average([85, 42, 73]));   // 66.666...

// ของที่ไม่ได้ export ออกมา จะเข้าถึงไม่ได้
console.log(gradeUtils.PASS_SCORE);   // undefined

// ----- 3) Built-in modules = module ที่มากับ Node อยู่แล้ว ไม่ต้องติดตั้ง -----
// ใส่ "node:" นำหน้าเพื่อบอกชัดๆ ว่าเป็นของ Node (ไม่ใส่ก็ได้ แต่แนะนำให้ใส่)
const path = require("node:path");
const os = require("node:os");

console.log("\n=== 3) built-in modules ===");
console.log("ไฟล์นี้อยู่ที่:", __filename);
console.log("โฟลเดอร์นี้:", __dirname);
console.log("ต่อ path:", path.join(__dirname, "data", "students.json"));
console.log("นามสกุลไฟล์:", path.extname("report.pdf"));  // .pdf
console.log("ระบบปฏิบัติการ:", os.platform());
console.log("ชื่อผู้ใช้เครื่อง:", os.userInfo().username);

// ----- สรุป 3 แบบของ require -----
// require("./grade-utils") -> ไฟล์ของเราเอง (มี ./ หรือ ../ นำหน้า)
// require("node:path")     -> built-in ของ Node
// require("express")       -> package ที่ติดตั้งผ่าน npm (จะได้เรียนในบทหลัง)
