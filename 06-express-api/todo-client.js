async function main() {
  const res = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "อ่านหนังสือ" }),
  });
  console.log(res.status, await res.json());
}
main();
