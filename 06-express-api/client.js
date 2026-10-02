// โปรแกรมทดสอบ API (ใช้ fetch จากบทที่ 2)
// วิธีใช้: เปิด server ไว้ใน terminal หนึ่ง (npm run api หรือ npm run memory)
//          แล้วเปิดอีก terminal รัน: npm run client
//
// เบราว์เซอร์ส่งได้แค่ GET ถ้าจะทดสอบ POST / PATCH / DELETE ต้องใช้ fetch แบบนี้
// (หรือใช้โปรแกรมอย่าง Postman / Thunder Client)

const BASE_URL = "http://localhost:3000/api/products";

// ฟังก์ชันช่วยส่ง request แล้วแสดงผล
async function request(method, url, body) {
  const options = { method };
  if (body) {
    options.headers = { "Content-Type": "application/json" }; // บอก server ว่าส่ง JSON
    options.body = JSON.stringify(body); // แปลง object เป็นข้อความ JSON
  }

  const response = await fetch(url, options);
  const data = response.status === 204 ? null : await response.json();
  console.log(`\n${method} ${url.replace(BASE_URL, "/api/products")}`);
  console.log(`→ ${response.status}`, data ?? "");
  return data;
}

async function main() {
  // 1) ดูทั้งหมด
  await request("GET", BASE_URL);

  // 2) เพิ่มใหม่
  const created = await request("POST", BASE_URL, { name: "Keyboard", price: 1200, category: "it" });
  // memory API ใช้ id ส่วน mongo API ใช้ _id
  const id = created._id ?? created.id;

  // 3) ดูชิ้นที่เพิ่งเพิ่ม
  await request("GET", `${BASE_URL}/${id}`);

  // 4) แก้ราคา
  await request("PATCH", `${BASE_URL}/${id}`, { price: 990 });

  // 5) ลบ
  await request("DELETE", `${BASE_URL}/${id}`);

  // 6) ดูอีกครั้ง -> ควรได้ 404 เพราะลบไปแล้ว
  await request("GET", `${BASE_URL}/${id}`);

  // 7) ส่งข้อมูลไม่ครบ -> ควรได้ 400
  await request("POST", BASE_URL, { name: "No price" });
}

main().catch((error) => {
  console.log("❌ ติดต่อ server ไม่ได้ เปิด server ไว้หรือยัง?", error.message);
});
