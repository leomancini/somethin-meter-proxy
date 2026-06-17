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

const UPSTREAM = "https://prediction-markets-research-api.noshado.ws";

// Hard-coded probability range (percentages) enforced on every request.
const MIN = 15;
const MAX = 100;

// Always request the fixed MIN/MAX range from the upstream API,
// which handles probability filtering natively.
async function proxy(path, res) {
  try {
    const response = await fetch(`${UPSTREAM}${path}?min=${MIN}&max=${MAX}`);
    res.send(await response.json());
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Failed to fetch prediction data" });
  }
}

app.get("/", (req, res) => proxy("/random", res));
app.get("/random", (req, res) => proxy("/random", res));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
