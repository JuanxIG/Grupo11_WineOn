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

const productController = {

    products: function(req, res) {
        res.render('products', {
			visited,
			inSale
		});
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
		let productJson = JSON.parse(products)
		let newProduct = {
			id: productJson[productJson.length - 1].id + 1,
			...req.body,
			image: image
		};
		productJson.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(productJson, null, ' '));
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
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			bodega: req.body.bodega,
			variety: req.body.variety,
			cuotas: req.body.cuotas,
			description: req.body.description,
			image: req.files[0].filename
		}
		console.log(modificarProduct.image)
		for (let i = 0; i < products.length; i++){
			if (req.params.id == products[i].id){
				
				products[i] = modificarProduct	
				let productJSON = JSON.stringify(products);
				fs.writeFileSync(productsFilePath, productJSON);
				res.redirect("/")
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