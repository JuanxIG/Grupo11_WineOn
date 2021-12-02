const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./src/routes/mainRouter");
const productRouter = require("./src/routes/productRouter");

/* const publicPath = path.resolve(__dirname, "./public"); */

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(3000, () => {
    console.log("Servidor corriendo....");
})

app.use("/", mainRouter); 
app.use("/", productRouter); 

/* app.get("/productos", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/productDetail.html"))});

app.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/productCart.html"))});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/register.html"))});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/login.html"))});

app.get("/finalizado", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/finalizar.html"))});
*/
