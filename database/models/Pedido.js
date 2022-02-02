module.exports = function(sequelize, dataTypes) {
    let alias = "Pedido"; //como llamaremos al modelo en el codigo

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false
        }
    }

    let config = {
        tableName: "cepas", //el nombre de la base de datos
        timestamps: false
    }

    let Vinos = sequelize.define(alias, cols, config);

    return Cepa;
}