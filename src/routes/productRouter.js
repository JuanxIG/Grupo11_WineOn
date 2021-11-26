const express = require("express");
const router = express.Router();

router.get("/productos", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/productDetail.html"))});

module.exports = router;