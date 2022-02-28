const path = require('path')
const {body} = require ("express-validator");

const validacionesProducto = [
    body("name").notEmpty().withMessage("Debes ingresar el nombre del producto"),
    body("price").notEmpty().withMessage("Debes ingresar el precio del producto"),
    body("discount").notEmpty().withMessage("Debes ingresar el descuento del producto").bail()
                 .isNumeric().withMessage("Solo podés ingresar valores numericos"),
    body("unidades").notEmpty().withMessage("Debes ingresar la cantidad de unidades del producto"),
    body("cuotas").notEmpty().withMessage("Ingresá las cuotas del producto"),
    body("description").notEmpty().withMessage("Ingresá una descripcion del producto"),
    body("image").custom((value, {req}) => {
        let file = req.file
        if (!file) {
            throw new Error("Tenés elegir una imagen para el producto");
        }
      
    })
];

module.exports = validacionesProducto;