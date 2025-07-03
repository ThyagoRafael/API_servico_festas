const express = require("express");

const app = express();

app.use(express.json());

// DB Connection

const conn = require("./db/conn");
conn();

// Routes
const routes = require("./routes/router");

app.use("/api", routes);

app.listen(3000, () => {
	console.log("Servidor deu bom");
});
