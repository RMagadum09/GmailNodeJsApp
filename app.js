const express = require("express");
const routes = require("./routes/index");

require("dotenv").config();

const app = express();

// Routes
app.use("/api", routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Listening on port ", +process.env.PORT);
});
