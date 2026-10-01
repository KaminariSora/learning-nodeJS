// Module แบบ ES Modules (ESM) = มาตรฐานใหม่ของ JavaScript
// ใช้ได้ทั้งใน Node และในเบราว์เซอร์
// โฟลเดอร์นี้ใช้ ESM ได้เพราะ package.json มี "type": "module"

const PASS_SCORE = 50;

// ----- แบบที่ 1: named export = ใส่ export หน้าสิ่งที่จะส่งออก -----
export function getGrade(score) {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= PASS_SCORE) return "C";
  return "F";
}

export function isPassed(score) {
  return score >= PASS_SCORE;
}

export const SCHOOL_NAME = "Node Academy";

// ----- แบบที่ 2: default export = "ของหลัก" ของไฟล์ (มีได้แค่ 1 อันต่อไฟล์) -----
export default function average(numbers) {
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return total / numbers.length;
}
