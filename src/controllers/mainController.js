const mainController = {
    index: function (req, res) {
        res.render("index")
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
    }
}


module.exports = mainController;



