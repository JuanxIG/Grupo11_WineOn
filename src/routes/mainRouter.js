const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController")

router.get("/", mainController.index)

router.get("/carrito", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/productCart.html"))});

router.get("/registro", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/register.html"))});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/login.html"))});

router.get("/finalizado", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/finalizar.html"))});


module.exports = router;