const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./src/routes/mainRouter");
const productRouter = require("./src/routes/productRouter");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(3500, () => {
    console.log("Servidor corriendo....");
})

app.use("/", mainRouter); 
app.use("/productos", productRouter); 

