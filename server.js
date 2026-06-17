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

// Forward ?min=X&max=Y (percentages) straight through to the upstream API,
// which handles probability filtering natively.
async function proxy(path, req, res) {
  try {
    const qs = new URLSearchParams(req.query).toString();
    const response = await fetch(`${UPSTREAM}${path}${qs ? `?${qs}` : ""}`);
    res.send(await response.json());
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send({ error: "Failed to fetch prediction data" });
  }
}

app.get("/", (req, res) => proxy("/random", req, res));
app.get("/all", (req, res) => proxy("/all", req, res));
app.get("/random", (req, res) => proxy("/random", req, res));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
