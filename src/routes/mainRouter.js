const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController")

router.get("/", mainController.index)

router.get("/carrito", mainController.carrito)

router.get("/register", mainController.register)

router.get("/login", mainController.login)

router.get("/finalizado", mainController.finalizado)

module.exports = router;