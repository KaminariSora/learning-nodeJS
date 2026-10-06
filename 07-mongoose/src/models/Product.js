// Model = "แม่แบบ" ของข้อมูลใน collection
// กำหนดว่า document ต้องมี field อะไร ชนิดอะไร และมีกฎอะไรบ้าง
// Mongoose จะตรวจให้อัตโนมัติก่อนบันทึก ไม่ต้องเขียน if ตรวจเองทุก route

const mongoose = require("mongoose");

// ----- Schema = รายการ field และกฎของแต่ละ field -----
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "ต้องระบุชื่อสินค้า"], // บังคับต้องมี + ข้อความ error
      trim: true, // ตัดช่องว่างหน้า-หลังให้อัตโนมัติ ("  Mouse " -> "Mouse")
      minlength: [2, "ชื่อสินค้าต้องยาวอย่างน้อย 2 ตัวอักษร"],
    },
    price: {
      type: Number,
      required: [true, "ต้องระบุราคา"],
      min: [0, "ราคาต้องไม่ติดลบ"],
    },
    category: {
      type: String,
      enum: {
        values: ["it", "furniture", "other"], // อนุญาตแค่ค่าในรายการนี้
        message: "category ต้องเป็น it, furniture หรือ other",
      },
      default: "other", // ถ้าไม่ส่งมา ใช้ค่านี้
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "stock ต้องไม่ติดลบ"],
    },
  },
  {
    timestamps: true, // เพิ่ม createdAt และ updatedAt ให้อัตโนมัติ
  }
);

// ----- Model = ตัวที่ใช้สั่งงาน collection -----
// ชื่อ "Product" -> Mongoose จะใช้ collection ชื่อ "products" (ตัวเล็ก + เติม s ให้เอง)
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
