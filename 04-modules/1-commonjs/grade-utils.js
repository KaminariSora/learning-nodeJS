// ไฟล์นี้คือ "module" ที่เก็บฟังก์ชันไว้ให้ไฟล์อื่นเรียกใช้
// แบบ CommonJS (แบบดั้งเดิมของ Node)

// ตัวแปรในไฟล์นี้เป็น "ของส่วนตัว" ไฟล์อื่นมองไม่เห็น ถ้าไม่ export ออกไป
const PASS_SCORE = 50;

function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= PASS_SCORE) return "C";
  return "F";
}

function isPassed(score) {
  return score >= PASS_SCORE;
}

function average(numbers) {
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return total / numbers.length;
}

// export = เลือกว่าจะ "ส่งออก" อะไรให้ไฟล์อื่นใช้ได้บ้าง
// (ไม่ได้ส่ง PASS_SCORE ออกไป ไฟล์อื่นจึงใช้ไม่ได้)
module.exports = {
  getGrade,
  isPassed,
  average,
};
