const { connectDB, closeDB } = require("./db");

async function insertData() {
    try {
        const db = await connectDB();
        const products = db.collection("products");
        await products.deleteMany({});
        const result = await products.insertMany([
            { name: "Notebook", price: 25000, category: "it", stock: 5 },
            { name: "Mouse", price: 450, category: "it", stock: 30 },
            { name: "Desk", price: 3200, category: "furniture", stock: 0 },
            { name: "Chair", price: 1800, category: "furniture", stock: 12 },
            { name: "Keyboard", price: 1200, category: "it", stock: 0 },
        ]);
        console.log("เพิ่มแล้ว _id:", result.insertedCount, "ชิ้น");
    } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
    } finally {
        await closeDB();
    }
}

async function findData() {
    try {
        const db = await connectDB();
        const products = db.collection("products");
        const itProducts = await products.find({ category: "it" }).toArray();
        console.log("IT products: ", itProducts.map(p => p.name));
        const lowerThanTwothousand = await products.find({ price: { $lt: 2000 } }).toArray();
        console.log("Lower than 2000: ", lowerThanTwothousand.map(p => p.name));
        const outOfStock = await products.find({ stock: 0 }).toArray();
        console.log("Out of stock: ", outOfStock.map(p => p.name));
    } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
    } finally {
        await closeDB();
    }
}

async function sortData() {
    try {
        const db = await connectDB();
        const products = db.collection("products");
        const sortedProducts = await products.find().sort({ price: -1 }).limit(1).project({ _id: 0, name: 1, price: 1 }).toArray();
        console.log(sortedProducts);
    } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
    } finally {
        await closeDB();
    }
}

async function editData() {
    try {
        const db = await connectDB();
        const products = db.collection("products");
        console.log("edit Data");
        const result = await products.updateOne({ name: "Mouse" }, { $inc: {'stock': -27} });
        console.log("ตรงเงื่อนไข:", result.matchedCount, "| แก้ไปจริง:", result.modifiedCount);
        console.log(await products.findOne({ name: "Mouse" }));
    } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
    } finally {
        await closeDB();
    }
}

async function decreasePrice() {
    try {
        const db = await connectDB();
        const products = db.collection("products");
        console.log("decrease Price");
        const result = await products.updateMany({ category: "furniture" }, { $set: { onSale: "true" }});
        console.log("ตรงเงื่อนไข:", result.matchedCount, "| แก้ไปจริง:", result.modifiedCount);
        console.log(await products.find({ category: "furniture" }).toArray());
    } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
    } finally {
        await closeDB();
    }
} 

async function deleteData() {
    try {
        const db = await connectDB();
        const products = db.collection("products");
        console.log("delete Data");
        const result = await products.deleteMany({ stock: 0 });
        console.log("ตรงเงื่อนไข:", result.deletedCount);
        console.log(await products.find().toArray());
    } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
    } finally {
        await closeDB();
    }
}

deleteData();