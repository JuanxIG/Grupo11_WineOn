const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productsFilePath = path.join(__dirname, '../data/vinos_test.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productController = {

    products: function(req, res) {
        res.render("products")
    },

    //muestra el detalle de producto
    detail:  (req, res) =>{
        let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('productDetail', {
			product
		})
    },

    //se muestra el formulario para agregar un producto
    showAdd: function(req, res) {
        res.render("addProduct")
    },

    //se agrega un producto
    addProduct: function(req, res) {
        res.render("index")
    },

    //se muestra el formulario para edicion de productos
    formProduct: function (req, res){
        let producto = products.find((producto) => producto.id == req.params.id);
        res.render("editProduct", {producto:producto})
    },

    //se edita el producto
    editProduct: function (req, res) {
        let modificarProduct = {
			id: req.params.id,
			description: req.body.description,
            category: req.body.category,
			price: req.body.price,
			variety: req.body.variety,
            nation: req.body.nation,
		}
		for (let i = 0; i < products.length; i++){
			if (req.params.id == products[i].id){
				products[i] = modificarProduct	
				let productJSON = JSON.stringify(products);
				fs.writeFileSync(productsFilePath, productJSON);
				res.redirect("/products")	
			} else {
				res.redirect("/")
			}
		}
    },

    //se elimina un producto
    deleteProduct: function (req, res){

    },

}

module.exports = productController;