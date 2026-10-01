// บทที่ 4 (ส่วนที่ 2): ES Modules (import / export)
// รันด้วย: node 04-modules/2-esm/app.js

// ----- 1) import named export ต้องใช้ชื่อตรงกับที่ export และอยู่ใน { } -----
// ESM ต้องใส่ .js ท้ายชื่อไฟล์เสมอ (ต่างจาก require)
import { getGrade, isPassed, SCHOOL_NAME } from "./grade-utils.js";

// ----- 2) import default export ไม่ต้องมี { } และตั้งชื่ออะไรก็ได้ -----
import average from "./grade-utils.js";

// ----- 3) built-in modules ก็ import ได้เหมือนกัน -----
import path from "node:path";

console.log("=== import / export ===");
console.log(SCHOOL_NAME);
console.log(getGrade(91));            // A
console.log(isPassed(42));            // false
console.log(average([85, 42, 73]));   // 66.666...

// ----- 4) ข้อดีของ ESM: ใช้ await ข้างนอก async function ได้เลย (top-level await) -----
console.log("\n=== top-level await ===");
const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
const user = await response.json();
console.log("ดึงข้อมูลได้โดยไม่ต้องห่อด้วย async function main():", user.name);

// ----- 5) ข้อควรระวัง: ESM ไม่มี __dirname ให้ใช้ -----
// ต้องใช้ import.meta.dirname แทน (Node 20.11+)
console.log("\n=== path ใน ESM ===");
console.log("โฟลเดอร์นี้:", import.meta.dirname);
console.log("ต่อ path:", path.join(import.meta.dirname, "data.json"));
