// บทที่ 2: Async และการดึงข้อมูลด้วย fetch
// รันไฟล์นี้ด้วยคำสั่ง: node 02-async-fetch/lesson.js
// API ตัวอย่างที่ใช้: https://jsonplaceholder.typicode.com (API ปลอมฟรีสำหรับฝึก)

// ----- 1) ทำไมต้อง async? -----
// งานบางอย่างใช้เวลา (ดึงข้อมูลจากเน็ต, อ่านไฟล์) Node จะไม่ "ยืนรอ"
// แต่จะทำบรรทัดถัดไปก่อน แล้วค่อยกลับมาทำต่อเมื่องานนั้นเสร็จ
function demoOrder() {
  console.log("1. เริ่ม");
  setTimeout(() => {
    console.log("3. ผ่านไป 1 วินาที (งานที่ใช้เวลา)");
  }, 1000);
  console.log("2. บรรทัดนี้ทำก่อน ไม่รอ setTimeout");
}

// ----- 2) Promise = "สัญญาว่าจะได้ผลลัพธ์ในอนาคต" -----
// มี 3 สถานะ: pending (รอ) -> fulfilled (สำเร็จ) หรือ rejected (ล้มเหลว)
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`รอแล้ว ${ms} ms`), ms);
  });
}

// ----- 3) async / await = วิธีเขียน Promise ให้อ่านง่ายเหมือนโค้ดปกติ -----
// - ใส่ async หน้า function
// - ใส่ await หน้า Promise เพื่อ "รอ" จนได้ผลลัพธ์
async function demoAwait() {
  const result = await wait(500);
  console.log(result);
}

// ----- 4) fetch = ดึงข้อมูลจาก URL (มีใน Node 18+ ใช้ได้เลยไม่ต้องติดตั้ง) -----
async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  // response คือ "ซองจดหมาย" ยังไม่ใช่ข้อมูล ต้องแกะด้วย .json() (ซึ่งก็ต้อง await อีกที)
  const user = await response.json();

  console.log("ชื่อ:", user.name);
  console.log("อีเมล:", user.email);
  console.log("เมือง:", user.address.city);
}

// ----- 5) จัดการ Error ด้วย try / catch -----
// ข้อควรรู้: fetch จะ "ไม่" throw error เมื่อได้ 404 หรือ 500
// ต้องเช็ก response.ok เอง
async function getPost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error(`ดึงข้อมูลไม่สำเร็จ: HTTP ${response.status}`);
    }
    const post = await response.json();
    console.log(`โพสต์ #${post.id}: ${post.title}`);
  } catch (error) {
    // เข้ามาตรงนี้เมื่อเน็ตหลุด, URL ผิด, หรือเรา throw เอง
    console.log("เกิดข้อผิดพลาด:", error.message);
  }
}

// ----- 6) ดึงหลายอันพร้อมกันด้วย Promise.all (เร็วกว่าดึงทีละอัน) -----
async function getManyUsers() {
  const ids = [1, 2, 3];
  const users = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      return res.json();
    })
  );
  // ได้ array ของ object กลับมา (ตามที่เรียนในบทที่แล้ว)
  users.forEach((u) => console.log(`- ${u.id}: ${u.name}`));
}

// ----- ส่วนที่สั่งรันทั้งหมดตามลำดับ -----
async function main() {
  console.log("=== 1) ลำดับการทำงาน ===");
  demoOrder();
  await wait(1100); // รอให้ตัวอย่างที่ 1 จบก่อน

  console.log("\n=== 3) async/await ===");
  await demoAwait();

  console.log("\n=== 4) fetch ข้อมูลผู้ใช้ ===");
  await getUser();

  console.log("\n=== 5) จัดการ error ===");
  await getPost(1);
  await getPost(9999); // id ไม่มีอยู่จริง -> ได้ 404

  console.log("\n=== 6) Promise.all ===");
  await getManyUsers();
}

main();
