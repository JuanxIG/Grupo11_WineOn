const fs = require('fs');
const path = require('path');

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const productsFilePath = path.join(__dirname, '../data/productsData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const productController = {

    products: function(req, res) {
        res.render("products", {products})
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
    	
	addProduct: (req, res) => {
		let image
		console.log(req.files);
		if(req.files[0] != undefined){
			image = req.files[0].filename
		} else {
			image = 'default-image.png'
		}
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: image
		};
		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
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
		console.log(req.params.id);
		for (let i = 0; i < products.length; i++){
			if (req.params.id == products[i].id){
				products[i] = modificarProduct	
				let productJSON = JSON.stringify(products);
				fs.writeFileSync(productsFilePath, productJSON);
				res.redirect("/products/detail/" + req.params.id)	
			} else {
				res.redirect("/")
			}
		}
    },

    //se elimina un producto
    deleteProduct: function (req, res){
		res.send("Se elimino el producto");
    },

}

module.exports = productController;