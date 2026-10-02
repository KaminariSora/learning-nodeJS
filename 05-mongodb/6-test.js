const { connectDB, closeDB } = require("./db");

async function connection() {
    const db = await connectDB();
    const users = db.collection("users");
    return users;
}

async function fetchData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
        throw new Error(`ดึงข้อมูลไม่สำเร็จ: HTTP ${response.status}`);
    }
    const users = await response.json();
    return users.map(user => ({
        name: user.name,
        email: user.email,
        city: user.address.city
    }));
}

async function insertData(users, data) {
    await users.deleteMany({});
    const result = await users.insertMany(data);
    console.log("เพิ่มแล้ว:", result.insertedCount, "คน");
}

async function main() {
    try {
        const users = await connection();
        const data = await fetchData();
        await insertData(users, data);

        const foundUsers = await users.findOne({ city: "Gwenborough"});
        console.log("Find 'Gwenborough':" ,foundUsers);
    } catch (error) {
        console.log("เกิดข้อผิดพลาด:", error.message);
    } finally {
        await closeDB();
    }
}

main();