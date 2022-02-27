const fs = require('fs');
const db = require("../../database/models");
//const path = require('path');



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
			imagen: req.file.filename,
			bodegaid: req.body.bodega,
			cepaid: req.body.cepa,
			stock: req.body.unidades
		});
	
		res.redirect("/productos");
		
	},

    //se muestra el formulario para edicion de productos
    formProduct: function (req, res){
		let elVino = db.Vino.findByPk(req.params.id, {
			include: [{association: "unaBodega"}, {association: "unaCepa"}, {association: "muchospedidos"}]
		})

		let lasBodegas = db.Bodega.findAll();
		let lasCepas = db.Cepa.findAll();

		Promise.all([elVino, lasBodegas, lasCepas])
			.then(function([vino, bodegas, cepas]) {
				res.render("editProduct", {vino:vino, bodegas: bodegas, cepas: cepas})
			})
    },

    //se edita el producto
    editProduct: function (req, res) {
		db.Vino.update({
			nombre: req.body.name,
			precio: req.body.price,
			cuotas: req.body.cuotas,
			descuento: req.body.discount,
			descripcion: req.body.description,
			imagen: req.file.filename,
			bodegaid: req.body.bodega,
			cepaid: req.body.cepa,
			stock: req.body.unidades
		}, {where: {
			id: req.params.id
		}
		});
	
		res.redirect("/productos/detail/" + req.params.id);
},

    //se elimina un producto
    deleteProduct: function (req, res){
		
		db.Vino.destroy({
			where: {
				id: req.params.id
			}
		})

		res.redirect("/productos")
    },

}

module.exports = productController;