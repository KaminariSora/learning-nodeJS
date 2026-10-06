// ทดสอบ API (เปิด server ด้วย npm run dev ไว้ก่อน แล้วรัน npm run client ในอีก terminal)

const BASE_URL = "http://localhost:3000/api/products";

async function request(method, url, body) {
  const options = { method };
  if (body) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  const data = response.status === 204 ? null : await response.json();
  console.log(`\n${method} ${url.replace(BASE_URL, "/api/products")}`);
  console.log(`→ ${response.status}`, data ?? "");
  return data;
}

async function main() {
  // 1) เพิ่มสินค้า
  const created = await request("POST", BASE_URL, { name: "Keyboard", price: 1200, category: "it" });

  // 2) ดูทั้งหมด
  await request("GET", BASE_URL);

  // 3) แก้ราคา
  await request("PATCH", `${BASE_URL}/${created._id}`, { price: 990 });

  // 4) ข้อมูลผิดกฎ -> 400 พร้อมรายละเอียดทุก field
  await request("POST", BASE_URL, { name: "X", price: -1, category: "food" });

  // 5) แก้เป็นค่าที่ผิดกฎ -> 400 (เพราะ runValidators: true)
  await request("PATCH", `${BASE_URL}/${created._id}`, { price: -5 });

  // 6) id ผิดรูปแบบ -> 400
  await request("GET", `${BASE_URL}/abc`);

  // 7) ลบ แล้วดูอีกครั้ง -> 204 แล้ว 404
  await request("DELETE", `${BASE_URL}/${created._id}`);
  await request("GET", `${BASE_URL}/${created._id}`);
}

main().catch((error) => {
  console.log("❌ ติดต่อ server ไม่ได้ เปิด server ไว้หรือยัง?", error.message);
});
