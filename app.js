const express = require("express");
const path = require("path");
const app = express();
const mainRouter = require("./src/routes/mainRouter");
const productRouter = require("./src/routes/productRouter");
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

//app.use(express.static("public"));

app.use(express.static(path.join(__dirname, '../public'))); // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); 

// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

app.listen(3500, () => {
    console.log("Servidor corriendo....");
})

app.use("/", mainRouter); 
app.use("/productos", productRouter); 

