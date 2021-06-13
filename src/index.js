const express = require("express");


const app = express();

//importando rutas
const rutas = require("./routes/route");

app.use(express.json());

// config
app.set("port", 3000);

//rutas
app.use(rutas);

// archivos estaticos
app.use(express.static("public"));


app.listen(app.get("port"), () => {
  console.log("Server en el puerto", app.get("port"));
});
