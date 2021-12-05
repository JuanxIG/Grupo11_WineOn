const productController = {

    products: function(req, res) {
        res.render("products")
    },

    //muestra el detalle de producto
    showProduct: function (req, res) {
        res.render("productDetail")
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
        res.render("editProduct")
    },

    //se edita el producto
    editProduct: function (req, res) {
        
    },

    //se elimina un producto
    deleteProduct: function (req, res){

    },

}

module.exports = productController;