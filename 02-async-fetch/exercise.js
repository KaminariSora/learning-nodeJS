// แบบฝึกหัดบทที่ 2: Async และ fetch
// รันด้วย: node 02-async-fetch/exercise.js
// ใช้ API: https://jsonplaceholder.typicode.com

// ข้อ 1: เขียน async function ชื่อ getTodo
//        ดึงข้อมูลจาก https://jsonplaceholder.typicode.com/todos/1
//        แล้ว console.log ค่า title และ completed
async function getTodo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const todo = await response.json();
  console.log("ชื่อ:", todo.title);
  console.log("เสร็จแล้ว:", todo.completed);
}
// ข้อ 2: เขียน async function ชื่อ getUserPosts(userId)
//        ดึงจาก https://jsonplaceholder.typicode.com/posts?userId=<userId>
//        (จะได้ array กลับมา) แล้วแสดง "ผู้ใช้ <userId> มีโพสต์ทั้งหมด <จำนวน> โพสต์"
//        ใบ้: ใช้ .length
async function getUserPosts(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`ดึงข้อมูลไม่สำเร็จ: HTTP ${response.status}`);
    }
    const posts = await response.json();
    console.log(`users: ${userId} post: ${posts.length}`)
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  }
}

async function countDoneTodos(userId) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/?userId=" + userId);
    if (!response.ok) {
      throw new Error(`ดึงข้อมูลไม่สำเร็จ: HTTP ${response.status}`);
    }
    const todos = await response.json();
    // console.log(todos)
    const doneTodos = todos.filter(todo => todo.completed === true);
    console.log(`ผู้ใช้ ${userId} มีงานที่ทำเสร็จแล้วทั้งหมด ${doneTodos.length} งาน`);
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  }
}

// ข้อ 3: แก้ getUserPosts ให้มี try/catch และเช็ก response.ok
//        แล้วลองเปลี่ยน URL ให้ผิด (เช่น /postsxxx) ดูว่า error แสดงออกมาไหม


// ข้อ 4 (ท้าทาย): ดึง todos ของ userId=1 จาก
//        https://jsonplaceholder.typicode.com/todos?userId=1
//        แล้วนับว่ามีกี่งานที่ completed เป็น true
//        ใบ้: ใช้ .filter()


// เรียกใช้ฟังก์ชันที่เขียนไว้ตรงนี้ (อย่าลืม await และต้องอยู่ใน async function)
async function main() {
  await getTodo();
  await getUserPosts(1);
  await countDoneTodos(1);
}

main();
