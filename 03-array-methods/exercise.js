// แบบฝึกหัดบทที่ 3: Array methods
// รันด้วย: node 03-array-methods/exercise.js

const students = [
  { id: 1, name: "Ann", score: 85, major: "CS" },
  { id: 2, name: "Bob", score: 42, major: "IT" },
  { id: 3, name: "Cherry", score: 73, major: "CS" },
  { id: 4, name: "Dan", score: 91, major: "IT" },
  { id: 5, name: "Eve", score: 38, major: "CS" },
];

// ข้อ 1 (map): สร้าง array ที่มีแค่ชื่อนักเรียน
//        ผลที่ควรได้: [ 'Ann', 'Bob', 'Cherry', 'Dan', 'Eve' ]
const studentNames = students.map(student => student.name);
console.log(studentNames);

// ข้อ 2 (filter): หานักเรียนที่สอบผ่าน (score >= 50) แล้วแสดงจำนวนคน
//        ผลที่ควรได้: 3
const passedStudents = students.filter(student => student.score >= 50);
console.log(passedStudents.length);

// ข้อ 3 (find): หานักเรียนที่ชื่อ "Dan" แล้วแสดงคะแนน
//        ผลที่ควรได้: 91
const dan = students.find(student => student.name === "Dan");
console.log(dan.score);

// ข้อ 4 (reduce): หาคะแนนเฉลี่ยของทั้งห้อง
//        ใบ้: รวมคะแนนด้วย reduce แล้วหารด้วย students.length
//        ผลที่ควรได้: 65.8
const totalScore = students.reduce((sum, student) => sum + student.score, 0);
const averageScore = totalScore / students.length;
console.log(averageScore.toFixed(1));

// ข้อ 5 (some / every): มีคนสอบตกไหม? (score < 50) และทุกคนได้เกิน 30 ไหม?
//        ผลที่ควรได้: true, true
const hasFailed = students.some(student => student.score < 50);
const aboveThirty = students.every(student => student.score > 30);
console.log(hasFailed, aboveThirty);

// ข้อ 6 (chaining): แสดงชื่อนักเรียนสาย CS ที่สอบผ่าน
//        ผลที่ควรได้: [ 'Ann', 'Cherry' ]
const passedCSStudents = students.filter(student => student.major === "CS" && student.score >= 50)
console.log(passedCSStudents.map(student => student.name));

// ข้อ 7 (map + เงื่อนไข): สร้าง array ใหม่ที่แต่ละคนมีเกรดด้วย
//        score >= 80 -> "A", >= 70 -> "B", >= 50 -> "C", นอกนั้น "F"
//        ผลที่ควรได้: [ { name: 'Ann', grade: 'A' }, { name: 'Bob', grade: 'F' }, ... ]
//        ใบ้: เขียนฟังก์ชัน getGrade(score) แยกไว้ก่อนด้วย if / else if
function getGrade(score) {
  if(score >= 80) {
    return "A";
  } else if(score >= 70) {
    return "B";
  } else if(score >= 50) {
    return "C";
  } else {
    return "F";
  }
}

const gradedStudents = students.map(students => students = { name: students.name, grade: getGrade(students.score) });
console.log(gradedStudents);

// ข้อ 8 (ท้าทาย - ใช้ความรู้บทที่ 2 ด้วย):
//        ดึงข้อมูลจาก https://jsonplaceholder.typicode.com/users
//        แล้วแสดงชื่อ (name) ของคนที่อีเมลลงท้ายด้วย ".biz"
//        ใบ้: string มี method .endsWith(".biz")
//        ผลที่ควรได้: [ 'Leanne Graham', 'Kurtis Weissnat', 'Clementina DuBuque' ]
async function getBizUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if(!response.ok) {
      throw new Error(`ดึงข้อมูลไม่สำเร็จ: HTTP ${response.status}`);
    }
    const users = await response.json();
    const bizUsers = users.filter(user => user.email.endsWith(".biz"))
    console.log(bizUsers.map(user => user.name));
  } catch (error) {
    console.log("เกิดข้อผิดพลาด:", error.message);
  }
}

getBizUsers();