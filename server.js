import express from "express";
import cors from "cors";

const app = express();
const port = 3113;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://localhost:5173",
    "http://rolodex-os.fcc.lol",
    "https://rolodex-os.fcc.lol"
  ], // For Zach
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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
