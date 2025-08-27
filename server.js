import express from "express";

const app = express();
const port = 3113;

app.get("/", async (req, res) => {
  try {
    const response = await fetch(
      "https://prediction-markets-research-api.noshado.ws/random"
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Failed to fetch prediction data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
