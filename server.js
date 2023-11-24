const express = require("express");
const app = express();
require("dotenv").config();

app.get("/", (req, res) => {
  res.json({ test: "test" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
