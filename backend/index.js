const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://cesphl-github-io-frontend.vercel.app/",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/test", (req, res) => {
  res.json({ message: "Hello from the test endpoint!" });
});