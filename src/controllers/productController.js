//const fs = require('fs');
//const path = require('path');
let db = require("../../database/models");

//const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
//const productsFilePath = path.join(__dirname, '../data/productsData.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*const visited = products.filter(function(product){
	return product.category == 'visited'
})
const inSale = products.filter(function(product){
	return product.category == 'in-sale'
})*/

const productController = {

    products: function(req, res) {
		db.Vino.findAll()
			.then(function(vinos) {
				 res.render("products", {vinos: vinos})
			})
        /*res.render('products', {
			visited,
			inSale
		});*/
    },

    //muestra el detalle de producto
    detail:  (req, res) =>{
        db.Vino.findByPk(req.params.id, {
			include: [{association: "unaBodega"}, {association: "unaCepa"}, {association: "muchospedidos"}]
		})
			.then(function(vino) {
				res.render("productDetail", {vino:vino})
			})
    },

    //se muestra el formulario para agregar un producto
    showAdd: function(req, res) {
		db.Cepa.findAll()
			.then(function(cepas) {
				db.Bodega.findAll()
				.then(function(bodegas) {
					return res.render("addProduct", {cepas, bodegas})

				})
			});
			
		/*db.Bodega.findAll()
			.then(function(bodegas) {
				return res.render("addProduct", {bodegas})
			})*/
    },
    	
	addProduct: (req, res) => {
		db.Vino.create({
			nombre: req.body.name,
			precio: req.body.price,
			cuotas: req.body.cuotas,
			descuento: req.body.discount,
			descripcion: req.body.description,
			imagen: req.body.image,
			bodegaid: req.body.bodega,
			cepaid: req.body.cepa,
			stock: req.body.unidades
		});
		res.redirect("/productos");
	},

    //se muestra el formulario para edicion de productos
    formProduct: function (req, res){
        let producto = products.find((producto) => producto.id == req.params.id);
        res.render("editProduct", {producto:producto})
    },

    //se edita el producto
    editProduct: function (req, res) {
        let imagen = ""
		for (let i = 0; i < products.length; i++){
			if (req.params.id == products[i].id){
				if (req.files[0].filename == undefined){
					imagen = products[i].image
				}else{imagen = req.files[0].filename}
			}
		let modificarProduct = {
			id: req.params.id,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			bodega: req.body.bodega,
			variety: req.body.variety,
			cuotas: req.body.cuotas,
			description: req.body.description,
			image: imagen
		}
		
		console.log(modificarProduct.image)
		for (let i = 0; i < products.length; i++){
			if (req.params.id == products[i].id){
				
				products[i] = modificarProduct	
				let productJSON = JSON.stringify(products);
				fs.writeFileSync(productsFilePath, productJSON);
				res.redirect('/productos/detail/' + modificarProduct.id)
			}
		}
		
    }
},

    //se elimina un producto
    deleteProduct: function (req, res){
		
		let newList = products.filter((producto) => producto.id != req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(newList));
		
		res.redirect("/");
    },

}

module.exports = productController;