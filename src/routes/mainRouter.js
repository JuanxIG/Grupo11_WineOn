const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController")

const path = require('path')
const multer = require('multer')
// ************ Multer ************ 
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'public/images/products')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})

router.get("/", mainController.index)

router.get("/carrito", mainController.carrito)

router.get("/register", mainController.register)

router.get("/login", mainController.login)

router.get("/finalizado", mainController.finalizado)

module.exports = router;