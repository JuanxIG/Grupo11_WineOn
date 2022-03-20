const db = require('../../../database/models');
//const sequelize = db.sequelize;

const apiProductsController = {
    list:(req,res)=>{
       db.Vino.findAll({
            include: [{association: "unaBodega"}, {association: "unaCepa"}]
        })
        .then(vinos=> {
                let arrayVinos = vinos.map(vino=> {
                    return {
                        id: vino.id,
                        name: vino.nombre,
                        description: vino.descripcion  
                    }
                })
                let santaJulia = vinos.filter(vino =>{ return vino.bodegaid == 1});
                let norton = vinos.filter(vino =>{ return vino.bodegaid == 2});
                let rutini = vinos.filter(vino =>{ return vino.bodegaid == 3});
               
                return res.json({
                    totalWines: vinos.length,
                    countByCategory: [
                        {santaJulia: santaJulia.length},
                        {norton: norton.length},
                        {rutini: rutini.length} 
                    ],
                    wines: arrayVinos,
                    detail: "/api/products" 
                })
        })
        .catch(function(error){
            res.json({status:800})
        })
    },

    detail:(req,res)=>{
        let elVino = db.Vino.findByPk(req.params.id, {
            include: [{association: "unaBodega"}, {association: "unaCepa"}]
        })

       let lasBodegas = db.Bodega.findAll();
       let lasCepas = db.Cepa.findAll();

       Promise.all([elVino, lasBodegas, lasCepas])
        .then(([vino, bodegas, cepas])=>{
            return res.json({
                wine: {
                    id: vino.id,
                    name: vino.nombre,
                    price: vino.price,
                    fee: vino.cuotas,
                    discount: vino.descuento,
                    description: vino.descripcion,
                    image: "/images/products" + vino.imagen,
                    stock: vino.stock,
                    cepa: vino.unaCepa.nombre,
                    bodega: vino.unaBodega.nombre
                },
                cepas: cepas,
                bodegas: bodegas
            })
        })
        .catch(function(error){
            res.json({status:800})
        })
    },

    ultimo: (req, res) => {
        db.Vino.findAll({order:[["id", "DESC"]], limit:1 }, {include: [{association: "unaBodega"}, {association: "unaCepa"}]})
        
        
        .then(function (vino) {
            //product[0].setDataValue("endpoint", "/api/products/lastProduct/" + vino.length)
            return res.json({
                wine: {
                    id: vino.id,
                    name: vino.nombre,
                    price: vino.price,
                    fee: vino.cuotas,
                    discount: vino.descuento,
                    description: vino.descripcion,
                    image: "/images/products" + vino.imagen,
                    stock: vino.stock,
                    cepa: vino.unaCepa.nombre,
                    bodega: vino.unaBodega.nombre
                },
                url: "/api/products/lastProduct"
            })
        })
        
    }


}

module.exports = apiProductsController;