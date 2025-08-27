import express from "express";

const app = express();
const port = 3113;

app.get("/", (req, res) => {
  res.send({
    title: "What price will Ethereum hit in August? - ↑ 5000",
    probability: 0.79,
    volume: 14000000
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
