const fs = require('fs');
const path = require('path'); 
const db = require("../../database/models");

//index de productos productJSON
const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const visited = products.filter(function(product){
	return product.category == 'visited'
})
const inSale = products.filter(function(product){
	return product.category == 'in-sale'
})

const mainController = {
    index: function (req, res) {
		db.Vino.findAll()
			.then(function(vinos) {
				 res.render("products", {vinos: vinos})
			})
    },

    buscador: function (req, res) {
        db.Vino.findAll({
            where: {
                nombre: req.body.buscador
        }
            .then(function(vinos){
                res.render("products", {vinos: vinos})
            })
    })
        
    },

    carrito: function (req, res) {
        res.render("productCart")
    },

    finalizado: function (req, res){
        res.render("finalizar")
    },

    contacto: function (req, res){
        res.render("contacto")
    },
    
    nosotros: function (req, res){
        res.render("nosotros")
    }
}


module.exports = mainController;



