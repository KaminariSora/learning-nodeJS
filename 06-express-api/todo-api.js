const express = require('express');
const { connectDB } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

let todos;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
  res.send("สวัสดีจาก Express!");
});

app.get("/api/todos", async (req, res) => {
    const results = await todos.find({}).toArray();
    res.json(results);
})

app.post("/api/todos", async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "กรุณาระบุ title" });
    }
    const result = await todos.insertOne({ title });
    res.status(201).json({ _id: result.insertedId, title });
});

app.get("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  res.status(200).json({ message: `คุณขอ todo id = ${id}` });
})

app.patch("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "กรุณาระบุ id" });
  }
  const allowed = ["title", "done"];
  const updates = {};
  for (const fielded of allowed) {
    if (req.body[fielded] !== undefined) {
      updates[fielded] = req.body[fielded];
    }
  }
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "ไม่มีข้อมูลให้แก้ไข" });
  }

  const updated = await products.findOneAndUpdate(
    { _id: id },
    { $set: updates },
    { returnDocument: "after" }
  );
  if (!updated) {
    return res.status(400).json({ error: "ไม่พบข้อมูล"})
  }
  res.json(updated)
})

async function start() {
    const db = await connectDB();
    todos = db.collection("todos");
    app.listen(PORT, () => {
      console.log(`Server พร้อมแล้วที่ http://localhost:${PORT}`);
    });
}

start();