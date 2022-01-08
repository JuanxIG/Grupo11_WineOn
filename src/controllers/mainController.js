const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const visited = products.filter(function(product){
	return product.category == 'visited'
})
const inSale = products.filter(function(product){
	return product.category == 'in-sale'
})

const mainController = {
    index: function (req, res) {
		res.render('index', {
			visited,
			inSale
		});
    },
    productos: function (req, res) {
		res.render('products', {
			visited,
			inSale
		});
    },

    carrito: function (req, res) {
        res.render("productCart")
    },

    register: function (req, res){
        res.render("register")
    },

    login: function (req, res){
        res.render("login")
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



