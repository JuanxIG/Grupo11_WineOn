module.exports = function(sequelize, dataTypes) {
    let alias = "Bodega"; //como llamaremos al modelo en el codigo

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
        tableName: "bodegas", //el nombre de la base de datos
        timestamps: false
    }

    let Vinos = sequelize.define(alias, cols, config);

    return Bodega;
}