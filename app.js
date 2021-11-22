const express = require("express");
const path = require("path");
const app = express();

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log("Servidor corriendo....");
    console.log(__dirname);
})

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/index.html"))});

app.get("/productos", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/productDetail.html"))});

app.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/productCart.html"))});

app.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/register.html"))});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/login.html"))});

app.get("/finalizado", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/finalizar.html"))});