const productController = {

    //muestra el detalle de producto
    showProduct: function (req, res) {
        res.render("productDetail")
    },

    //se muestra el formulario para agregar un producto
    addProduct: function(req, res) {
        res.render("addProduct")
    },

    //se edita el producto
    editProduct: function (req, res) {
        
    },

    //se muestra el formulario para edicion de productos
    formProduct: function (req, res){
        res.render("editProduct")
    }

}

module.exports = productController;