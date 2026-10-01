async function getUser() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
  // response คือ "ซองจดหมาย" ยังไม่ใช่ข้อมูล ต้องแกะด้วย .json() (ซึ่งก็ต้อง await อีกที)
  const user = await response.json();

  console.log("ชื่อ:", user.name);
  console.log("อีเมล:", user.email);
  console.log("เมือง:", user.address.city);
}

getUser();