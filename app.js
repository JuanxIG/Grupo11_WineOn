const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./src/routes/mainRouter")

/* const publicPath = path.resolve(__dirname, "./public"); */

app.use(express.static("public"));

app.set("view engine", "ejs")

app.listen(3000, () => {
    console.log("Servidor corriendo....");
    console.log(__dirname);
})

app.use("/", mainRouter) 

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
