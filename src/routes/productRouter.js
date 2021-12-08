const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController")

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


// ruta que muestra todos los productos
router.get("/", productController.products)

//ruta que muestra el formulario para agregar un producto y procesar el formulario
router.get("/agregar", productController.showAdd)
router.post('/', upload.any(), productController.addProduct); 

/*** Crear producto ***/ 
router.get('/create', productController.showAdd); 


//ruta que lleva al detalle de un producto
router.get("/detail/:id", productController.detail);

//ruta que muestra el formulario de edicion de un producto y procesar el formulario
router.get("/editar/:id", productController.formProduct);
router.put("/editar/:id", productController.editProduct);

//ruta que elimina un producto
router.delete("/eliminar/:id", productController.deleteProduct);

module.exports = router;